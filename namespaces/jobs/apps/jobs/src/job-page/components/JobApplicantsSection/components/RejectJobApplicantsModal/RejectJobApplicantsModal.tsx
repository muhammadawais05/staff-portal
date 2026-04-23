import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { JobApplicationRejectReason } from '@staff-portal/graphql/staff'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { isMaxLength } from '@staff-portal/forms'
import {
  JOB_UPDATED,
  JobApplicationRejectReasonField
} from '@staff-portal/jobs'

import { RejectJobApplicantsDocument } from './data/reject-job-applicants'

interface RejectJobApplicantsForm {
  reason: JobApplicationRejectReason
  comment: string
}

export interface Props {
  jobId: string
  jobApplications: { id: string; talent: { fullName: string } }[]
  hideModal: () => void
}

const RejectJobApplicantsModal = ({
  jobId,
  jobApplications,
  hideModal
}: Props) => {
  const emitMessage = useMessageEmitter()
  const { showError, showSuccess } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [rejectApplicants, { loading }] = useMutation(
    RejectJobApplicantsDocument,
    {
      onError: () => {
        showError('An error occurred, job applications were not rejected.')
      }
    }
  )

  const handleSubmit = async (params: RejectJobApplicantsForm) => {
    const { data } = await rejectApplicants({
      variables: {
        ...params,
        ids: jobApplications.map(({ id }) => id)
      }
    })

    return handleMutationResult({
      mutationResult: data?.rejectJobApplicants,
      onSuccessAction: () => {
        hideModal()

        if (data?.rejectJobApplicants?.successCount) {
          const successfulRejectionsMessage =
            data?.rejectJobApplicants?.successCount === 1
              ? `${data?.rejectJobApplicants?.successCount} job application was successfully updated.`
              : `${data?.rejectJobApplicants?.successCount} job applications were successfully updated.`

          showSuccess(successfulRejectionsMessage)
        }

        if (
          data?.rejectJobApplicants?.failureMessage ||
          data?.rejectJobApplicants?.failureCount
        ) {
          showError(
            [...(data?.rejectJobApplicants?.failureMessage || [])].map(
              message => <Container key={message}>{message}</Container>
            )
          )
        }

        emitMessage(JOB_UPDATED, { jobId })
      }
    })
  }

  const title = 'Reject Job Applications'

  return (
    <Modal withForm open size='small' onClose={hideModal}>
      <Modal.Title>{title}</Modal.Title>

      <Form<RejectJobApplicantsForm> onSubmit={handleSubmit}>
        <Modal.Content>
          <Container bottom='medium'>
            <Typography size='medium'>
              You are about to reject job applications from the following
              candidates:{' '}
              {jobApplications.map(({ talent: { fullName } }, index) => (
                <Typography as='span' key={fullName} weight='semibold'>
                  {fullName}
                  {index < jobApplications.length - 1 && ', '}
                </Typography>
              ))}
              .
            </Typography>
          </Container>
          <JobApplicationRejectReasonField />
          <Form.Input
            required
            multiline
            rows={4}
            width='full'
            name='comment'
            label='Comment'
            validate={isMaxLength}
          />
        </Modal.Content>

        <Modal.Actions>
          <Button variant='secondary' disabled={loading} onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton variant='negative'>{title}</Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default RejectJobApplicantsModal
