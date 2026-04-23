import { useFormState, Form } from '@toptal/picasso-forms'
import React from 'react'
import { Container } from '@toptal/picasso'

import { FormValues } from '../../../CandidateSendingFeedbackStepForm/CandidateSendingFeedbackStepForm'
import getIsFormDirty from '../../../CandidateSendingFeedbackStepForm/utils/get-is-form-dirty/get-is-form-dirty'

type Props = {
  'data-testid'?: string
}

const FormActions = ({ 'data-testid': dataTestId }: Props) => {
  const { values } = useFormState<FormValues>()
  const isDirty = getIsFormDirty(values)

  return (
    <Container top='medium' justifyContent='flex-end' flex>
      <Form.SubmitButton variant='positive' data-testid={dataTestId}>
        {isDirty ? 'Send Feedback' : 'Skip Feedback'}
      </Form.SubmitButton>
    </Container>
  )
}

export default FormActions
