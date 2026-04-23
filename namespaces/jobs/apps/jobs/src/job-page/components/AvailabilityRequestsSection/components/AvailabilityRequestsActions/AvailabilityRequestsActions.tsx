import {
  ArrowUpMinor16,
  ArrowDownMinor16,
  Button,
  Container
} from '@toptal/picasso'
import React from 'react'
import { AvailabilityRequestCandidateStatus } from '@staff-portal/graphql/staff'

import SendCandidateButton from '../SendCandidateButton'

export interface Props {
  availabilityRequestId: string
  sendCandidateUrl?: string | null
  candidateStatus?: AvailabilityRequestCandidateStatus | null
  jobType?: string
  talentType?: string
  talentSuspended?: boolean | null
  isExpanded: boolean
  expandItem: (jobApplicantId: string | null) => void
}

const AvailabilityRequestsActions = ({
  availabilityRequestId,
  sendCandidateUrl,
  candidateStatus,
  jobType,
  talentType,
  talentSuspended,
  isExpanded,
  expandItem
}: Props) => {
  if (!availabilityRequestId) {
    return null
  }

  const toggleExpandRow = () => {
    expandItem(isExpanded ? null : availabilityRequestId)
  }

  return (
    <Container flex alignItems='center' justifyContent='space-between'>
      <Container>
        <SendCandidateButton
          sendCandidateUrl={sendCandidateUrl}
          candidateStatus={candidateStatus}
          jobType={jobType}
          talentType={talentType}
          talentSuspended={talentSuspended}
        />
      </Container>
      <Container as='span' left='xsmall'>
        <Button.Circular
          title='expand availability request'
          variant='flat'
          data-testid='JobAvailabilityRequest-expand-button'
          icon={isExpanded ? <ArrowUpMinor16 /> : <ArrowDownMinor16 />}
          onClick={toggleExpandRow}
        />
      </Container>
    </Container>
  )
}

export default AvailabilityRequestsActions
