export const doesObjectContainKey = <T extends string>(obj: unknown, key: T): obj is Partial<Record<T, string>> =>
  typeof obj === 'object' && obj !== null && key in obj;
