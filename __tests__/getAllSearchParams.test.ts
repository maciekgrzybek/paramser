import { getAllSearchParams } from '../src';

test('returns all params with their values', () => {
  expect(getAllSearchParams('?topic=api&other=37&isValid=true')).toEqual({
    topic: 'api',
    other: '37',
    isValid: 'true',
  });
});

test('returns all params with their values and parse numbers', () => {
  expect(
    getAllSearchParams('?topic=api&other=stuff&amount=37&isValid=true', {
      parseNumbers: true,
    })
  ).toEqual({
    topic: 'api',
    other: 'stuff',
    amount: 37,
    isValid: 'true',
  });
});

test('returns all params with their values and parse booleans', () => {
  expect(
    getAllSearchParams('?topic=api&other=stuff&amount=37&isValid=true', {
      parseBooleans: true,
    })
  ).toEqual({
    topic: 'api',
    other: 'stuff',
    amount: '37',
    isValid: true,
  });
});

test('returns all params with their values and parse numbers and booleans', () => {
  expect(
    getAllSearchParams('?topic=api&other=stuff&amount=37&isValid=true', {
      parseNumbers: true,
      parseBooleans: true,
    })
  ).toEqual({
    topic: 'api',
    other: 'stuff',
    amount: 37,
    isValid: true,
  });
});

test('returns all keys of the params', () => {
  expect(
    getAllSearchParams('?topic=api&other=stuff', { keysOnly: true })
  ).toEqual(['topic', 'other']);
});

test('returns all values of the params', () => {
  expect(
    getAllSearchParams('?topic=api&other=stuff', { valuesOnly: true })
  ).toEqual(['api', 'stuff']);
});

test('returns all values of the params and parse numbers', () => {
  expect(
    getAllSearchParams('?topic=api&other=stuff&amount=37&isValid=true', {
      valuesOnly: true,
      parseNumbers: true,
    })
  ).toEqual(['api', 'stuff', 37, 'true']);
});

test('returns all values of the params and parse booleans', () => {
  expect(
    getAllSearchParams('?topic=api&other=stuff&amount=37&isValid=true', {
      valuesOnly: true,
      parseBooleans: true,
    })
  ).toEqual(['api', 'stuff', '37', true]);
});

test('returns all values of the params and parse numbers and booleans', () => {
  expect(
    getAllSearchParams('?topic=api&other=stuff&amount=37&isValid=true', {
      valuesOnly: true,
      parseBooleans: true,
      parseNumbers: true,
    })
  ).toEqual(['api', 'stuff', 37, true]);
});
