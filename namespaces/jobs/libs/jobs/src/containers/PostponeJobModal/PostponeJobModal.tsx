import React, { useMemo } from 'react'
import { Modal, ModalForm, ModalSuspender } from '@staff-portal/modals-service'
import { Button, Container, Typography } from '@toptal/picasso'
import Form from '@toptal/picasso-forms/Form'
import { JobStatus, Scalars } from '@staff-portal/graphql/staff'
import { Maybe } from '@toptal/picasso/utils'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { isMaxLength } from '@staff-portal/validators'
import { NodeType } from '@staff-portal/graphql'
import { NOT_SELECTED_PLACEHOLDER } from '@staff-portal/config'

import { FormMatchingCallSelect } from '../../components'
import { usePostponeJob } from './hooks/use-postpone-job'
import { useGetReasons } from './hooks/use-get-reasons'
import { useGetMeetings } from './hooks/use-get-meetings'

interface Props {
  hideModal: () => void
  jobId: string
  jobStatus: Maybe<JobStatus>
}

interface FormData {
  dueDate: Scalars['Date']
  comment: string
  reasonId: string
  meetingId: string
}

const PostponeJobModal = ({ hideModal, jobId, jobStatus }: Props) => {
  const { loading: submitLoading, submitPostponeJob } = usePostponeJob({
    jobId,
    jobStatus,
    hideModal
  })
  const { reasonsSelectOptions, loading: getReasonsLoading } = useGetReasons()
  const { data: meetgingsData, loading: getMeetingsLoading } =
    useGetMeetings(jobId)

  const handleSubmit = ({
    comment,
    reasonId,
    meetingId,
    dueDate
  }: FormData) => {
    return submitPostponeJob({
      jobId,
      comment,
      dueDate,
      meetingId,
      reasonId
    })
  }
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const minDate = useMemo(() => new Date(), [])

  const title =
    jobStatus === JobStatus.POSTPONED ? 'Repostpone Job' : 'Postpone Job'

  const isPending = getReasonsLoading || getMeetingsLoading

  return (
    <Modal
      withForm
      open
      size='small'
      onClose={hideModal}
      data-testid='PostponeJobModal'
      operationVariables={{
        nodeId: jobId,
        nodeType: NodeType.JOB,
        operationName:
          jobStatus === JobStatus.POSTPONED ? 'repostponeJob' : 'postponeJob'
      }}
    >
      {isPending ? (
        <ModalSuspender />
      ) : (
        <ModalForm<FormData> title={title} onSubmit={handleSubmit}>
          <Modal.Content>
            <Container bottom='medium'>
              <Typography>
                {jobStatus === JobStatus.POSTPONED
                  ? 'Job is already postponed. Are you sure that you want to postpone it further?'
                  : 'Are you sure you want to postpone this job? The job will be hidden from talent. You can restore the job later and continue looking for talent.'}
              </Typography>
            </Container>
            <FormDatePickerWrapper
              name='dueDate'
              required
              width='full'
              minDate={minDate}
              label='Due date'
              data-testid='PostponeJobModal-due-date-field'
            />
            {jobStatus !== JobStatus.POSTPONED && (
              <Form.Select
                name='reasonId'
                placeholder={NOT_SELECTED_PLACEHOLDER}
                required
                width='full'
                label='Reason'
                options={reasonsSelectOptions}
                data-testid='PostponeJobModal-reason-field'
              />
            )}
            <FormMatchingCallSelect
              name='meetingId'
              label='Matching call'
              meetings={meetgingsData?.possiblyRelatedMeetings?.nodes}
            />
            <Form.Input
              label='Details'
              name='comment'
              required
              multiline
              rows={4}
              width='full'
              rowsMax={25}
              validate={isMaxLength}
              data-testid='PostponeJobModal-notes'
            />
          </Modal.Content>
          <Modal.Actions>
            <Button variant='secondary' onClick={hideModal}>
              Cancel
            </Button>
            <Form.SubmitButton
              variant='positive'
              data-testid='PostponeJobModal-submit-button'
              disabled={submitLoading}
            >
              Postpone Job
            </Form.SubmitButton>
          </Modal.Actions>
        </ModalForm>
      )}
    </Modal>
  )
}

export default PostponeJobModal
