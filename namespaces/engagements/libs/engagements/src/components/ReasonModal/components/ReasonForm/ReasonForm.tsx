import React, { ReactNode } from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { Form, useForm } from '@toptal/picasso-forms'
import { isMaxLength } from '@staff-portal/validators'
import { FormReasonSelect } from '@staff-portal/feedbacks'

import { EngagementReasonActions } from '../../utils'

type Props = {
  onClose: () => void
  submitLabel: string
  description?: ReactNode
  reasonAction: EngagementReasonActions
  loading?: boolean
}

const componentName = 'ReasonForm'

const ReasonForm = ({
  onClose,
  reasonAction,
  description,
  loading,
  submitLabel
}: Props) => {
  const { change } = useForm()

  return (
    <>
      <Modal.Content data-testid={componentName}>
        {description && (
          <Container bottom='medium'>
            <Typography
              as='div'
              data-testid={`${componentName}-description`}
              size='medium'
            >
              {description}
            </Typography>
          </Container>
        )}

        <FormReasonSelect
          required
          width='full'
          name='reasonId'
          label='Reason'
          data-testid={`${componentName}-reasonId`}
          action={reasonAction}
          onChange={identifier => change('identifier', identifier)}
        />

        <Form.Input
          required
          multiline
          rows={4}
          width='full'
          name='comment'
          label='Details'
          data-testid={`${componentName}-details`}
          validate={isMaxLength}
        />
      </Modal.Content>

      <Modal.Actions>
        <Button
          variant='secondary'
          data-testid={`${componentName}-cancel-button`}
          disabled={loading}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Form.SubmitButton
          variant='negative'
          data-testid={`${componentName}-submit-button`}
        >
          {submitLabel}
        </Form.SubmitButton>
      </Modal.Actions>
    </>
  )
}

export default ReasonForm
