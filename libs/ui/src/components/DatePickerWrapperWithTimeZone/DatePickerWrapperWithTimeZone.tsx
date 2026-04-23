import { DatePicker, DatePickerProps } from '@toptal/picasso'
import { DatePickerValue as PicassoDatePickerValue } from '@toptal/picasso/DatePicker/types'
import React, { useCallback, useMemo } from 'react'
import {
  parseHumanReadableDate,
  MAX_DATE,
  DEFAULT_ISO_DATE_FORMAT,
  DEFAULT_ISO_DATE_PLACEHOLDER,
  DEFAULT_ISO_DATE_TIME_FORMAT,
  formatDate,
  parseISO,
  getStartOfDayDateTimeString
} from '@staff-portal/date-time-utils'
import { Scalars } from '@staff-portal/graphql/staff'

import { DatePickerValue } from './types'

export type Props = Omit<DatePickerProps, 'value' | 'timezone' | 'onChange'> & {
  value?: DatePickerValue
  outputDateFormat?: string
  timeZone: string | undefined
  onChange: (dateTimeString: DatePickerValue) => void
}

const getDateObject = (dateTimeString: Scalars['Time']) =>
  // Force convert input date to start of the day because DatePicker should not care specific time
  parseISO(getStartOfDayDateTimeString(dateTimeString))

const DatePickerWrapperWithTimeZone = ({
  value,
  outputDateFormat = DEFAULT_ISO_DATE_TIME_FORMAT,
  maxDate = MAX_DATE,
  timeZone,
  onChange,
  ...props
}: Props) => {
  const datePickerValue: PicassoDatePickerValue | undefined = useMemo(() => {
    if (value === null || value === undefined) {
      return value
    }

    if (Array.isArray(value)) {
      return value.map(dateTimeString => getDateObject(dateTimeString)) as [
        Date,
        Date
      ]
    }

    return getDateObject(value)
  }, [value])

  const handleChange = useCallback(
    (newValue: PicassoDatePickerValue) => {
      const formatOptions = { dateFormat: outputDateFormat, timeZone }

      if (newValue === null) {
        onChange(newValue)
      } else if (Array.isArray(newValue)) {
        const dateRange = newValue.map(date =>
          formatDate(date, formatOptions)
        ) as [Scalars['Time'], Scalars['Time']]

        onChange(dateRange)
      } else {
        const date: Scalars['Time'] = formatDate(newValue, formatOptions)

        onChange(date)
      }
    },
    [outputDateFormat, timeZone, onChange]
  )

  return (
    <DatePicker
      maxDate={maxDate}
      placeholder={DEFAULT_ISO_DATE_PLACEHOLDER}
      editDateFormat={DEFAULT_ISO_DATE_FORMAT}
      displayDateFormat={DEFAULT_ISO_DATE_FORMAT}
      parseInputValue={parseHumanReadableDate}
      {...props}
      value={datePickerValue}
      timezone={timeZone}
      onChange={handleChange}
    />
  )
}

export default DatePickerWrapperWithTimeZone
