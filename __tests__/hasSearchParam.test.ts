import { hasSearchParam } from '../src';

test('returns true if param exists', () => {
  expect(hasSearchParam('?topic=api', 'topic')).toBeTruthy();
});

test('returns false if param does not exist', () => {
  expect(hasSearchParam('?topic=api', 'not-topic')).toBeFalsy();
});
