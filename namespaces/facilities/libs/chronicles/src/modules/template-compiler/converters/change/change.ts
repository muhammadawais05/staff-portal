import ramdaIsEmpty from 'ramda/src/isEmpty'

import { humanize, isDateValid, isTimeValid } from '../../../core'
import {
  ChangePayloadModifier,
  Converter,
  ConvertProps,
  Literal,
  PayloadValueType
} from '../../types'
import { interpolate } from '../../interpolate'
import {
  CHANGE_TYPE,
  NO_LABEL_MODIFIER,
  SWITCH_MODIFIER,
  TYPE_FIELD
} from '../../constants'
import switchModifier from '../../modifiers/switch'
import { convertPayloadValue as convertRangePayloadValue } from '../range'

const isValidDateOrTime = (payloadValue: any): payloadValue is string =>
  isDateValid(payloadValue) || isTimeValid(payloadValue)

const isMatching = (payload: PayloadValueType) => {
  const objectPayload = payload as Record<string, any>

  return objectPayload[TYPE_FIELD] === CHANGE_TYPE
}

export const convertPayloadValue = (
  payloadValue: any,
  article: string
): Literal[] => {
  if (isValidDateOrTime(payloadValue)) {
    return convertRangePayloadValue(payloadValue, {
      date: article,
      time: article,
      other: article
    })
  }

  // fallback to string converter
  return [` ${article} `, ...interpolate({ payload: payloadValue })]
}

const convert = ({ payload, key, modifier }: ConvertProps): Literal[] => {
  const payloadValue = payload as Record<string, any>
  const modifierValue = modifier as ChangePayloadModifier

  const { from, to, label } = payloadValue
  const result: Literal[] = []

  if (modifierValue === SWITCH_MODIFIER) {
    return switchModifier(Boolean(to))
  }

  const isFromDefined = from !== undefined
  const isToDefined = to !== undefined

  if (modifierValue !== NO_LABEL_MODIFIER) {
    if (label && !ramdaIsEmpty(label)) {
      result.push(label)
    } else if (key && !ramdaIsEmpty(key)) {
      result.push(humanize(key))
    }
  }

  if (isFromDefined) {
    result.push(...convertPayloadValue(from, 'from'))
  }

  if (isToDefined) {
    result.push(...convertPayloadValue(to, 'to'))
  }

  return result
}

const changeConverter: Converter = {
  isMatching,
  convert
}

export default changeConverter
