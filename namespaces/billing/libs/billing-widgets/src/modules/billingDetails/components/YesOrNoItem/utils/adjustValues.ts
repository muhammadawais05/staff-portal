import { EMPTY_VALUE } from '../YesOrNoItem'

export const adjustValues =
  (fieldName: string) =>
  ({ [fieldName]: value, ...rest }) => ({
    ...rest,
    [fieldName]: value === EMPTY_VALUE ? undefined : Boolean(value)
  })
