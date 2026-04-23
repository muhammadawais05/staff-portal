import React from 'react'
import { Form, useFormState } from '@toptal/picasso-forms'
import { UpdateJobPresalesEngagementInput } from '@staff-portal/graphql/staff'

export interface PresalesEngagementFormProps
  extends Omit<
    UpdateJobPresalesEngagementInput,
    'jobId' | 'presalesEngagement'
  > {
  presalesEngagement: 'true' | 'false'
}

const PresalesEngagementForm = ({
  presalesEngagement,
  presalesEngagementComment
}: PresalesEngagementFormProps) => {
  const {
    values: { presalesEngagement: presalesEngagementValue }
  } = useFormState()

  return (
    <>
      <Form.RadioGroup
        name='presalesEngagement'
        label='Pre-sales Engagement'
        initialValue={presalesEngagement}
        required
        horizontal
      >
        <Form.Radio label='Yes' value='true' />
        <Form.Radio label='No' value='false' />
      </Form.RadioGroup>

      {presalesEngagementValue === 'true' && (
        <Form.Input
          name='presalesEngagementComment'
          initialValue={presalesEngagementComment}
          label='Comment'
          width='full'
          rows={4}
          required
          multiline
        />
      )}
    </>
  )
}

export default PresalesEngagementForm
