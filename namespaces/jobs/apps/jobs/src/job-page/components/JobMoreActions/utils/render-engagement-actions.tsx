import React from 'react'
import {
  SendEngagementClientEmailItem,
  SendEngagementTalentEmailItem,
  ApproveEngagementTrialMenuItem,
  CancelEngagementMenuItem,
  RejectApprovedEngagementTrialMenuItem,
  RejectEngagementTrialMenuItem,
  TerminateEngagementMenuItem,
  REQUIRES_DECISION_STATUSES,
  ChangeEngagementCommitmentMenuItem,
  ChangeEngagementStartDateMenuItem,
  ChangeEngagementEndDateMenuItem,
  ScheduleBreakMenuItem
} from '@staff-portal/engagements'

import { JobPageFragment } from '../../../pages/JobPage/data/get-job-page-data'
import ReactivateEngagementMenuItem from '../../ReactivateEngagementMenuItem'

const renderEngagementActions = ({
  engagement,
  showCommitmentChangeModal
}: {
  engagement: JobPageFragment['jobCurrentEngagement']
  showCommitmentChangeModal?: () => void
}) => {
  if (!engagement || Number(engagement?.job?.talentCount) > 1) {
    return null
  }

  const {
    id,
    client,
    operations,
    job,
    status,
    talent,
    clientEmailMessaging,
    talentEmailMessaging
  } = engagement

  const requiresDecision = status && REQUIRES_DECISION_STATUSES.includes(status)
  const talentType = talent?.talentType ?? undefined

  const items = [
    <ChangeEngagementCommitmentMenuItem
      key='ChangeEngagementCommitmentMenuItem'
      operation={operations.changeEngagementCommitment}
      showModal={() => {
        showCommitmentChangeModal?.()
      }}
    />,

    <ChangeEngagementStartDateMenuItem
      key='ChangeEngagementStartDateMenuItem'
      engagementId={id}
      operation={operations.changeEngagementStartDate}
    />,

    <ChangeEngagementEndDateMenuItem
      key='ChangeEngagementEndDateMenuItem'
      engagementId={id}
      operation={operations.changeEngagementEndDate}
    />,

    <ScheduleBreakMenuItem
      key='ScheduleBreakMenuItem'
      engagementId={id}
      status={status}
      operation={operations.scheduleEngagementBreak}
    />,

    clientEmailMessaging && (
      <SendEngagementClientEmailItem
        key='SendEngagementClientEmailItem'
        componentType='menu-item'
        emailMessagingEngagementClientId={clientEmailMessaging.id}
        operation={clientEmailMessaging.operations.sendEmailTo}
      />
    ),

    talentEmailMessaging && (
      <SendEngagementTalentEmailItem
        key='SendEngagementTalentEmailItem'
        componentType='menu-item'
        emailMessagingEngagementTalentId={talentEmailMessaging.id}
        operation={talentEmailMessaging.operations.sendEmailTo}
      />
    ),

    requiresDecision ? (
      <ApproveEngagementTrialMenuItem
        key='ApproveEngagementTrialMenuItem'
        engagementId={id}
        clientId={client?.id}
        talentType={talentType}
        operation={operations.approveEngagementTrial}
      />
    ) : (
      <TerminateEngagementMenuItem
        key='TerminateEngagementMenuItem'
        engagementId={id}
        operation={operations.terminateEngagement}
        talentCount={job?.talentCount}
      />
    ),

    <RejectEngagementTrialMenuItem
      key='RejectEngagementTrialMenuItem'
      engagementId={id}
      talentType={talentType}
      operation={operations.rejectEngagementTrial}
    />,

    <RejectApprovedEngagementTrialMenuItem
      key='RejectApprovedEngagementTrialMenuItem'
      engagementId={id}
      talentType={talentType}
      operation={operations.rejectApprovedEngagementTrial}
    />,

    <CancelEngagementMenuItem
      key='CancelEngagementMenuItem'
      engagementId={id}
      operation={operations.cancelEngagementTrial}
    />,

    <ReactivateEngagementMenuItem
      key='ReactivateEngagementMenuItem'
      engagementId={id}
      operation={operations.reactivateEngagement}
    >
      Reactivate Job
    </ReactivateEngagementMenuItem>
  ].filter(Boolean)

  return items
}

export default renderEngagementActions
