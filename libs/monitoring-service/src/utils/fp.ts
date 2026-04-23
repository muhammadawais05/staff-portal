export const get = <T>(key: keyof T) => (data: T): T[keyof T] => data[key]

export const last: <T>(array: T[] | null | undefined) => T | undefined = arr =>
  Array.isArray(arr) ? arr[arr.length - 1] : undefined
export const first: <T>(array: T[] | null | undefined) => T | undefined = arr =>
  Array.isArray(arr) ? arr[0] : undefined

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pipe = (fn1: Function, ...fns: Function[]): any =>
  fns.reduce((prevFn, nextFn) => (value: unknown) => nextFn(prevFn(value)), fn1)
