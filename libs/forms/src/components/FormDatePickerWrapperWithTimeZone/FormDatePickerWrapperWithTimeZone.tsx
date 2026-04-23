import React from 'react'
import { FieldWrapper } from '@toptal/picasso-forms'
import {
  DatePickerWrapperWithTimeZone,
  DatePickerWrapperWithTimeZoneProps
} from '@staff-portal/ui'
import { FieldProps } from '@toptal/picasso-forms/FieldWrapper'

type Props = Omit<DatePickerWrapperWithTimeZoneProps, 'value' | 'onChange'> &
  FieldProps<DatePickerWrapperWithTimeZoneProps['value']>

const FormDatePickerWrapperWithTimeZone = (props: Props) => (
  <FieldWrapper<Props> {...props}>
    {(datePickerProps: DatePickerWrapperWithTimeZoneProps) => (
      <DatePickerWrapperWithTimeZone
        {...datePickerProps}
        value={datePickerProps.value || null}
      />
    )}
  </FieldWrapper>
)

export default FormDatePickerWrapperWithTimeZone
