import React, { useMemo } from 'react'
import { Modal, ModalForm, ModalSuspender } from '@staff-portal/modals-service'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { FeedbackReasonActions } from '@staff-portal/graphql/staff'
import { useQuery } from '@staff-portal/data-layer-service'
import { FormReasonSelect } from '@staff-portal/feedbacks'
import { NodeType } from '@staff-portal/graphql'

import { GetSendJobAwayDocument } from './data/get-send-job-away.staff.gql.types'
import useSendJobAwayMutation, {
  SendJobAwayFormValues
} from './hooks/use-send-job-away-mutation'
import { getFirstMeetingId, getMatchingCallsOptions } from './utils'

const TITLE = 'Send Away Job'

type Props = {
  jobId: string
  hideModal: () => void
}

const SendJobAwayModal = ({ jobId, hideModal }: Props) => {
  const { data: job, loading } = useQuery(GetSendJobAwayDocument, {
    variables: { jobId }
  })

  const { handleSubmit } = useSendJobAwayMutation({
    jobId,
    onCompleted: hideModal
  })

  const meetingId = getFirstMeetingId(job?.node?.possiblyRelatedMeetings)

  const matchingCalls = useMemo(
    () => getMatchingCallsOptions(job?.node?.possiblyRelatedMeetings),
    [job?.node?.possiblyRelatedMeetings]
  )

  const initialValues = useMemo<Partial<SendJobAwayFormValues>>(
    () => ({
      meetingId: meetingId || matchingCalls?.[0].value
    }),
    [meetingId, matchingCalls]
  )

  return (
    <Modal
      open
      onClose={hideModal}
      size='small'
      operationVariables={{
        nodeId: jobId,
        nodeType: NodeType.JOB,
        operationName: 'sendJobAway'
      }}
    >
      {loading ? (
        <ModalSuspender />
      ) : (
        <ModalForm<SendJobAwayFormValues>
          title={TITLE}
          onSubmit={handleSubmit}
          initialValues={initialValues}
        >
          <Modal.Content>
            <Container bottom='medium'>
              <Typography size='medium'>
                Are you sure that you want to send away this job? Job will get
                status "Sending Away", developers will not be able to see it,
                and you will be able to only delete this job.
              </Typography>
            </Container>

            <FormReasonSelect
              required
              label='Reason'
              name='reasonId'
              width='full'
              data-testid='SendJobAwayModal-reason'
              grouped
              showReasonDescription
              action={FeedbackReasonActions.JOB_CANCELLED}
            />

            <Form.Input
              required
              multiline
              rows={4}
              width='full'
              name='comment'
              label='Details'
              data-testid='SendJobAwayModal-comment'
            />

            {matchingCalls && (
              <Form.Select
                required
                multiline
                name='meetingId'
                options={matchingCalls}
                width='full'
                label='Matching call'
                native
                data-testid='SendJobAwayModal-matching-call'
              />
            )}

            {meetingId && (
              <Form.Input
                name='meetingId'
                type='hidden'
                data-testid='SendJobAwayModal-first-meeting'
              />
            )}
          </Modal.Content>

          <Modal.Actions>
            <Button variant='secondary' onClick={hideModal}>
              Cancel
            </Button>
            <Form.SubmitButton
              variant='negative'
              data-testid='SendJobAwayModal-submit-button'
            >
              Send Away Job
            </Form.SubmitButton>
          </Modal.Actions>
        </ModalForm>
      )}
    </Modal>
  )
}

export default SendJobAwayModal
