import {
  DatePicker,
  DatePickerProps,
  DatePickerValue as PicassoDatePickerValue
} from '@toptal/picasso'
import React, { useCallback, useMemo } from 'react'
import {
  formatDate,
  parseHumanReadableDate,
  parseISO,
  MAX_DATE,
  DEFAULT_ISO_DATE_FORMAT,
  DEFAULT_ISO_DATE_PLACEHOLDER,
  WEEK_STARTS_ON
} from '@staff-portal/date-time-utils'
import { Scalars } from '@staff-portal/graphql/staff'

import { DatePickerValue } from './types'

export type Props = Omit<DatePickerProps, 'value' | 'timezone' | 'onChange'> & {
  value?: DatePickerValue
  onChange: (dateString: DatePickerValue) => void
  timezone?: never
}

const DatePickerWrapper = ({
  value,
  maxDate = MAX_DATE,
  onChange,
  ...props
}: Props) => {
  const datePickerValue: PicassoDatePickerValue | undefined = useMemo(() => {
    if (value === null || value === undefined) {
      return value
    }

    if (Array.isArray(value)) {
      return value.map(dateString => parseISO(dateString)) as [Date, Date]
    }

    return parseISO(value)
  }, [value])

  const handleChange = useCallback(
    (newValue: PicassoDatePickerValue) => {
      const formatOptions = { dateFormat: DEFAULT_ISO_DATE_FORMAT }

      if (newValue === null) {
        onChange(newValue)
      } else if (Array.isArray(newValue)) {
        const dateRange = newValue.map(date =>
          formatDate(date, formatOptions)
        ) as [Scalars['Date'], Scalars['Date']]

        onChange(dateRange)
      } else {
        const date: Scalars['Date'] = formatDate(newValue, formatOptions)

        onChange(date)
      }
    },
    [onChange]
  )

  return (
    <DatePicker
      maxDate={maxDate}
      placeholder={DEFAULT_ISO_DATE_PLACEHOLDER}
      editDateFormat={DEFAULT_ISO_DATE_FORMAT}
      displayDateFormat={DEFAULT_ISO_DATE_FORMAT}
      weekStartsOn={WEEK_STARTS_ON}
      parseInputValue={parseHumanReadableDate}
      {...props}
      value={datePickerValue}
      onChange={handleChange}
    />
  )
}

export default DatePickerWrapper
