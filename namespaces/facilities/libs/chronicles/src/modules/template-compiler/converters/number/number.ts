import ramdaIs from 'ramda/src/is'

import { Literal, PayloadValueType, ConvertProps, Converter } from '../../types'

const isMatching = (payload: PayloadValueType) => ramdaIs(Number)(payload)

const convert = ({ payload }: ConvertProps): Literal[] => {
  const payloadValue = payload as number

  return [payloadValue.toString()]
}

const numberConverter: Converter = {
  isMatching,
  convert
}

export default numberConverter
