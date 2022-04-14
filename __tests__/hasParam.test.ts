import { hasParam } from '../src';

test('returns true if param exists', () => {
  expect(hasParam('?topic=api', 'topic')).toBeTruthy();
});

test('returns false if param does not exist', () => {
  expect(hasParam('?topic=api', 'not-topic')).toBeFalsy();
});
