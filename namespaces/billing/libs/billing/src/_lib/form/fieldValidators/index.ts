import { validators as PicassoValidators } from '@toptal/picasso-forms/utils'
import { AnyObject, FieldValidator } from '@toptal/picasso-forms'
import { Scalars } from '@staff-portal/graphql/staff'

import {
  getCurrentTime,
  isAfter,
  isBefore,
  isSameDay,
  ParseDate
} from '../../dateTime'
import i18n from '../../../utils/i18n'

const composeValidators = <T = string>(...validators: FieldValidator<T>[]) =>
  PicassoValidators.composeValidators(validators)

const required = PicassoValidators.required

const positiveNumber = (value: string): string | undefined =>
  Number(value) > 0 ? undefined : i18n.t('common:validation.positive')

const validNumber = (value: string): string | undefined =>
  !Number.isNaN(Number(value))
    ? undefined
    : i18n.t('common:validation.validNumber')

const futureDate = (date: Scalars['Date']): string | undefined => {
  const dateObject = {
    end: date,
    start: getCurrentTime()
  }

  return isSameDay(dateObject) || isAfter(dateObject)
    ? ''
    : i18n.t('common:validation.todayOrLater')
}

interface DateBoundary {
  boundaryDate: ParseDate
  errorMessage: string
}

const dateAfter =
  ({ boundaryDate, errorMessage }: DateBoundary) =>
  (date: ParseDate) => {
    const dateObject = {
      end: date,
      start: boundaryDate
    }

    return isAfter(dateObject) ? undefined : errorMessage
  }

const dateBefore =
  ({ boundaryDate, errorMessage }: DateBoundary) =>
  (date: ParseDate) => {
    const dateObject = {
      end: date,
      start: boundaryDate
    }

    return isBefore(dateObject) ? undefined : errorMessage
  }

interface RelativeOrEqualValue {
  valueKey: string
  errorMessage?: string
  valueLabel: string
}

const greaterOrEqualValue =
  ({ valueKey, errorMessage, valueLabel }: RelativeOrEqualValue) =>
  (value: string, allValues: AnyObject) =>
    Number(value) < Number(allValues[valueKey])
      ? errorMessage ||
        i18n.t('common:validation.greaterOrEqualValue', { label: valueLabel })
      : undefined

const lessThanOrEqualValue =
  ({ valueKey, errorMessage, valueLabel }: RelativeOrEqualValue) =>
  (value: string, allValues: AnyObject) => {
    return Number(value) > Number(allValues[valueKey])
      ? errorMessage ||
          i18n.t('common:validation.lessThanOrEqualValue', {
            label: valueLabel
          })
      : undefined
  }

const pass = () => undefined

export {
  composeValidators,
  dateAfter,
  dateBefore,
  futureDate,
  greaterOrEqualValue,
  lessThanOrEqualValue,
  pass,
  positiveNumber,
  required,
  validNumber
}
