import React from 'react'
import { Tooltip, Exclamation16 } from '@toptal/picasso'
import { Maybe } from '@toptal/picasso/utils'
import { desiredFormatCommitment } from '@staff-portal/jobs'

export interface Props {
  jobCommitment?: string | null
  engagementCommitment?: string | null
  talentCount: Maybe<number>
}

const COMMITMENT_VARIES_MSG =
  'Please note that current engagement commitment varies from the initial job posting'

export const DesiredCommitment = ({
  jobCommitment,
  engagementCommitment,
  talentCount
}: Props) => {
  if (!jobCommitment || !engagementCommitment) {
    return desiredFormatCommitment(jobCommitment)
  }

  if (
    talentCount === 1 &&
    jobCommitment.toLowerCase() !== engagementCommitment.toLowerCase()
  ) {
    return (
      <span>
        {desiredFormatCommitment(jobCommitment)}{' '}
        {/* TODO: double-check the validity of change */}
        <Tooltip content={COMMITMENT_VARIES_MSG} interactive compact>
          <span data-testid='commitment-tooltip'>
            <Exclamation16 color='dark-grey' />
          </span>
        </Tooltip>
      </span>
    )
  }

  return desiredFormatCommitment(jobCommitment)
}
