import React from 'react'
import { Form } from '@toptal/picasso-forms'

import {
  ResumeTalentApplicationFormData,
  ResumeTalentApplicationFormProps
} from '../types'

const ResumeTalentApplicationForm = ({
  children,
  initialSpecializationId,
  onSubmit
}: ResumeTalentApplicationFormProps) => {
  return (
    <Form<ResumeTalentApplicationFormData>
      initialValues={{
        specializationId: initialSpecializationId,
        automatedActionAllowed: true
      }}
      onSubmit={onSubmit}
    >
      {children}
    </Form>
  )
}

export default ResumeTalentApplicationForm
