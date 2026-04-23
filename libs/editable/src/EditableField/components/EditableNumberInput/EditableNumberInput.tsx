import React, { ComponentProps } from 'react'
import { Form } from '@toptal/picasso-forms'

interface Props extends ComponentProps<typeof Form.NumberInput> {}

const EditableNumberInput = (props: Props) => {
  return (
    <Form.NumberInput
      {...props}
      data-testid={props['data-testid'] || 'EditableNumberInput'}
      autoFocus
      error={!!props.error}
      size='small'
      width='full'
    />
  )
}

export default EditableNumberInput
