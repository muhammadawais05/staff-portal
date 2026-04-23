import { omit, snakeCase } from 'lodash-es'
import React, { ComponentType } from 'react'

import i18n from '../../utils/i18n'

// TODO: investigate if it's worth to replace this function with lodash's sortBy
export const getObjectSumValues = (
  values: { [key: string]: string | number },
  excludeKeys: string[]
) =>
  Object.keys(values).reduce((acc: number, key: string) => {
    if (excludeKeys.includes(key)) {
      return acc
    }

    const value: string | number = values[key]

    return acc + (value ? Number(value) : 0)
  }, 0)

export const withSCFilterProps =
  (Tag: ComponentType<unknown>, filter: string[] = []) =>
  (props: object) => {
    return <Tag {...omit(props, filter)} />
  }

export const setObjectKeysToSnakeCase = (data: {
  [key: string]: string | number
}): { [key: string]: string | number } =>
  Object.keys(data).reduce(
    (acc: { [key: string]: string | number }, key: string) => {
      const transformedKey = snakeCase(key)

      acc[transformedKey] = data[key]

      return acc
    },
    {}
  )

interface FormatAsNumber {
  precisionMin?: number
  precisionMax?: number
  locale?: string
}

export const formatAsNumber = (
  value: string | number = 0,
  { precisionMin = 2, precisionMax = 2, locale = 'en-US' }: FormatAsNumber = {}
) =>
  new Intl.NumberFormat(locale, {
    maximumFractionDigits: precisionMax,
    minimumFractionDigits: precisionMin
  }).format(typeof value === 'string' ? Number(value) : value)

export const formatAsPercentage = (
  value: string | number = 0,
  options?: FormatAsNumber
) => `${formatAsNumber(value, options)}%`

export const EMPTY_DATA = '—'

export const PAYMENT_ELIGIBILITY_CONTACT = {
  // These values are hardcoded in the Platform
  // https://github.com/toptal/platform/blob/master/config/locales/granite/payment.yml#L36
  name: 'Carlos Aguirre',
  email: 'carlos.aguirre@toptal.com'
}

export const getYesOrNo = (condition: boolean) =>
  i18n.t(condition ? 'common:details.values.yes' : 'common:details.values.no')
