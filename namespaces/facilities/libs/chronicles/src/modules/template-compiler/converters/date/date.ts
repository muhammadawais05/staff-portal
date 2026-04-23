import {
  Literal,
  DatePayloadModifier,
  PayloadValueType,
  ConvertProps,
  Converter
} from '../../types'
import { EMPHASIZED_DATE, UTC_MODIFIER } from '../../constants'
import utcModifier from '../../modifiers/utc'
import { DEFAULT_DATE_FORMAT, displayDate, toDate } from '../../../core'

export const isMatching = (payload: PayloadValueType) => {
  const date = Date.parse(payload as string)

  return !Number.isNaN(date)
}

export const convert = ({ payload, modifier }: ConvertProps): Literal[] => {
  const payloadValue = payload as string
  const modifierValue = modifier as DatePayloadModifier

  if (modifierValue === UTC_MODIFIER) {
    return [utcModifier(payloadValue)]
  }

  if (modifierValue === EMPHASIZED_DATE) {
    return [displayDate(toDate(payloadValue), DEFAULT_DATE_FORMAT)]
  }

  return [payloadValue]
}

const dateConverter: Converter = {
  isMatching,
  convert
}

export default dateConverter
