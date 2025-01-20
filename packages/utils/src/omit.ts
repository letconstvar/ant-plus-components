export default function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result: Partial<T> = {};

  for (const key in obj) {
    if (!keys.includes(key as unknown as K)) {
      result[key] = obj[key];
    }
  }

  return result as Omit<T, K>;
}
