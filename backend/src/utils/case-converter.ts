const toCamel = (str: string): string =>
  str.replace(/[-_]+(.)/g, (_, char: string) => char.toUpperCase());

export const toCamelCase = <T>(input: T): T => {
  if (Array.isArray(input)) {
    return input.map((item) => toCamelCase(item)) as T;
  }

  if (input instanceof Date) {
    return input;
  }

  if (input !== null && typeof input === "object") {
    return Object.keys(input).reduce((acc, key) => {
      const camelKey = toCamel(key);
      const source = input as Record<string, unknown>;
      acc[camelKey] = toCamelCase(source[key]);
      return acc;
    }, {} as Record<string, unknown>) as T;
  }

  return input;
};
