import { Button } from '@toptal/picasso'
import React from 'react'
import { JobStatus } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { SendEngagementClientEmailItem } from '@staff-portal/engagements'
import { ClaimAndApproveJobButton, RestorePostponedModal } from '@staff-portal/jobs'
import { useModal } from '@staff-portal/modals-service'

import { TaskJob } from '../../types'

export interface Props {
  job: TaskJob
}

const JobTaskCardMainAction = ({
  job: { id, currentEngagement, operations, status, sendCandidateUrl }
}: Props) => {
  const isSendCandidateButtonVisible = Boolean(
    sendCandidateUrl && status === JobStatus.PENDING_ENGINEER
  )
  const isContactClientButtonVisible = Boolean(currentEngagement?.nodes.length)

  const { showModal: showRestorePostponeModal } = useModal(
    RestorePostponedModal,
    {
      jobId: id
    }
  )

  return (
    <>
      {isSendCandidateButtonVisible && (
        <Button size='small' href={sendCandidateUrl as string} target='_blank'>
          Send Candidate
        </Button>
      )}

      {isContactClientButtonVisible && currentEngagement?.nodes?.[0]?.id && (
        <SendEngagementClientEmailItem
          componentType='button'
          size='small'
          emailMessagingEngagementClientId={
            currentEngagement.nodes?.[0].clientEmailMessaging?.id ?? ''
          }
          operation={
            currentEngagement.nodes?.[0].clientEmailMessaging?.operations
              .sendEmailTo
          }
        />
      )}

      <Operation
        operation={operations.resumePostponedJob}
        render={disabled => (
          <Button
            size='small'
            disabled={disabled}
            onClick={showRestorePostponeModal}
            data-testid='restore-postponed-button'
          >
            Restore Postponed
          </Button>
        )}
      />

      <Operation
        operation={operations.approveJob}
        render={disabled => (
          <ClaimAndApproveJobButton jobId={id} disabled={disabled} />
        )}
      />
    </>
  )
}

export default JobTaskCardMainAction
