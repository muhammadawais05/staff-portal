import { Form } from '@toptal/picasso-forms'
import React from 'react'

import { NoteFormAnswerBuilderType } from '../../../../types'

export interface Props extends NoteFormAnswerBuilderType {
  rows?: number
}

const NoteFormTextBox = ({
  index,
  placeholder,
  required,
  rows,
  disabled
}: Props) => {
  return (
    <Form.Input
      multiline
      rowsMin={rows}
      width='full'
      required={required}
      placeholder={placeholder}
      name={`answers[${index}].value`}
      disabled={disabled}
    />
  )
}

export default NoteFormTextBox
