import { getEnv } from '../../src/utils/get-env';

describe('getEnv', () => {
  const ORIGINAL_ENV = { ...process.env };

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('returns the environment variable if set', () => {
    process.env.MY_VAR = 'hello';
    expect(getEnv('MY_VAR')).toBe('hello');
  });

  it('returns the default value if the environment variable is not set', () => {
    delete process.env.MY_VAR;
    expect(getEnv('MY_VAR', 'default')).toBe('default');
  });

  it('throws an error if environment variable is not set and no default is provided', () => {
    delete process.env.MY_VAR;
    expect(() => getEnv('MY_VAR')).toThrowError(
      'Environment variable MY_VAR is not set'
    );
  });
});
