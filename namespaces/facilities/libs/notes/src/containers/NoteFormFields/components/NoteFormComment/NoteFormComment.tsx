import { Form } from '@toptal/picasso-forms'
import React from 'react'

interface Props {
  placeholder?: string
  required?: boolean
}

const NoteFormComment = ({
  placeholder = 'Notes, details or red flags',
  required = true
}: Props) => (
  <Form.Input
    required={required}
    multiline
    rowsMin={15}
    width='full'
    name='comment'
    label='Comment'
    placeholder={placeholder}
    data-testid='note-form-comment'
  />
)

export default NoteFormComment
