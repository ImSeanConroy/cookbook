import { toCamelCase } from '../../src/utils/to-camel-case';

describe('toCamelCase', () => {
    it('converts flat keys to camelCase', () => {
    const input = [{ some_key: 'value', another_key: 42 }];
    const output = toCamelCase(input);
    expect(output).toEqual([{ someKey: 'value', anotherKey: 42 }]);
  });

  it('leaves already camelCase keys unchanged', () => {
    const input = [{ someKey: 'value' }];
    const output = toCamelCase(input);
    expect(output).toEqual([{ someKey: 'value' }]);
  });
});
