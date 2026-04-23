import ramdaIs from 'ramda/src/is'

import { Literal, PayloadValueType, ConvertProps, Converter } from '../../types'

const isMatching = (payload: PayloadValueType) => ramdaIs(Boolean)(payload)

const convert = ({ payload }: ConvertProps): Literal[] => {
  const payloadValue = payload as boolean

  return [payloadValue ? 'Yes' : 'No']
}

const booleanConverter: Converter = {
  isMatching,
  convert
}

export default booleanConverter
