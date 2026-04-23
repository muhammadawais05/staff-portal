import React from 'react'
import { Form, useField } from '@toptal/picasso-forms'

const FEEDBACK_REASONS = [
  {
    value: 'Behavior',
    text: 'The page is not working as expected'
  },
  { value: 'Performance', text: 'The page is loading too slowly' },
  { value: 'Other', text: 'Other' }
]

const BetaSwitcherFeedbackFormContent = () => {
  const {
    input: { value: reason }
  } = useField('reason')

  return (
    <>
      <Form.Select
        label='Reason'
        placeholder='Please select a reason'
        name='reason'
        options={FEEDBACK_REASONS}
        required
      />
      <Form.Input
        label='Comment'
        name='comment'
        width='full'
        multiline
        rows={4}
        required={reason !== 'Performance'}
      />
    </>
  )
}

export default BetaSwitcherFeedbackFormContent
