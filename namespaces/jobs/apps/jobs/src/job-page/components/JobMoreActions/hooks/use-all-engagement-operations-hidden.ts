import { useMemo } from 'react'
import { isOperationHidden } from '@staff-portal/operations'
import { REQUIRES_DECISION_STATUSES } from '@staff-portal/engagements'

import { JobPageFragment } from '../../../pages/JobPage/data/get-job-page-data'

export const useAllEngagementOperationsHidden = (
  jobCurrentEngagement: JobPageFragment['jobCurrentEngagement']
) => {
  const {
    operations: {
      changeEngagementCommitment,
      changeEngagementStartDate,
      changeEngagementEndDate,
      scheduleEngagementBreak,
      approveEngagementTrial,
      terminateEngagement,
      rejectEngagementTrial,
      rejectApprovedEngagementTrial,
      cancelEngagementTrial,
      reactivateEngagement
    },
    status: engagementStatus,
    clientEmailMessaging: engagementClientEmailMessaging,
    talentEmailMessaging: engagementTalentEmailMessaging
  } = jobCurrentEngagement || { operations: {} }

  const allEngagementOperationsHidden = useMemo(() => {
    if (
      ![
        changeEngagementCommitment,
        changeEngagementStartDate,
        changeEngagementEndDate,
        scheduleEngagementBreak,
        approveEngagementTrial,
        terminateEngagement,
        rejectEngagementTrial,
        rejectApprovedEngagementTrial,
        cancelEngagementTrial,
        reactivateEngagement,
        engagementClientEmailMessaging,
        engagementTalentEmailMessaging
      ].some(Boolean)
    ) {
      return true
    }

    const requiresDecision =
      engagementStatus && REQUIRES_DECISION_STATUSES.includes(engagementStatus)

    return [
      changeEngagementCommitment,
      changeEngagementStartDate,
      changeEngagementEndDate,
      scheduleEngagementBreak,
      engagementClientEmailMessaging?.operations.sendEmailTo,
      engagementTalentEmailMessaging?.operations.sendEmailTo,
      requiresDecision ? approveEngagementTrial : terminateEngagement,
      rejectEngagementTrial,
      rejectApprovedEngagementTrial,
      cancelEngagementTrial,
      reactivateEngagement
    ].every(isOperationHidden)
  }, [
    changeEngagementCommitment,
    changeEngagementStartDate,
    changeEngagementEndDate,
    scheduleEngagementBreak,
    approveEngagementTrial,
    terminateEngagement,
    rejectEngagementTrial,
    rejectApprovedEngagementTrial,
    cancelEngagementTrial,
    reactivateEngagement,
    engagementStatus,
    engagementClientEmailMessaging,
    engagementTalentEmailMessaging
  ])

  return { allEngagementOperationsHidden }
}
