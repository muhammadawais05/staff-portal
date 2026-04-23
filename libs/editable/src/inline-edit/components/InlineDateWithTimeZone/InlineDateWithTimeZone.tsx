import { DatePickerProps } from '@toptal/picasso'
import React from 'react'
import {
  WEEK_STARTS_ON,
  DEFAULT_ISO_DATE_FORMAT,
  DEFAULT_ISO_DATE_PLACEHOLDER
} from '@staff-portal/date-time-utils'
import { DatePickerWrapperWithTimeZone } from '@staff-portal/ui'
import { Scalars } from '@staff-portal/graphql/staff'

import { EditorProps } from '../../types'

export interface InlineDateWithTimeZoneProps
  extends EditorProps<Scalars['Time'] | null> {
  outputDateFormat?: string
  placeholder?: string
  minDate?: Date
  maxDate?: Date
  width?: DatePickerProps['width']
  hideOnSelect?: boolean
  enableReset?: boolean
  timeZone: string | undefined
}

const InlineDateWithTimeZone = ({
  placeholder = DEFAULT_ISO_DATE_PLACEHOLDER,
  onChange,
  onBlur,
  onReset,
  width = 'full',
  onError,
  hideOnSelect = false,
  timeZone,
  ...restProps
}: InlineDateWithTimeZoneProps) => {
  return (
    <DatePickerWrapperWithTimeZone
      autoFocus
      placeholder={placeholder}
      width={width}
      timeZone={timeZone}
      onChange={date => {
        onError(false)
        onChange(date as Scalars['Time'] | null)
      }}
      onBlur={() => {
        onReset()
        onBlur()
      }}
      weekStartsOn={WEEK_STARTS_ON}
      editDateFormat={DEFAULT_ISO_DATE_FORMAT}
      displayDateFormat={DEFAULT_ISO_DATE_FORMAT}
      hideOnSelect={hideOnSelect}
      onResetClick={() => onChange(null)}
      testIds={{
        input: 'inline-date-editor',
        resetButton: 'reset-adornment'
      }}
      {...restProps}
    />
  )
}

export default InlineDateWithTimeZone
