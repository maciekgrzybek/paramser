import { excludeParam } from '../src';

describe('deletes single param from the url', () => {
  test('when url has one param', () => {
    expect(excludeParam('?topic=api', 'topic')).toBe('');
  });

  test('when url has multiple params', () => {
    expect(excludeParam('?topic=api&other-topic=other-api', 'topic')).toBe(
      'other-topic=other-api'
    );
  });

  test('when url has multiple, duplicated params', () => {
    expect(
      excludeParam(
        '?topic=api&topic=not-your-api&other-topic=other-api',
        'topic'
      )
    ).toBe('other-topic=other-api');
  });
});

describe('deletes multiple params from the url', () => {
  test('when url has two params', () => {
    expect(
      excludeParam('?topic=api&other-topic=other-api', ['topic', 'other-topic'])
    ).toBe('');
  });

  test('when url has multiple params', () => {
    expect(
      excludeParam('?topic=api&other-topic=other-api&and-another=not-api', [
        'topic',
        'other-topic',
      ])
    ).toBe('and-another=not-api');
  });

  test('when url has multiple, duplicated params', () => {
    expect(
      excludeParam(
        '?topic=api&topic=not-your-api&other-topic=other-api&other-topic=not-event-other-api&and-another=not-api',
        ['topic', 'other-topic']
      )
    ).toBe('and-another=not-api');
  });
});
