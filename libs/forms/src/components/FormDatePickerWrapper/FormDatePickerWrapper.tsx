import React from 'react'
import { FieldWrapper } from '@toptal/picasso-forms'
import { DatePickerWrapper, DatePickerWrapperProps } from '@staff-portal/ui'
import { FieldProps } from '@toptal/picasso-forms/FieldWrapper'

type Props = Omit<DatePickerWrapperProps, 'value' | 'onChange'> &
  FieldProps<DatePickerWrapperProps['value']>

const FormDatePickerWrapper = (props: Props) => (
  <FieldWrapper<Props> {...props}>
    {(datePickerProps: DatePickerWrapperProps) => (
      <DatePickerWrapper
        {...datePickerProps}
        value={datePickerProps.value || null}
      />
    )}
  </FieldWrapper>
)

export default FormDatePickerWrapper
