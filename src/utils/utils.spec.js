import { parseFilters } from './index';

describe('parseFilters should', () => {
  it('return a string', () => {
    expect(typeof parseFilters({})).toBe('string');
  });
  it('compose a string of `key=value` parameters given an object of `{key: value}`, concatenated by `&`', () => {
    expect(parseFilters({ key1: `value1` })).toBe('key1=value1');
    expect(
      parseFilters({ key1: `value1`, key2: `value2`, key3: `value3` })
    ).toBe('key1=value1&key2=value2&key3=value3');
  });
  it('ignore undefined values when composing the parameters string', () => {
    expect(parseFilters({ key1: `value1`, key2: undefined })).toBe(
      'key1=value1'
    );
    expect(
      parseFilters({ key1: `value1`, key2: undefined, key3: 'value3' })
    ).toBe('key1=value1&key3=value3');
    expect(parseFilters({ key1: undefined })).toBe('');
  });
});
