import React, { ReactNode } from 'react'
import { StaffCommitmentChangeWidget } from '@staff-portal/billing-widgets'

import { JobPageFragment } from '../../pages/JobPage/data/get-job-page-data'

type Props = {
  engagement: JobPageFragment['jobCurrentEngagement']
  children: (showCommitmentChangeModal?: () => void) => ReactNode
}

export const JobMoreActionsWrapper = ({ engagement, children }: Props) => {
  if (engagement) {
    return (
      <StaffCommitmentChangeWidget engagementId={engagement.id}>
        {showCommitmentChangeModal => children(showCommitmentChangeModal)}
      </StaffCommitmentChangeWidget>
    )
  }

  return <>{children()}</>
}

export default JobMoreActionsWrapper
