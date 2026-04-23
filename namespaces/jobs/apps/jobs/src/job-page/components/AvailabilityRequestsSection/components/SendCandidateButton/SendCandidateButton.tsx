import {
  Button,
  Tag,
  // eslint-disable-next-line no-restricted-imports
  Link as PicassoLink
} from '@toptal/picasso'
import React from 'react'
import { Link } from '@staff-portal/navigation'
import { AvailabilityRequestCandidateStatus } from '@staff-portal/graphql/staff'
import { WrapWithTooltip } from '@staff-portal/ui'

export interface Props {
  sendCandidateUrl?: string | null
  candidateStatus?: AvailabilityRequestCandidateStatus | null
  jobType?: string
  talentType?: string
  talentSuspended?: boolean | null
}

const disabledButtonTooltip = (
  talentSuspended?: boolean | null,
  talentType?: string,
  jobType?: string
) => {
  if (talentSuspended) {
    return 'You cannot send suspended talent to a job'
  }

  return `${talentType} can't be sent to ${jobType} job`
}

const SendCandidateButton = ({
  sendCandidateUrl,
  candidateStatus,
  jobType,
  talentType,
  talentSuspended
}: Props) => {
  const isTalentNotAvailable =
    candidateStatus ===
    AvailabilityRequestCandidateStatus.NOT_AVAILABLE_FOR_SEND

  switch (candidateStatus) {
    case AvailabilityRequestCandidateStatus.NOT_AVAILABLE_FOR_SEND:
    case AvailabilityRequestCandidateStatus.AVAILABLE_FOR_SEND:
      return (
        <WrapWithTooltip
          enableTooltip={isTalentNotAvailable}
          content={disabledButtonTooltip(talentSuspended, jobType, talentType)}
        >
          <span>
            <Button
              disabled={isTalentNotAvailable}
              as={Link as typeof PicassoLink}
              variant='positive'
              size='small'
              noUnderline
              href={sendCandidateUrl}
              data-testid='send-candidate-link'
            >
              Send Candidate
            </Button>
          </span>
        </WrapWithTooltip>
      )
    case AvailabilityRequestCandidateStatus.INTERVIEW_CANCELED:
      return (
        <Tag.Rectangular
          variant='light-grey'
          data-testid='interview-canceled-tag'
        >
          Interview Canceled
        </Tag.Rectangular>
      )
    case AvailabilityRequestCandidateStatus.DRAFT_CREATED:
      return (
        <Tag.Rectangular variant='light-grey' data-testid='draft-created-tag'>
          Draft Created
        </Tag.Rectangular>
      )
    case AvailabilityRequestCandidateStatus.CANDIDATE_SENT:
      return (
        <Tag.Rectangular variant='light-grey' data-testid='candidate-sent-tag'>
          Candidate Sent
        </Tag.Rectangular>
      )
    default:
      return null
  }
}

export default SendCandidateButton
