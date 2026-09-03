const assert = require('node:assert/strict');
const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const { requireTypeScript } = require('./register-ts');

const {
  findDirectMarketReferences,
  searchExpandedMarketReferences,
} = requireTypeScript('lib/market-reference/service.ts');
const {
  parseDirectReferenceInput,
  parseExpandedSearchInput,
} = requireTypeScript('lib/market-reference/validation.ts');

const CASES = [
  {
    auditIds: [3, 7],
    input: { categoria: 'Tractores', marca: 'John Deere', modelo: '6J', anio: 2016, page: 1, pageSize: 50 },
    mode: 'expanded',
  },
  {
    auditIds: [31, 40, 41],
    input: { categoria: 'Pulverizadoras', marca: 'Metalfor', modelo: 'Multiple 3200 SE', anio: 2005 },
    mode: 'direct',
  },
  {
    auditIds: [43, 45, 46],
    input: { categoria: 'Pulverizadoras', marca: 'PLA', modelo: 'MAP 3 3300 H', anio: 2016 },
    mode: 'direct',
  },
  {
    auditIds: [52],
    input: { categoria: 'Cosechadoras', marca: 'John Deere', modelo: 'S770SD40D', anio: 2021 },
    mode: 'direct',
  },
];

async function main() {
  console.log('=== Verificación API: consultas históricas sin resultados ===');

  for (const testCase of CASES) {
    const result = testCase.mode === 'direct'
      ? await findDirectMarketReferences(
        parseDirectReferenceInput(testCase.input),
        `zero-result-verification-${testCase.auditIds.join('-')}`,
      )
      : await searchExpandedMarketReferences(
        parseExpandedSearchInput(testCase.input),
        `zero-result-verification-${testCase.auditIds.join('-')}`,
      );
    const count = result.audit.resultCount;
    assert.ok(count > 0, `Las auditorías ${testCase.auditIds.join(', ')} siguen sin referencias.`);
    console.log(
      `${testCase.input.marca} ${testCase.input.modelo}: ${count} referencias (auditorías ${testCase.auditIds.join(', ')}).`,
    );
  }

  console.log('Consultas históricas: 4/4 con referencias en la base local.');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
