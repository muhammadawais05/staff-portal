import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React, { useRef } from 'react'
import {
  FormCancelButton,
  FormDatePickerWrapper,
  FormTimeZoneSelect
} from '@staff-portal/forms'
import { isMaxLength } from '@staff-portal/validators'

import { useChangeEngagementStartDate } from './hooks'
import { FormValues } from './types'

export interface Props {
  engagementId: string
  timeZoneName?: string
  hideModal: () => void
}

const ChangeEngagementStartDateForm = ({
  engagementId,
  timeZoneName,
  hideModal
}: Props) => {
  const changeEngagementStartDate = useChangeEngagementStartDate({
    engagementId,
    hideModal
  })
  const initialValues = useRef({ timeZoneName })

  return (
    <ModalForm<FormValues>
      title='Change Start Date'
      onSubmit={changeEngagementStartDate}
      initialValues={initialValues.current}
    >
      <Modal.Content>
        <Container bottom='medium'>
          <Typography size='medium'>
            Changing the start date will automatically remove and then
            re-generate billing cycles if needed.
          </Typography>
        </Container>
        <FormDatePickerWrapper
          name='startDate'
          data-testid='ChangeEngagementStartDateForm-start-date'
          label='Start date'
          width='full'
          autoFocus
          required
        />
        <FormTimeZoneSelect
          label='Time Zone'
          required
          name='timeZoneName'
          data-testid='ChangeEngagementStartDateForm-time-zone'
        />
        <Form.Input
          name='comment'
          label='Reason'
          width='full'
          multiline
          rows={4}
          required
          validate={isMaxLength}
          data-testid='ChangeEngagementStartDateForm-reason'
        />
      </Modal.Content>
      <Modal.Actions>
        <FormCancelButton onClick={hideModal} />

        <Form.SubmitButton
          variant='positive'
          data-testid='ChangeEngagementStartDateForm-submit-button'
        >
          Change Start Date
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default ChangeEngagementStartDateForm
