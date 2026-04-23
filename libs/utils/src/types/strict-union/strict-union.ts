// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionKeys<T> = T extends any ? keyof T : never
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StrictUnionHelper<T, TAllKeys extends PropertyKey> = T extends any
  ? T & Partial<Record<Exclude<TAllKeys, keyof T>, never>>
  : never

/**
 * Type for the correct work of Discriminated Union types
 * https://stackoverflow.com/questions/52677576/typescript-discriminated-union-allows-invalid-state/52678379#52678379
 */
type StrictUnion<T> = StrictUnionHelper<T, UnionKeys<T>>

export default StrictUnion
