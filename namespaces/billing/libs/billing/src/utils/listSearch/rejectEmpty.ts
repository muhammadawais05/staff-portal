import { isPlainObject } from 'lodash-es'

const isNotEmpty = ([, value = '']) => value !== ''
const makePairs = ([key = '', value = '']) => [
  key,
  isPlainObject(value) ? rejectEmpty(value) : value
]

export const rejectEmpty = <T = object>(input: T): Partial<T> =>
  Object.fromEntries(Object.entries(input).filter(isNotEmpty).map(makePairs))
