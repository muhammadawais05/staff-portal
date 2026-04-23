import isEmpty from './is-empty'

type Input = Record<string, string | null | undefined>
type Output<T, K> = { [key in Extract<keyof T, K>]: string }
type StringKey<T> = keyof T & string

export const getAdjustSingleStringValue = <
  T extends Input,
  Key extends StringKey<T> = StringKey<T>
>(
  key: Key
) => (input: T): Output<T, Key> => {
  const adjustedValue = isEmpty(input?.[key]) ? '' : input[key]?.trim()

  return { [key]: adjustedValue } as Output<T, Key>
}

export default getAdjustSingleStringValue
