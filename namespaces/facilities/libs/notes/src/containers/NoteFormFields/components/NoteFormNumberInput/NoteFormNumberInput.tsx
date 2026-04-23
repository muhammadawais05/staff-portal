import { Form } from '@toptal/picasso-forms'
import React from 'react'

import { NoteFormAnswerBuilderType } from '../../../../types'

const NoteFormNumberInput = ({
  index,
  placeholder,
  required,
  disabled
}: NoteFormAnswerBuilderType) => {
  return (
    <Form.NumberInput
      width='full'
      required={required}
      placeholder={placeholder}
      name={`answers[${index}].value`}
      disabled={disabled}
    />
  )
}

export default NoteFormNumberInput
