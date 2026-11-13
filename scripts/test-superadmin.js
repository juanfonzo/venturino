const assert = require('node:assert/strict');
const { requireTypeScript } = require('./register-ts');

const {
  normalizeAuthPayload,
  validateCredentials,
} = requireTypeScript('lib/auth/access.ts');
const {
  readOperationalAlertConfig,
} = requireTypeScript('lib/operational-alerts/config.ts');
const {
  decideOperationalAlert,
  resetOperationalAlertLimiterForTests,
  OPERATIONAL_ALERT_POLICIES,
} = requireTypeScript('lib/operational-alerts/limiter.ts');
const {
  sanitizeAlertContext,
  sanitizeAlertString,
  sanitizeRequestBody,
} = requireTypeScript('lib/operational-alerts/sanitize.ts');
const {
  buildSmtpMessage,
} = requireTypeScript('lib/operational-alerts/smtp.ts');
const {
  parseReviewPayload,
  ReviewValidationError,
  REVIEW_REASON_LABELS,
} = requireTypeScript('lib/superadmin/review.ts');
const {
  describeMarketReferenceError,
  getMarketReferenceMachine,
} = requireTypeScript('lib/superadmin/query-display.ts');

async function main() {
  await testCredentialsAndSessions();
  testAlertConfiguration();
  testSanitization();
  testAlertLimiter();
  testValidationAlertThreshold();
  await testValidationAlertDelivery();
  testQueryErrorDisplay();
  testReviewValidationAndEmail();
  console.log('Superadmin: 8/8 checks OK');
}

async function testCredentialsAndSessions() {
  const env = {
    AUTH_USER: 'venturino',
    AUTH_PASSWORD: 'venturino-password',
    SUPERADMIN_USER: 'algorym',
    SUPERADMIN_PASSWORD: 'superadmin-password',
  };
  assert.deepEqual(validateCredentials('venturino', 'venturino-password', env), {
    user: 'venturino',
    accessLevel: 'VENTURINO',
  });
  assert.deepEqual(validateCredentials('algorym', 'superadmin-password', env), {
    user: 'algorym',
    accessLevel: 'SUPERADMIN',
  });
  assert.equal(validateCredentials('algorym', 'wrong', env), null);
  assert.deepEqual(validateCredentials('venturino', 'venturino-password', {
    ...env,
    SUPERADMIN_USER: 'venturino',
    SUPERADMIN_PASSWORD: 'venturino-password',
  }), {
    user: 'venturino',
    accessLevel: 'VENTURINO',
  });
  assert.deepEqual(normalizeAuthPayload({ user: 'venturino' }), {
    user: 'venturino',
    accessLevel: 'VENTURINO',
  });
  assert.deepEqual(normalizeAuthPayload({ user: 'algorym', accessLevel: 'SUPERADMIN' }), {
    user: 'algorym',
    accessLevel: 'SUPERADMIN',
  });
}

function testAlertConfiguration() {
  const config = readOperationalAlertConfig({
    APP_ENV: 'production',
    ALERT_EMAIL_ENABLED: 'true',
    ALERT_SERVICE_NAME: 'venturino',
    SMTP_SERVER: 'smtp.example.com',
    SMTP_PORT: '587',
    SMTP_USER: 'sender@example.com',
    SMTP_PASS: 'app-password',
    SMTP_TO: 'one@example.com; two@example.com',
  });
  assert.equal(config.enabled, true);
  assert.equal(config.smtp.server, 'smtp.example.com');
  assert.deepEqual(config.smtp.recipients, ['one@example.com', 'two@example.com']);

  const development = readOperationalAlertConfig({
    APP_ENV: 'development',
    ALERT_EMAIL_ENABLED: 'true',
    SMTP_USER: 'sender@example.com',
    SMTP_PASS: 'app-password',
  });
  assert.equal(development.enabled, false);
}

function testSanitization() {
  const value = sanitizeAlertContext({
    password: 'hidden',
    authorization: 'Bearer abc.def.ghi',
    url: 'https://example.test/?access_token=secret-value',
    nested: { database_url: 'postgresql://private' },
    signature: `sha256=${'a'.repeat(64)}`,
  });
  assert.equal(value.password, '[REDACTED]');
  assert.equal(value.authorization, '[REDACTED]');
  assert.equal(value.nested.database_url, '[REDACTED]');
  assert.equal(value.signature, '[REDACTED]');
  assert.equal(sanitizeAlertString(value.url).includes('secret-value'), false);
  assert.equal(
    sanitizeAlertString('postgresql://user:password@db.example.test/venturino').includes('password'),
    false,
  );
  assert.deepEqual(sanitizeRequestBody('null'), { value: null });
}

function testAlertLimiter() {
  resetOperationalAlertLimiterForTests();
  const decisions = [0, 1, 2].map((index) => decideOperationalAlert({
    fingerprint: 'same-rate-limit',
    threshold: 3,
    windowSeconds: 300,
    cooldownSeconds: 900,
    nowMs: 1000 + index,
  }));
  assert.deepEqual(decisions.map((item) => item.send), [false, false, true]);
  const suppressed = decideOperationalAlert({
    fingerprint: 'same-rate-limit',
    threshold: 3,
    windowSeconds: 300,
    cooldownSeconds: 900,
    nowMs: 2000,
  });
  assert.equal(suppressed.send, false);
  assert.equal(suppressed.suppressed, 1);
}

function testValidationAlertThreshold() {
  resetOperationalAlertLimiterForTests();
  const policy = OPERATIONAL_ALERT_POLICIES.invalid_input;
  assert.deepEqual(policy, { threshold: 5, windowSeconds: 300 });
  const decide = (fingerprint, nowMs) => decideOperationalAlert({ ...policy, fingerprint, nowMs, cooldownSeconds: 900 });
  const decisions = [0, 1, 2, 3, 4].map(index => decide('client-a|direct|INVALID_INPUT', 1000 + index));
  assert.deepEqual(decisions.map(item => item.send), [false, false, false, false, true]);
  assert.equal(decide('client-a|direct|INVALID_INPUT', 2000).send, false);
  assert.equal(decide('client-b|direct|INVALID_INPUT', 2000).occurrences, 1);
  assert.equal(decide('client-a|expanded|INVALID_INPUT', 2000).occurrences, 1);
  // Una solicitud aislada fuera de la ventana no completa el umbral anterior.
  assert.equal(decide('client-b|direct|INVALID_INPUT', 303000).occurrences, 1);
  assert.equal(decide('client-a|direct|INVALID_INPUT', 902000).send, false);
}

async function testValidationAlertDelivery() {
  const transport = requireTypeScript('lib/operational-alerts/smtp.ts');
  const originalSend = transport.sendOperationalEmail;
  const config = {
    APP_ENV: 'production', ALERT_EMAIL_ENABLED: 'true', ALERT_COOLDOWN_SECONDS: '900',
    SMTP_SERVER: 'smtp.example.com', SMTP_PORT: '587', SMTP_USER: 'sender@example.com',
    SMTP_PASS: 'test-only-smtp-password', SMTP_FROM: 'sender@example.com', SMTP_TO: 'support@example.com',
  };
  const previous = Object.fromEntries(Object.keys(config).map(key => [key, process.env[key]]));
  const delivered = [];
  // El único doble es el transporte externo: nunca se envía un correo real.
  transport.sendOperationalEmail = async input => { delivered.push(input); };
  Object.assign(process.env, config);
  resetOperationalAlertLimiterForTests();
  try {
    const { notifyOperationalAlert } = requireTypeScript('lib/operational-alerts/notify.ts');
    const input = {
      code: 'INVALID_INPUT', message: 'Se repiten consultas de maquinaria con datos incompletos o incorrectos.',
      policy: 'invalid_input', fingerprint: 'validation-delivery-test',
      context: { details: ['Completá el año de la maquinaria.'], secret: 'must-not-appear' },
    };
    for (let index = 0; index < 4; index += 1) assert.equal(notifyOperationalAlert(input).reason, 'threshold');
    assert.equal(delivered.length, 0);
    assert.equal(notifyOperationalAlert(input).queued, true);
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(delivered.length, 1);
    assert.match(delivered[0].body, /Completá el año de la maquinaria\./);
    assert.match(delivered[0].body, /Ocurrencias para disparar: 5/);
    assert.equal(delivered[0].body.includes('must-not-appear'), false);
    assert.equal(delivered[0].body.includes(config.SMTP_PASS), false);
    assert.equal(notifyOperationalAlert(input).reason, 'cooldown');
    assert.equal(delivered.length, 1);
  } finally {
    transport.sendOperationalEmail = originalSend;
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    resetOperationalAlertLimiterForTests();
  }
}

function testQueryErrorDisplay() {
  const message = 'Completá el año de la maquinaria.';
  const saved = describeMarketReferenceError({
    errorCode: 'INVALID_INPUT',
    resultSummary: { error: { code: 'INVALID_INPUT', message, details: [message] } },
  });
  assert.equal(saved.explanation, message);
  assert.deepEqual(saved.details, [message]);
  const legacy = describeMarketReferenceError({ errorCode: 'INVALID_INPUT', resultSummary: null });
  assert.deepEqual(legacy.details, []);
  assert.equal(legacy.message, 'La consulta contiene datos incompletos o incorrectos.');
  const machine = getMarketReferenceMachine({
    marca: null, modelo: null, categoria: null, anio: null,
    requestPayload: { marca: 'John Deere', modelo: '6145J', categoria: 'Tractores' },
  });
  assert.equal(machine.label, 'John Deere 6145J');
  assert.equal(machine.year, null);
  assert.equal(machine.category, 'Tractores');
  assert.equal(getMarketReferenceMachine({ marca: null, modelo: null, categoria: null, requestPayload: null }).label, 'Maquinaria sin identificar');
  assert.equal(getMarketReferenceMachine({ marca: 'John Deere', modelo: '6145J', categoria: 'Tractores', anio: 2016, requestPayload: { marca: 'Otra' } }).brand, 'John Deere');
}

function testReviewValidationAndEmail() {
  assert.equal(REVIEW_REASON_LABELS.normalization, 'Modelo identificado incorrectamente');
  assert.deepEqual(parseReviewPayload({
    status: 'review',
    reason: 'normalization',
    notes: 'Revisar alias.',
  }), {
    status: 'review',
    reason: 'normalization',
    notes: 'Revisar alias.',
  });
  assert.deepEqual(parseReviewPayload({
    status: 'unreviewed',
    reason: 'other',
    notes: 'Debe limpiarse',
  }), {
    status: 'unreviewed',
    reason: null,
    notes: null,
  });
  assert.throws(
    () => parseReviewPayload({ status: 'invalid' }),
    (error) => error instanceof ReviewValidationError,
  );

  const email = buildSmtpMessage({
    from: 'sender@example.com',
    recipients: ['one@example.com'],
    subject: 'Alerta de prueba',
    body: 'Línea 1\n.Línea 2',
  });
  assert.ok(email.includes('Content-Type: text/plain; charset=UTF-8'));
  assert.ok(email.includes('..Línea 2'));
  assert.equal(email.includes('\nBcc:'), false);
}


main().catch((error) => {
  console.error(error);
  process.exit(1);
});
