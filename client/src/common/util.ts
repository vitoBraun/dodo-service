export function pick<T, K extends keyof T>(obj: T, ...keys: K[]) {
  const picked = {} as Pick<T, K>;
  for (const key of keys) {
    picked[key] = obj[key];
  }
  return picked;
}
