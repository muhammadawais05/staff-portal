import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React, { useRef } from 'react'
import { FormDatePickerWrapper, FormCancelButton } from '@staff-portal/forms'
import { isMaxLength } from '@staff-portal/validators'
import { Scalars } from '@staff-portal/graphql/staff'

import { useChangeEngagementEndDate } from './hooks'
import { FormValues } from './types'

type Props = {
  engagementId: string
  endDate?: Scalars['Date'] | null
  hideModal: () => void
}

const ChangeEngagementEndDateForm = ({
  engagementId,
  endDate,
  hideModal
}: Props) => {
  const changeEngagementEndDate = useChangeEngagementEndDate({
    engagementId,
    hideModal
  })

  const initialValues = useRef({
    endDate: endDate ?? null
  })

  return (
    <ModalForm<FormValues>
      title='Change End Date'
      onSubmit={changeEngagementEndDate}
      initialValues={initialValues.current}
      data-testid='ChangeEngagementEndDateForm'
    >
      <Modal.Content>
        <Container bottom='medium'>
          <Typography size='medium'>
            Changing the end date will automatically remove and then re-generate
            billing cycles if needed.
          </Typography>
        </Container>
        <FormDatePickerWrapper
          name='endDate'
          data-testid='ChangeEngagementEndDateForm-datepicker'
          label='End date'
          width='full'
          autoFocus
          required
        />
        <Form.Input
          name='comment'
          label='Reason'
          width='full'
          multiline
          rows={4}
          required
          validate={isMaxLength}
          data-testid='ChangeEngagementEndDateForm-reason'
        />
      </Modal.Content>
      <Modal.Actions>
        <FormCancelButton onClick={hideModal} />

        <Form.SubmitButton
          variant='positive'
          data-testid='ChangeEngagementEndDateForm-submit-button'
        >
          Change End Date
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default ChangeEngagementEndDateForm
