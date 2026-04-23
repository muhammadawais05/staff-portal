import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form, FormSpy } from '@toptal/picasso-forms'
import { Maybe, useNotifications } from '@toptal/picasso/utils'
import React from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import {
  CumulativeJobStatus,
  FeedbackReasonActions,
  JobClientHiredElsewhere,
  JobClientHiredInternallyOrExternally,
  JobStatus,
  RemoveJobInput
} from '@staff-portal/graphql/staff'
import { isOperationEnabled } from '@staff-portal/operations'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { isMaxLength } from '@staff-portal/validators'
import { FormReasonSelect } from '@staff-portal/feedbacks'

import { JOB_UPDATED } from '../../../../messages'
import { FormMatchingCallSelect } from '../../../../components'
import { useGetDeleteJobDetails, useRemoveJob } from '../../data'
import { getDeleteJobIntroduction } from '../../utils/get-delete-job-introduction'
import {
  hiredElsewhereOptions,
  internallyOrExternallyOptions
} from '../../utils/constants'

interface DeleteJobForm extends RemoveJobInput {}

export interface Props {
  jobId: string
  status: Maybe<JobStatus>
  hideModal: () => void
  onSuccess?: () => void
}

const DeleteJobModalForm = ({ jobId, status, hideModal, onSuccess }: Props) => {
  const emitMessage = useMessageEmitter()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  // The deposit refund allowed field is not optimized (N+1).
  // Use when necessary. Try to avoid call within connection
  const { job, loading: getDeleteJobDetailsLoading } =
    useGetDeleteJobDetails(jobId)

  const sendingAway = Boolean(
    job?.cumulativeStatus === CumulativeJobStatus.SENDING_AWAY
  )
  const hasDeposit = Boolean(
    job?.client.depositInvoices?.nodes.some(
      ({ job: depositJob }) => depositJob?.id === jobId
    )
  )
  const depositFundAllowed =
    job && isOperationEnabled(job.operations?.refundJobDeposit)

  const [removeJob, { loading }] = useRemoveJob({
    onError: () => showError('An error occurred, the Job was not removed.')
  })

  const handleSubmit = async (formValues: DeleteJobForm) => {
    const { data } = await removeJob({
      variables: {
        ...formValues,
        jobId
      }
    })

    return handleMutationResult({
      mutationResult: data?.removeJob,
      successNotificationMessage: 'The Job was successfully removed.',
      onSuccessAction: () => {
        hideModal()
        emitMessage(JOB_UPDATED, { jobId })
        onSuccess?.()
      }
    })
  }

  if (getDeleteJobDetailsLoading) {
    return <ModalSuspender />
  }

  return (
    <Form<DeleteJobForm> onSubmit={handleSubmit}>
      <Modal.Content>
        <Container bottom='medium'>
          {getDeleteJobIntroduction(status, hasDeposit)}
        </Container>

        {!sendingAway && (
          <>
            <FormReasonSelect
              required
              width='full'
              name='reasonId'
              label='Reason'
              action={FeedbackReasonActions.JOB_CANCELLED}
              grouped
              showReasonDescription
              data-testid='delete-job-modal-reason-field'
            />

            <Form.Input
              required
              multiline
              rows={4}
              width='full'
              name='comment'
              label='Details'
              validate={isMaxLength}
              data-testid='delete-job-modal-comment-field'
            />
          </>
        )}

        <Form.Select
          required
          options={hiredElsewhereOptions}
          label={
            <Typography as='span'>
              Did the client hire for this role elsewhere?
            </Typography>
          }
          data-testid='delete-job-modal-client-hire-field'
          name='clientHiredElsewhere'
        />

        <FormSpy subscription={{ values: true }}>
          {({ values }) =>
            values.clientHiredElsewhere === JobClientHiredElsewhere.YES ? (
              <Form.Select
                required
                options={internallyOrExternallyOptions}
                label={
                  <Typography as='span'>
                    Did they make an internal or an external hire?
                  </Typography>
                }
                data-testid='delete-job-modal-hire-type-field'
                name='clientHiredInternallyOrExternally'
              />
            ) : null
          }
        </FormSpy>

        <FormSpy subscription={{ values: true }}>
          {({ values }) =>
            values.clientHiredInternallyOrExternally ===
            JobClientHiredInternallyOrExternally.EXTERNAL ? (
              <Form.Input
                required
                multiline
                rows={4}
                width='full'
                name='whereClientHired'
                label={
                  <Typography as='span'>Where did they hire from?</Typography>
                }
                validate={isMaxLength}
              />
            ) : null
          }
        </FormSpy>

        <Form.Checkbox
          initialValue
          name='notifyClient'
          label={
            <Container>
              <Typography>Send notification emails to the client</Typography>
              <Typography size='xsmall' color='dark-grey'>
                If selected, the client will receive an automatic email about
                the job and any active interviews being canceled.
              </Typography>
            </Container>
          }
        />

        {hasDeposit && depositFundAllowed && (
          <Form.Checkbox
            name='refundDeposit'
            label={
              <Container>
                <Typography>
                  Initiate deposit refund (creates a task for the accountant)
                </Typography>
                <Typography size='xsmall' color='dark-grey'>
                  If you don't initiate a refund, the deposit will be used for
                  other client's invoices.
                </Typography>
              </Container>
            }
          />
        )}

        <FormMatchingCallSelect
          name='meetingId'
          label='Matching call'
          meetings={job?.possiblyRelatedMeetings?.nodes}
        />
      </Modal.Content>

      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>
        <Form.SubmitButton variant='negative'>Delete Job</Form.SubmitButton>
      </Modal.Actions>
    </Form>
  )
}

export default DeleteJobModalForm
