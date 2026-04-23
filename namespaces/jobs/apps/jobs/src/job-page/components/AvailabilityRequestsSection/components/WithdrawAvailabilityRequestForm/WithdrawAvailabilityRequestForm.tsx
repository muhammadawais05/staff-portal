import React, { ChangeEvent } from 'react'
import { Typography, Container } from '@toptal/picasso'
import { Form, useForm } from '@toptal/picasso-forms'
import { isMaxLength } from '@staff-portal/validators'

import { WithdrawFeedbackReasonFragment } from '../WithdrawAvailabilityRequestModal/data/get-withdraw-availability-request-reasons'
import { getOptions, getDefaultComment } from './utils'

export type WithdrawAvailabilityRequestFormProps = {
  reasonId: string
  comment: string
}

type Props = {
  reasons?: WithdrawFeedbackReasonFragment[]
}

const WithdrawAvailabilityRequestForm = ({ reasons }: Props) => {
  const { change } = useForm()
  const options = getOptions(reasons)

  const handleReasonChange = (
    event: ChangeEvent<{ name?: string | undefined; value: string | number }>
  ) => {
    if (reasons) {
      change(
        'comment',
        getDefaultComment(reasons, event.target.value as string)
      )
    }
  }

  return (
    <>
      <Container bottom='medium'>
        <Typography size='medium'>
          Please state while talent's availability is no longer required.
        </Typography>
      </Container>
      <Form.Select
        label='Reason'
        name='reasonId'
        width='full'
        required
        options={options}
        onChange={handleReasonChange}
        data-testid='reason-field'
      />
      <Form.Input
        required
        multiline
        rows={4}
        width='full'
        name='comment'
        label='Details'
        validate={isMaxLength}
        data-testid='comment-field'
      />
    </>
  )
}

export default WithdrawAvailabilityRequestForm
