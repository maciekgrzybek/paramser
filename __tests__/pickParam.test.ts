import { pickParam } from '../src';

test('leaves only passed param', () => {
  expect(pickParam('?topic=api&other=stuff&another=yo', 'topic')).toBe(
    'topic=api'
  );
});

test('leaves only passed params', () => {
  expect(
    pickParam('?topic=api&other=stuff&another=yo', ['topic', 'other'])
  ).toBe('topic=api&other=stuff');
});
