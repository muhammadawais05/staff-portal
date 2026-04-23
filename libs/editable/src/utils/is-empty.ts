type EmptyType = undefined | null | '' | 0
type NotEmptyType = string | number

const isEmpty = (value: EmptyType | NotEmptyType): value is EmptyType =>
  !value || !value.toString().trim()

export default isEmpty
