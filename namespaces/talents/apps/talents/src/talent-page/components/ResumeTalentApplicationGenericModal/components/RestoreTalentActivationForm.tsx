import React from 'react'
import { Form } from '@toptal/picasso-forms'

import {
  RestoreTalentActivationFormData,
  RestoreTalentActivationFormProps
} from '../types'

const RestoreTalentActivationForm = ({
  children,
  initialSpecializationId,
  onSubmit
}: RestoreTalentActivationFormProps) => {
  return (
    <Form<RestoreTalentActivationFormData>
      initialValues={{ specializationId: initialSpecializationId }}
      onSubmit={onSubmit}
    >
      {children}
    </Form>
  )
}

export default RestoreTalentActivationForm
