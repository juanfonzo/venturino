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
} = requireTypeScript('lib/superadmin/review.ts');

async function main() {
  await testCredentialsAndSessions();
  testAlertConfiguration();
  testSanitization();
  testAlertLimiter();
  testReviewValidationAndEmail();
  console.log('Superadmin: 5/5 checks OK');
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

function testReviewValidationAndEmail() {
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
