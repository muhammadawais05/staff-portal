type EmptyType = undefined | null | '' | 0
type NotEmptyType = string | number

export const isEmpty = (value: EmptyType | NotEmptyType): value is EmptyType =>
  !value || !value.toString().trim()
