import React from 'react'
import { TalentCurrentInterviewsEntry } from '@staff-portal/graphql/staff'
import { Typography } from '@toptal/picasso'

import { getStatusOrdering, getStatusText } from './utils/utils'

export interface Props {
  currentInterviewsEntry: TalentCurrentInterviewsEntry[]
  talentType: string
}

const CurrentInterviewsEntryCounts = ({
  currentInterviewsEntry,
  talentType
}: Props) => {
  if (currentInterviewsEntry.length === 0) {
    return (
      <Typography
        weight='semibold'
        data-testid='current-interviews-entry-counts'
      >
        N/A
      </Typography>
    )
  }

  return (
    <>
      {[...currentInterviewsEntry]
        .sort(
          (entryA, entryB) =>
            getStatusOrdering(entryA.engagementStatus, entryA.interviewStatus) -
            getStatusOrdering(entryB.engagementStatus, entryB.interviewStatus)
        )
        .map(({ engagementStatus, interviewStatus, count }) => (
          <Typography
            key={`${engagementStatus}_${interviewStatus}`}
            data-testid='current-interviews-entry-counts'
          >
            <Typography as='span' weight='semibold'>
              {getStatusText({ engagementStatus, interviewStatus, talentType })}
              :
            </Typography>{' '}
            <Typography as='span'>{count}</Typography>
          </Typography>
        ))}
    </>
  )
}

export default CurrentInterviewsEntryCounts
