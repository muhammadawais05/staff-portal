import { ChangeEvent } from 'react'
import { MAX_INT_LENGTH } from '@staff-portal/config'

import { AmountRange, AmountRangeHandler, FieldName } from './AmountRangeInput'

type Formatter = (value: string) => string
type LimitedFormatter = (limit: number) => Formatter

export const cleanNumberValueWithLimit: LimitedFormatter = limit => value => {
  const limitRegexp = new RegExp(`([0-9]{${limit}})([0-9]*)(.[0-9]+)*`)

  return value
    .replace(/[^0-9.]/g, '')
    .replace(limitRegexp, '$1$3')
    .split('.')
    .slice(0, 2)
    .join('.')
}

export const amountCleanNumberValue = cleanNumberValueWithLimit(MAX_INT_LENGTH)

export const formattedCleanNumberValueWithLimit: LimitedFormatter =
  limit => value => {
    const cleanValue = cleanNumberValueWithLimit(limit)(value)

    return cleanValue ? Number(cleanValue).toFixed(2) : ''
  }

export const makeHandler = (
  fieldName: FieldName,
  eventHandler?: AmountRangeHandler,
  value?: AmountRange,
  formatter?: Formatter
  // eslint-disable-next-line max-params
) =>
  eventHandler
    ? ({ target: { value: val } }: ChangeEvent<HTMLInputElement>) => {
        eventHandler({
          ...value,
          [fieldName]: formatter ? formatter(val) : val
        })
      }
    : undefined
