/**
 * Retrieves an environment variable by key.
 *
 * @param key - The name of the environment variable
 * @param defaultValue - Optional default value if the environment variable is not set
 * @returns The value of the environment variable or the default value
 * @throws Error if the environment variable is not set and no default value is provided
 */
export const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];

  if (value !== undefined) return value;
  if (defaultValue !== undefined) return defaultValue;

  throw new Error(`Environment variable ${key} is not set`);
};