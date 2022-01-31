import { pickSearchParam } from '../src';

test('leaves only passed param', () => {
  expect(pickSearchParam('?topic=api&other=stuff&another=yo', 'topic')).toBe(
    'topic=api'
  );
});

test('leaves only passed params', () => {
  expect(
    pickSearchParam('?topic=api&other=stuff&another=yo', ['topic', 'other'])
  ).toBe('topic=api&other=stuff');
});
