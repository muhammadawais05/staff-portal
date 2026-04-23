import { DatePickerProps } from '@toptal/picasso'
import React from 'react'
import {
  WEEK_STARTS_ON,
  DEFAULT_ISO_DATE_FORMAT,
  DEFAULT_ISO_DATE_PLACEHOLDER
} from '@staff-portal/date-time-utils'
import { DatePickerWrapper } from '@staff-portal/ui'
import { Scalars } from '@staff-portal/graphql/staff'

import { EditorProps } from '../../types'

export interface InlineDateProps extends EditorProps<Scalars['Date'] | null> {
  placeholder?: string
  minDate?: Date
  maxDate?: Date
  width?: DatePickerProps['width']
  hideOnSelect?: boolean
  enableReset?: boolean
}

const InlineDate = ({
  placeholder = DEFAULT_ISO_DATE_PLACEHOLDER,
  onChange,
  onBlur,
  onReset,
  width = 'full',
  onError,
  hideOnSelect = false,
  ...restProps
}: InlineDateProps) => {
  return (
    <DatePickerWrapper
      autoFocus
      placeholder={placeholder}
      width={width}
      onChange={date => {
        if (Array.isArray(date)) {
          return
        }

        onError(false)
        onChange(date)
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

export default InlineDate
