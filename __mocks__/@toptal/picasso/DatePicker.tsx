import React from 'react'
import { DatePickerProps } from '@toptal/picasso'

const DatePicker = ({ testIds }: DatePickerProps) => (
  <div data-testid={testIds?.input} />
)

export default DatePicker
