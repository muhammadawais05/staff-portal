import { ReactNode } from 'react'

import { DetailedListItem } from '../types'

type Label = string
type Value = string | ReactNode | null
export type ArrayOfGenerators<T> = (
  | false
  | ((fieldProps: T) => [Label, Value])
)[]

export const detailedListGeneratorsToList = <PropsType>(
  fieldProps: PropsType,
  arr: ArrayOfGenerators<PropsType>
): DetailedListItem[] => {
  return arr
    .map(fieldFn => {
      if (typeof fieldFn !== 'function') {
        return
      }

      const [label, value] = fieldFn(fieldProps)

      return {
        label,
        value
      }
    })
    .filter(Boolean) as DetailedListItem[]
}
