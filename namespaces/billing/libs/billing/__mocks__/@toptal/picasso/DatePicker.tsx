import { omit } from 'lodash-es'
import React from 'react'
import { DatePickerProps } from '@toptal/picasso'

const DatePicker = (props: DatePickerProps) => (
  <div data-testid={props.testIds?.input || 'DatePicker'}>
    {JSON.stringify(omit(props, ['children']))}
  </div>
)

export default DatePicker
