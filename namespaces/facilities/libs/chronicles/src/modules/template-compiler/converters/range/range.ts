import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
  displayDate,
  isDateValid,
  isTimeValid,
  toDate,
  toDateWithTime
} from '../../../core'
import { Converter, ConvertProps, Literal, PayloadValueType } from '../../types'
import { RANGE_TYPE, TYPE_FIELD } from '../../constants'
import { interpolate } from '../../interpolate'

const isMatching = (payload: PayloadValueType) => {
  const objectPayload = payload as Record<string, any>

  return objectPayload[TYPE_FIELD] === RANGE_TYPE
}

export const convertPayloadValue = (
  payloadValue: any,
  articles: { date: string; time: string; other: string }
): Literal[] => {
  if (isDateValid(payloadValue)) {
    return [
      ` ${articles.date} ${displayDate(
        toDate(payloadValue),
        DEFAULT_DATE_FORMAT
      )}`
    ]
  }

  if (isTimeValid(payloadValue)) {
    return [
      ` ${articles.time} ${displayDate(
        toDateWithTime(payloadValue),
        DEFAULT_TIME_FORMAT
      )}`
    ]
  }

  // fallback to string converter
  return [` ${articles.other} `, ...interpolate({ payload: payloadValue })]
}

const convert = ({ payload }: ConvertProps): Literal[] => {
  const payloadValue = payload as Record<string, any>

  const { start, stop } = payloadValue

  const isStartDefined = start !== undefined
  const isStopDefined = stop !== undefined

  if (start === stop) {
    return [
      ...convertPayloadValue(start, { date: 'on', time: 'at', other: '' })
    ]
  }

  const literals = []

  if (isStartDefined) {
    literals.push(
      ...convertPayloadValue(start, {
        date: 'from',
        time: 'from',
        other: 'from'
      })
    )
  }

  if (isStopDefined) {
    literals.push(
      ...convertPayloadValue(stop, {
        date: 'till',
        time: 'till',
        other: 'till'
      })
    )
  }

  return literals
}

const rangeConverter: Converter = {
  isMatching,
  convert
}

export default rangeConverter
