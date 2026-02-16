const toCamel = (str: string): string =>
  str.replace(/[-_]+(.)/g, (_, char: string) => char.toUpperCase());

export const toCamelCase = (input: any): any => {
  if (Array.isArray(input)) {
    return input.map(toCamelCase);
  }

  if (input instanceof Date) {
    return input;
  }

  if (input !== null && typeof input === "object") {
    return Object.keys(input).reduce((acc, key) => {
      const camelKey = toCamel(key);
      acc[camelKey] = toCamelCase(input[key]);
      return acc;
    }, {} as Record<string, any>);
  }

  return input;
};
