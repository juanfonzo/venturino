const assert = require('node:assert/strict');
const { requireTypeScript } = require('./register-ts');

const {
  createPadwaySignature,
  PadwayApiAuthError,
  verifyPadwayRequest,
} = requireTypeScript('lib/market-reference/auth.ts');
const {
  buildSampleStrength,
  buildMarketReferenceStatistics,
  filterDirectCandidates,
  rankExpandedCandidates,
  selectDirectCandidates,
} = requireTypeScript('lib/market-reference/matching.ts');
const { normalizeMachineIdentity } = requireTypeScript('lib/normalize/machineIdentity.ts');
const {
  MarketReferenceValidationError,
  parseDirectReferenceInput,
  parseExpandedSearchInput,
} = requireTypeScript('lib/market-reference/validation.ts');

function main() {
  testSignedRequest();
  testValidation();
  testMachineIdentity();
  testDirectMatching();
  testAutomaticYearExpansion();
  testExpandedRanking();
  console.log('Market reference API: 6/6 checks OK');
}

function testSignedRequest() {
  const secret = 'test-secret-with-at-least-thirty-two-characters';
  const timestamp = '1760000000';
  const requestId = 'request-test-0001';
  const rawBody = JSON.stringify({ categoria: 'Tractores', marca: 'John Deere' });
  const signature = createPadwaySignature({ secret, timestamp, requestId, rawBody });
  const env = {
    PADWAY_API_ENABLED: 'true',
    PADWAY_API_CLIENT_ID: 'padway-test',
    PADWAY_API_SECRET: secret,
    PADWAY_API_MAX_SKEW_SECONDS: '300',
  };

  const validHeaders = new Map([
    ['x-client-id', 'padway-test'],
    ['x-timestamp', timestamp],
    ['x-request-id', requestId],
    ['x-signature', `sha256=${signature}`],
  ]);
  const auth = verifyPadwayRequest(validHeaders, rawBody, {
    nowMs: Number(timestamp) * 1000,
    env,
  });
  assert.deepEqual(auth, { clientId: 'padway-test', requestId });

  const invalidHeaders = new Map(validHeaders);
  invalidHeaders.set('x-signature', `sha256=${'0'.repeat(64)}`);
  assert.throws(
    () => verifyPadwayRequest(invalidHeaders, rawBody, { nowMs: Number(timestamp) * 1000, env }),
    (error) => error instanceof PadwayApiAuthError && error.code === 'UNAUTHORIZED',
  );

  assert.throws(
    () => verifyPadwayRequest(validHeaders, rawBody, {
      nowMs: (Number(timestamp) + 301) * 1000,
      env,
    }),
    (error) => error instanceof PadwayApiAuthError && error.code === 'REQUEST_EXPIRED',
  );
}

function testValidation() {
  const direct = parseDirectReferenceInput({
    categoria: 'tractor',
    marca: 'John Deere',
    modelo: '  6110 J  ',
    anio: 2021,
    hp: 110,
    horas: 3500,
  });
  assert.equal(direct.categoria, 'Tractores');
  assert.equal(direct.marcaNorm, 'JOHN DEERE');
  assert.equal(direct.modeloNorm, '6110J');
  assert.equal(direct.modeloDisplay, '6110J');
  assert.equal(Object.hasOwn(direct, 'hp'), false);
  assert.equal(Object.hasOwn(direct, 'horas'), false);

  const expanded = parseExpandedSearchInput({
    categoria: 'Tractores',
    modelo: '6R',
    page: 2,
    pageSize: 50,
  });
  assert.equal(expanded.page, 2);
  assert.equal(expanded.pageSize, 50);

  assert.throws(
    () => parseDirectReferenceInput({ categoria: 'Tractores', marca: 'JD', modelo: '6R' }),
    (error) => error instanceof MarketReferenceValidationError,
  );
}

function testMachineIdentity() {
  const cases = [
    {
      input: { category: 'Tractores', brand: 'New Holland', model: 'T8295 270' },
      modelKey: 'T8295',
      display: 'T8.295',
    },
    {
      input: { category: 'Tractores', brand: 'New Holland', model: 'TS6.140', hp: 140 },
      modelKey: 'TS6140',
    },
    {
      input: { category: 'Tractores', brand: 'Case IH', model: 'FARMALL 95', hp: 95 },
      modelKey: 'FARMALL95',
    },
    {
      input: { category: 'Tractores', brand: 'Case IH', model: 'CIH MAGNUM 315' },
      modelKey: 'MAGNUM315',
    },
    {
      input: { category: 'Tractores', brand: 'Fiat', model: '115-90', hp: 115 },
      modelKey: '11590',
    },
    {
      input: { category: 'Tractores', brand: 'John Deere', model: '5075ED' },
      modelKey: '5075E',
    },
    {
      input: { category: 'Cosechadoras', brand: 'John Deere', model: 'S550 DOBL DRAPER' },
      modelKey: 'S550',
      qualifier: 'Plataforma Draper',
    },
    {
      input: { category: 'Cosechadoras', brand: 'John Deere', model: 'S780 PLATAF' },
      modelKey: 'S780',
      qualifier: 'Con plataforma',
    },
    {
      input: { category: 'Cosechadoras', brand: 'John Deere', model: 'S77040' },
      modelKey: 'S770',
      qualifier: 'Plataforma de 40 pies',
    },
    {
      input: { category: 'Pulverizadoras', brand: 'John Deere', model: '4730 HYDRO30 METROS' },
      modelKey: '4730',
      qualifier: 'Botalón de 30 metros',
    },
    {
      input: { category: 'Pulverizadoras', brand: 'PLA', model: 'MAP 3 3300' },
      modelKey: 'MAP33300',
      display: 'MAP 3 3300',
    },
    {
      input: { category: 'Cosechadoras', brand: 'New Holland', model: 'Holland CR7.90' },
      modelKey: 'CR790',
      display: 'CR7.90',
    },
  ];

  for (const testCase of cases) {
    const identity = normalizeMachineIdentity(testCase.input);
    assert.equal(identity.modelKey, testCase.modelKey);
    if (testCase.display) assert.equal(identity.modelDisplay, testCase.display);
    if (testCase.qualifier) assert.ok(identity.qualifiers.includes(testCase.qualifier));
  }

  assert.notEqual(
    normalizeMachineIdentity({ category: 'Tractores', brand: 'John Deere', model: '6100D' }).modelKey,
    normalizeMachineIdentity({ category: 'Tractores', brand: 'John Deere', model: '6100E' }).modelKey,
  );
}

function testDirectMatching() {
  const candidates = [
    candidate({ listingId: 1, modelNorm: '6110 J', year: 2020, priceUsd: 80000 }),
    candidate({ listingId: 2, modelNorm: '6110J', year: 2022, priceUsd: 90000 }),
    candidate({ listingId: 3, modelNorm: '6120 J', year: 2021, priceUsd: 95000 }),
    candidate({ listingId: 4, modelNorm: '6110 J', year: 2017, priceUsd: 70000 }),
    candidate({ listingId: 5, source: 'venturino', modelNorm: '6110 J', year: 2021 }),
  ];

  const matches = filterDirectCandidates(candidates, {
    modelNorm: '6110 J',
    year: 2021,
    yearTolerance: 2,
  });
  assert.deepEqual(matches.map((row) => row.listingId), [1, 2]);
  assert.deepEqual(buildMarketReferenceStatistics(matches), {
    currency: 'USD',
    sampleSize: 2,
    min: 80000,
    p25: 82500,
    median: 85000,
    p75: 87500,
    max: 90000,
  });
}

function testAutomaticYearExpansion() {
  const selection = selectDirectCandidates([
    candidate({ listingId: 1, modelNorm: '6145J', year: 2020 }),
    candidate({ listingId: 2, modelNorm: '6145J', year: 2022 }),
    candidate({ listingId: 3, modelNorm: '6145J', year: 2016 }),
  ], {
    modelNorm: '6145J',
    year: 2021,
    nearYearTolerance: 2,
    extendedYearTolerance: 5,
    desiredSampleSize: 3,
  });

  assert.equal(selection.yearScope, 'extended');
  assert.equal(selection.criterion.titulo, 'Mismo modelo con más años de referencia');
  assert.deepEqual(selection.candidates.map((row) => row.listingId), [1, 2, 3]);
  assert.equal(buildSampleStrength(selection.candidates.length).titulo, 'Muestra suficiente');
}

function testExpandedRanking() {
  const ranked = rankExpandedCandidates([
    candidate({ listingId: 1, modelNorm: '6 R 150', year: 2020 }),
    candidate({ listingId: 2, modelNorm: '6R', year: 2021 }),
    candidate({ listingId: 3, modelNorm: '7R', year: 2021 }),
  ], { modelNorm: '6R', familyKey: '6R', year: 2021 });
  assert.deepEqual(ranked.map((row) => row.listingId), [2, 1]);

  const johnDeere5E = rankExpandedCandidates([
    candidate({ listingId: 4, modelNorm: '5065E', year: 2013 }),
    candidate({ listingId: 5, modelNorm: '5090E', year: 2014 }),
    candidate({ listingId: 6, modelNorm: '6125E', year: 2013 }),
  ], { modelNorm: '5E', familyKey: '5E', year: 2013 });
  assert.deepEqual(johnDeere5E.map((row) => row.listingId), [4, 5]);
}

function candidate(overrides = {}) {
  const result = {
    listingId: 100,
    source: 'agrofy',
    seller: 'Concesionario externo',
    title: 'Tractor usado',
    brand: 'John Deere',
    brandNorm: 'JOHN DEERE',
    model: '6110 J',
    modelNorm: '6110 J',
    year: 2021,
    priceUsd: 100000,
    province: 'Córdoba',
    city: null,
    url: `https://example.com/${overrides.listingId ?? 100}`,
    ...overrides,
  };
  const modelKey = (result.modelNorm ?? result.model ?? '').replace(/[^A-Z0-9]/gi, '').toUpperCase();
  return {
    ...result,
    modelKey: overrides.modelKey ?? modelKey,
    modelDisplay: overrides.modelDisplay ?? result.modelNorm ?? result.model,
    modelQualifiers: overrides.modelQualifiers ?? [],
  };
}

main();
