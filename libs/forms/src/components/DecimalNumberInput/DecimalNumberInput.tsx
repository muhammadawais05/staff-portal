import { Form, useField, useForm } from '@toptal/picasso-forms'
import { Props as NumberInputProps } from '@toptal/picasso-forms/NumberInput/NumberInput'
import React, { ChangeEvent } from 'react'

import { formatDecimalNumber, isDecimalNumberValid } from './utils'

export interface Props extends NumberInputProps {}

const DecimalNumberInput = (props: Props) => {
  const { name } = props

  const {
    input: { value }
  } = useField(name)

  const { change } = useForm()

  const handleChange = ({
    target: { value: newValue }
  }: ChangeEvent<{ value: string }>) => {
    if (newValue && !isDecimalNumberValid(newValue)) {
      change(name, value)
    }
  }

  const handleBlur = () => {
    const result = formatDecimalNumber(value)

    change(name, result)
  }

  return (
    <Form.Input
      {...props}
      data-testid={props['data-testid'] || 'decimal-number-input'}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}

export default DecimalNumberInput
