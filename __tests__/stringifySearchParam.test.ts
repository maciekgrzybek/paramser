import { stringifySearchParam } from '../src';

describe('returns a search string from regular key/value object', () => {
  test('with single param', () => {
    expect(stringifySearchParam({ topic: 'api' })).toBe('topic=api');
  });

  test('with multiple params', () => {
    expect(stringifySearchParam({ topic: 'api', something: 'else' })).toBe(
      'topic=api&something=else'
    );
  });
});

describe('returns a search string from object that contains array', () => {
  test('with default config', () => {
    expect(
      stringifySearchParam({ topic: ['api', 'new-api', 'another-api'] })
    ).toBe('topic=api&topic=new-api&topic=another-api');
  });

  describe('with separator config', () => {
    test.each(['|', ',', ';'])('that equals %s', (separator) => {
      expect(
        stringifySearchParam(
          { topic: ['api', 'new-api', 'another-api'] },
          { arrayType: 'separator', separator }
        )
      ).toBe(`topic=api${separator}new-api${separator}another-api`);
    });
  });

  test('with bracket config', () => {
    expect(
      stringifySearchParam(
        { topic: ['api', 'new-api', 'another-api'] },
        { arrayType: 'bracket' }
      )
    ).toBe('topic[]=api&topic[]=new-api&topic[]=another-api');
  });

  test('with indexed bracket config', () => {
    expect(
      stringifySearchParam(
        { topic: ['api', 'new-api', 'another-api'] },
        { arrayType: 'indexedBracket' }
      )
    ).toBe('topic[0]=api&topic[1]=new-api&topic[2]=another-api');
  });
});
