import { Form, arrayMutators } from '@toptal/picasso-forms'
import React, { ReactNode } from 'react'

import useHandleSubmit from './utils/use-handle-submit/use-handle-submit'

export type FormValues = Record<
  string,
  {
    feedback?: string
    internalFeedback?: Record<string, boolean>
  }
> & { rejectedApplications: string[] }

type Props = {
  children: ReactNode
  rejectedApplicationIds: string[]
}

const CandidateSendingFeedbackStepForm = ({
  children,
  rejectedApplicationIds
}: Props) => {
  const { handleSubmit } = useHandleSubmit()
  const initialValues = {
    rejectedApplications: rejectedApplicationIds
  } as unknown as FormValues

  return (
    <Form<FormValues>
      onSubmit={handleSubmit}
      initialValues={initialValues}
      mutators={{ ...arrayMutators }}
    >
      {children}
    </Form>
  )
}

export default CandidateSendingFeedbackStepForm
