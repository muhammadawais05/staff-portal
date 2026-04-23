import { Option } from '@toptal/picasso/Select'

import { stringListToOptions } from './string-list-to-options'
import titleize from './titleize'

export const enumToHumanOptions = <T>(Enum: T): Option[] => {
  return stringListToOptions(Object.keys(Enum)).map(({ text, value }) => ({
    value,
    text: titleize(text)
  }))
}
