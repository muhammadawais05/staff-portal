import React from 'react'
import { Form } from '@toptal/picasso-forms'

export interface Props {
  readOnly?: boolean
  label?: string
}

const SubjectField = ({ label, readOnly }: Props) => {
  return (
    <Form.Input
      name='title'
      readOnly={readOnly}
      disabled={readOnly}
      placeholder={label}
      width='full'
      label={label ?? 'Subject'}
      required
      data-testid='SubjectField'
    />
  )
}

export default SubjectField
