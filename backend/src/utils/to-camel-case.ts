/**
 * Converts the keys of each object in an array from snake_case or kebab-case to camelCase.
 *
 * @param rows - An array of objects to convert
 * @returns A new array of objects with camelCase keys
 */
export const toCamelCase = <T extends Record<string, any>>(rows: T[]): T[] => {
  return rows.map((row) => {
    const replaced: Record<string, any> = {};

    for (let key in row) {
      const camelCase = key.replace(/([-_][a-z])/gi, (match) =>
        match.toUpperCase().replace("_", "")
      );
      replaced[camelCase] = row[key];
    }

    return replaced as T;
  });
};
