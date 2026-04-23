import React, { useRef } from 'react'
import { Button, Container, Helpbox, Typography } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import {
  FormDatePickerWrapper,
  FormBaseErrorContainer
} from '@staff-portal/forms'

import { prepareInitialValues } from './utils'
import { ApproveCommitmentChangeRequestFormValues } from './types'
import { ApproveCommitmentChangeRequestDataFragment } from '../ApproveCommitmentChangeRequestModal/data'
import CommitmentField from '../CommitmentField'
import CompanyRateField from '../CompanyRateField'
import { useApproveCommitmentChangeRequestSubmit } from './hooks'
import TalentRateField from '../TalentRateField'

export const MODAL_TITLE = 'Approve Commitment Change Request'

type Props = {
  hideModal: () => void
  jobId: string
  jobTitle: string
  commitmentChangeRequest: ApproveCommitmentChangeRequestDataFragment
}

const ApproveCommitmentChangeRequestForm = ({
  hideModal,
  jobId,
  jobTitle,
  commitmentChangeRequest
}: Props) => {
  const { newAvailability, newExtraHoursEnabled, originalCommitment } =
    commitmentChangeRequest

  const { handleSubmit } = useApproveCommitmentChangeRequestSubmit({
    jobId,
    commitmentChangeRequest,
    hideModal
  })
  const initialValues = useRef(
    prepareInitialValues({ commitmentChangeRequest })
  )

  return (
    <Form<ApproveCommitmentChangeRequestFormValues>
      initialValues={initialValues.current}
      onSubmit={handleSubmit}
    >
      <Modal.Title>
        {MODAL_TITLE}
        <FormBaseErrorContainer top='small' bottom={0} />
      </Modal.Title>

      <Modal.Content>
        <Container bottom='medium'>
          <Typography size='medium' weight='semibold'>
            {jobTitle}
          </Typography>
        </Container>

        <Container bottom='medium'>
          <Typography size='medium'>
            Are you sure you want to approve this commitment change request?
          </Typography>
        </Container>

        <Container bottom='medium'>
          {originalCommitment && (
            <Typography
              data-testid='ApproveCommitmentChangeRequestForm-original-commitment'
              as='div'
              size='medium'
              weight='semibold'
            >
              Original commitment:{' '}
              <CommitmentField commitment={originalCommitment} />
            </Typography>
          )}

          {newAvailability && (
            <Typography
              data-testid='ApproveCommitmentChangeRequestForm-desired-commitment'
              as='div'
              size='medium'
              weight='semibold'
            >
              Desired commitment:{' '}
              <CommitmentField
                commitment={newAvailability}
                newExtraHoursEnabled={newExtraHoursEnabled}
              />
            </Typography>
          )}
        </Container>

        <FormDatePickerWrapper
          autoFocus
          required
          width='full'
          name='changeDate'
          label='Change Date'
          // TODO: restore it back as part of https://toptal-core.atlassian.net/browse/SPT-2335
          // useServerTimezone
          data-testid='ApproveCommitmentChangeRequestForm-change-date'
        />

        <TalentRateField
          data-testid='ApproveCommitmentChangeRequestForm-talent-rate'
          commitment={newAvailability}
        />

        <CompanyRateField
          data-testid='ApproveCommitmentChangeRequestForm-company-rate'
          commitment={newAvailability}
        />

        <Form.Checkbox
          name='notifyTalent'
          label='Send notifications to talent about commitment type change'
          data-testid='ApproveCommitmentChangeRequestForm-notify-talent'
        />

        <Form.Checkbox
          name='notifyCompany'
          label='Send notifications to client about commitment type change'
          data-testid='ApproveCommitmentChangeRequestForm-notify-company'
        />

        {newExtraHoursEnabled && (
          <Container
            top='small'
            data-testid='ApproveCommitmentChangeRequestForm-extra-hours'
          >
            <Helpbox variant='yellow'>
              <Helpbox.Content>
                Making changes to extra hours settings will send out
                notifications to both client and talent. Any extra hours changes
                will be applied to the current billing cycle.
              </Helpbox.Content>
            </Helpbox>
          </Container>
        )}
      </Modal.Content>

      <Modal.Actions>
        <Button
          data-testid='ApproveCommitmentChangeRequestForm-cancel-button'
          variant='secondary'
          onClick={hideModal}
        >
          Cancel
        </Button>

        <Form.SubmitButton
          data-testid='ApproveCommitmentChangeRequestForm-submit-button'
          variant='positive'
        >
          Accept Request
        </Form.SubmitButton>
      </Modal.Actions>
    </Form>
  )
}

export default ApproveCommitmentChangeRequestForm
