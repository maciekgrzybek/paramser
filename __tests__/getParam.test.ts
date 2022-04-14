import { getParam } from '../src';

test('returns single value if param exists', () => {
  expect(getParam('?topic=api', 'topic')).toBe('api');
});

test('returns an array of values associated with a given search param', () => {
  expect(getParam('?topic=api&topic=another-api', 'topic')).toEqual([
    'api',
    'another-api',
  ]);
});

test('returns null if param does not exist', () => {
  expect(getParam('?topic=api', 'not-topic')).toBeNull();
});

test('does not parse number-string to number if option is not passed', () => {
  expect(getParam('?amount=37', 'amount')).toBe('37');
});

test('does not parse params if options are not passed', () => {
  expect(getParam('?amount=true', 'amount')).toBe('true');
  expect(getParam('?amount=false', 'amount')).toBe('false');
});

describe('parse number-string to number if option is passed', () => {
  test('with one param', () => {
    expect(getParam('?amount=37', 'amount', { parseNumbers: true })).toBe(37);
  });

  test('with multiple params', () => {
    expect(
      getParam('?amount=37&amount=120&api=node', 'amount', {
        parseNumbers: true,
      })
    ).toEqual([37, 120]);
  });
});

describe('parse boolean-string to boolean if option is passed', () => {
  test('with one param', () => {
    expect(getParam('?isValid=true', 'isValid', { parseBooleans: true })).toBe(
      true
    );
  });

  test('with multiple params', () => {
    expect(
      getParam('?isValid=true&isValid=false&api=node', 'isValid', {
        parseBooleans: true,
      })
    ).toEqual([true, false]);
  });
});

test('parse params if options are passed', () => {
  expect(
    getParam('?isValid=true&isValid=28&api=node', 'isValid', {
      parseNumbers: true,
      parseBooleans: true,
    })
  ).toEqual([true, 28]);
});
