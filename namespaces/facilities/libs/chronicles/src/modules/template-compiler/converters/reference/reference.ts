import { Literal, PayloadValueType, ConvertProps, Converter } from '../../types'

const REFERENCE_FIELD = 'reference'

const isMatching = (payload: PayloadValueType) => {
  const objectPayload = payload as Record<string, any>

  return objectPayload[REFERENCE_FIELD] !== undefined
}

const convert = ({
  payload,
  interpolate,
  modifier
}: ConvertProps): Literal[] => {
  const payloadValue = payload as Record<string, any>

  const reference = payloadValue[REFERENCE_FIELD]

  // continue iteration, because reference prop value
  // can be the object of any PayloadValueType type
  return [...interpolate({ payload: reference, modifier })]
}

const referenceConverter: Converter = {
  isMatching,
  convert
}

export default referenceConverter
