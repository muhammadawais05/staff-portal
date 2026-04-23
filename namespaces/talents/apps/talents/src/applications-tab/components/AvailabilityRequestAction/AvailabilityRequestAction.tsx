import React from 'react'
import { Button, Tag } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { AvailabilityRequestCandidateStatus as CandidateStatus } from '@staff-portal/graphql/staff'

import { AvailabilityRequestsFragment } from '../../data/availability-requests-fragment'

export type Props = Pick<
  AvailabilityRequestsFragment,
  'candidateStatus' | 'sendCandidateUrl'
>

const AvailabilityRequestAction = ({
  candidateStatus,
  sendCandidateUrl
}: Props) => {
  if (candidateStatus === CandidateStatus.CANDIDATE_SENT) {
    return <Tag>Candidate Sent</Tag>
  }

  if (candidateStatus === CandidateStatus.DRAFT_CREATED) {
    return <Tag>Draft Created</Tag>
  }

  if (candidateStatus === CandidateStatus.INTERVIEW_CANCELED) {
    return <Tag>Interview Canceled</Tag>
  }

  if (
    sendCandidateUrl &&
    candidateStatus === CandidateStatus.AVAILABLE_FOR_SEND
  ) {
    return (
      <Button as={Link} size='small' href={sendCandidateUrl} target='_blank'>
        Send Candidate
      </Button>
    )
  }

  return null
}

export default AvailabilityRequestAction
