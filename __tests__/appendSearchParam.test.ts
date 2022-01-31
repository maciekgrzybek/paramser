import { appendSearchParam } from '../src';

test('appends single param to the url', () => {
  expect(appendSearchParam('?topic=api', { 'new-topic': 'new-api' })).toBe(
    'topic=api&new-topic=new-api'
  );
});

test('appends multiple params to the url', () => {
  expect(
    appendSearchParam('?topic=api', {
      'new-topic': 'new-api',
      'newer-topic': 'newer-api',
    })
  ).toBe('topic=api&new-topic=new-api&newer-topic=newer-api');
});

describe('appends array to the url', () => {
  test('with default config', () => {
    expect(
      appendSearchParam('?technology=nodejs', {
        topic: ['api', 'new-api', 'another-api'],
      })
    ).toBe('technology=nodejs&topic=api&topic=new-api&topic=another-api');
  });

  describe('with separator config', () => {
    test.each(['|', ',', ';'])('that equals %s', (separator) => {
      expect(
        appendSearchParam(
          '?technology=nodejs',
          { topic: ['api', 'new-api', 'another-api'] },
          { arrayType: 'separator', separator }
        )
      ).toBe(
        `technology=nodejs&topic=api${separator}new-api${separator}another-api`
      );
    });
  });

  test('with bracket config', () => {
    expect(
      appendSearchParam(
        '?technology=nodejs',
        { topic: ['api', 'new-api', 'another-api'] },
        { arrayType: 'bracket' }
      )
    ).toBe('technology=nodejs&topic[]=api&topic[]=new-api&topic[]=another-api');
  });

  test('with indexed bracket config', () => {
    expect(
      appendSearchParam(
        '?technology=nodejs',
        { topic: ['api', 'new-api', 'another-api'] },
        { arrayType: 'indexedBracket' }
      )
    ).toBe(
      'technology=nodejs&topic[0]=api&topic[1]=new-api&topic[2]=another-api'
    );
  });
});
