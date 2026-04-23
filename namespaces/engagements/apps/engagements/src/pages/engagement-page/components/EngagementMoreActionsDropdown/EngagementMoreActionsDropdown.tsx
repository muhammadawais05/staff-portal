/* eslint-disable complexity, max-lines, max-lines-per-function */
import React from 'react'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'
import { isOperationHidden } from '@staff-portal/operations'
import {
  ScheduleInterviewItem,
  useUpdateInterviewGoogleEventModal,
  getEngagementInterview,
  ScheduleInternalInterviewItem,
  RescheduleInternalInterviewItem,
  RescheduleInterviewItem,
  EngagementFragment,
  RenderEngagementInterviewItem,
  useMakeRenderEngagementInterviewLazyOperation
} from '@staff-portal/engagements-interviews'
import {
  SendEngagementClientEmailItem,
  SendEngagementTalentEmailItem,
  SendTopMenuItem,
  ImportTopMenuItem,
  TerminateEngagementMenuItem,
  ReopenEngagementAndApproveTrialMenuItem,
  ChangeEngagementStartDateMenuItem,
  ChangeEngagementEndDateMenuItem,
  ChangeEngagementCommitmentMenuItem,
  BillingCycleSettingsMenuItem,
  ScheduleBreakMenuItem,
  CancelEngagementDraftMenuItem,
  CancelInterviewMenuItem,
  RejectEngagementCandidateMenuItem,
  AcceptCandidateItem,
  ApproveEngagementTrialMenuItem,
  RejectEngagementTrialMenuItem,
  RejectApprovedEngagementTrialMenuItem,
  useCommonEngagementActions,
  RevertEngagementTrialToActiveItem
} from '@staff-portal/engagements'
import { MoreButton } from '@staff-portal/ui'
import {
  StaffBillingCycleSettingsWidget,
  StaffCommitmentChangeWidget
} from '@staff-portal/billing-widgets'

import ApproveRejectedTrialItem from '../ApproveRejectedTrialItem'
import {
  checkEngagementOperationByCondition,
  checkAvailableEngagementOperations
} from './utils'

interface Props {
  engagement: EngagementFragment
}

// eslint-disable-next-line max-statements
const EngagementMoreActionsDropdown = ({ engagement }: Props) => {
  const {
    id,
    client,
    talent,
    job,
    operations,
    interview,
    newInternalInterview,
    newExternalInterview,
    clientEmailMessaging,
    talentEmailMessaging
  } = engagement
  const latestExternalInterview = engagement.latestExternalInterview?.nodes?.[0]
  const latestInternalInterview = engagement.latestInternalInterview?.nodes?.[0]
  const { id: clientId } = client || {}
  const { type: talentType } = talent || {}

  const {
    operationIsLoading,
    setOperationIsLoading,
    handleOperationClick,
    hasMultipleTalent,
    renderImportContractAsTopItem,
    renderCancelEngagementItem,
    isInInterviewStatus,
    isCurrentStatus,
    isRequiresDecisionStatus
  } = useCommonEngagementActions({ engagement })

  const {
    approveEngagementTrial: approveEngagementTrialOperation,
    approveRejectedEngagementTrial: approveRejectedEngagementTrialOperation,
    cancelEngagementDraftInInterview: cancelEngagementDraftInInterviewOperation,
    cancelEngagementInInterview: cancelEngagementInInterviewOperation,
    cancelEngagementTrial: cancelEngagementTrialOperation,
    changeEngagementCommitment: changeEngagementCommitmentOperation,
    changeEngagementEndDate: changeEngagementEndDateOperation,
    changeEngagementStartDate: changeEngagementStartDateOperation,
    changeProductBillingFrequency: changeProductBillingFrequencyOperation,
    importContractAsTop: importContractAsTopOperation,
    importTop: importTopOperation,
    rejectApprovedEngagementTrial: rejectApprovedEngagementTrialOperation,
    rejectEngagementOnInterview: rejectEngagementOnInterviewOperation,
    rejectEngagementTrial: rejectEngagementTrialOperation,
    reopenExpiredEngagement: reopenExpiredEngagementOperation,
    revertEngagementTrialToActive: revertEngagementTrialToActiveOperation,
    scheduleEngagementActivationStartDate:
      scheduleEngagementActivationStartDateOperation,
    scheduleEngagementBreak: scheduleEngagementBreakOperation,
    sendTop: sendTopOperation,
    terminateEngagement: terminateEngagementOperation
  } = operations

  const MakeRenderEngagementInterviewLazyOperation =
    useMakeRenderEngagementInterviewLazyOperation({
      interview,
      setOperationIsLoading
    })

  const {
    loading: updateInterviewGoogleEventLoading,
    showModal: showUpdateInterviewGoogleEventModal
  } = useUpdateInterviewGoogleEventModal(interview?.id as string)
  const renderUpdateInterviewGoogleEventItem = RenderEngagementInterviewItem({
    renderLazyOperation: MakeRenderEngagementInterviewLazyOperation,
    handleOperationClick,
    showModal: showUpdateInterviewGoogleEventModal,
    'data-testid': 'update-interview-google-event',
    operationName: 'updateInterviewGoogleCalendarEvent',
    label: 'Edit Interview Details'
  })

  const loading = operationIsLoading || updateInterviewGoogleEventLoading

  const isBillingCycleSettingsOperationShown =
    isCurrentStatus &&
    hasMultipleTalent &&
    !isOperationHidden(changeProductBillingFrequencyOperation)

  const isApproveEngagementTrialOperationShown =
    isCurrentStatus &&
    isRequiresDecisionStatus &&
    !isOperationHidden(approveEngagementTrialOperation)

  const isTerminateEngagementOperationShown =
    isCurrentStatus &&
    !isRequiresDecisionStatus &&
    !isOperationHidden(terminateEngagementOperation)

  const allOperationsHidden =
    !isBillingCycleSettingsOperationShown &&
    !isApproveEngagementTrialOperationShown &&
    !isTerminateEngagementOperationShown &&
    !checkEngagementOperationByCondition(isCurrentStatus, [
      changeEngagementCommitmentOperation,
      changeEngagementStartDateOperation,
      changeEngagementEndDateOperation,
      scheduleEngagementBreakOperation,
      reopenExpiredEngagementOperation,
      rejectEngagementTrialOperation,
      rejectApprovedEngagementTrialOperation
    ]) &&
    !checkEngagementOperationByCondition(isInInterviewStatus, [
      clientEmailMessaging?.operations.sendEmailTo,
      talentEmailMessaging?.operations.sendEmailTo,
      scheduleEngagementActivationStartDateOperation
    ]) &&
    !checkEngagementOperationByCondition(!isInInterviewStatus, [
      clientEmailMessaging?.operations.sendEmailTo,
      talentEmailMessaging?.operations.sendEmailTo
    ]) &&
    !checkEngagementOperationByCondition(hasMultipleTalent, [
      sendTopOperation,
      importTopOperation
    ]) &&
    !checkAvailableEngagementOperations([
      importContractAsTopOperation,
      cancelEngagementTrialOperation,
      revertEngagementTrialToActiveOperation,
      cancelEngagementInInterviewOperation,
      rejectEngagementOnInterviewOperation,
      approveRejectedEngagementTrialOperation,
      cancelEngagementDraftInInterviewOperation
    ]) &&
    isOperationHidden(
      getEngagementInterview({
        latestInterview: latestExternalInterview,
        newInterview: newExternalInterview
      })?.operations.clearAndChangeInterviewProposedTimeSlots
    ) &&
    isOperationHidden(
      getEngagementInterview({
        latestInterview: latestExternalInterview,
        newInterview: newExternalInterview
      })?.operations.proposeInterviewTimeSlots
    ) &&
    isOperationHidden(
      getEngagementInterview({
        latestInterview: latestInternalInterview,
        newInterview: newInternalInterview
      })?.operations.proposeInternalInterviewTimeSlots
    ) &&
    isOperationHidden(
      getEngagementInterview({
        latestInterview: latestInternalInterview,
        newInterview: newInternalInterview
      })?.operations.clearAndChangeInternalInterviewProposedTimeSlots
    )

  // Platform code for order of menu items https://github.com/toptal/platform/blob/0799f45bdd93a422a4b3a63afed92442eccb4123/app/views/platform/staff_space/engagements/_title.html.slim
  return (
    <>
      <WidgetErrorBoundary emptyOnError>
        <StaffBillingCycleSettingsWidget engagementId={id}>
          {showBillingCycleSettings => (
            <StaffCommitmentChangeWidget engagementId={id}>
              {showCommitmentChangeModal => (
                <MoreButton
                  fullHeight
                  disablePopper
                  loading={loading}
                  hidden={allOperationsHidden}
                >
                  <RescheduleInternalInterviewItem
                    componentType='menu-item'
                    newInternalInterview={newInternalInterview}
                    latestInternalInterview={latestInternalInterview}
                  />

                  <ScheduleInternalInterviewItem
                    componentType='menu-item'
                    engagementId={id}
                    latestInternalInterview={latestInternalInterview}
                    newInternalInterview={newInternalInterview}
                  />

                  <CancelEngagementDraftMenuItem
                    engagementId={id}
                    operation={cancelEngagementDraftInInterviewOperation}
                  />

                  {hasMultipleTalent && (
                    <SendTopMenuItem
                      engagementId={id}
                      operation={sendTopOperation}
                      clientHasStaSigned={Boolean(
                        client?.contracts?.totalCount
                      )}
                    />
                  )}

                  {hasMultipleTalent && (
                    <ImportTopMenuItem
                      engagementId={id}
                      operation={importTopOperation}
                    />
                  )}

                  {renderImportContractAsTopItem({
                    hidden: !hasMultipleTalent
                  })}

                  {isInInterviewStatus && (
                    <AcceptCandidateItem
                      componentType='menu-item'
                      data-testid='accept-candidate'
                      operation={scheduleEngagementActivationStartDateOperation}
                      clientHasStaSigned={Boolean(
                        client?.contracts?.totalCount
                      )}
                      engagementId={id}
                    />
                  )}

                  {isInInterviewStatus && (
                    <ChangeEngagementCommitmentMenuItem
                      operation={changeEngagementCommitmentOperation}
                      showModal={showCommitmentChangeModal}
                    />
                  )}

                  {isInInterviewStatus && (
                    <SendEngagementClientEmailItem
                      componentType='menu-item'
                      emailMessagingEngagementClientId={
                        clientEmailMessaging?.id ?? ''
                      }
                      operation={clientEmailMessaging?.operations.sendEmailTo}
                    />
                  )}

                  {isInInterviewStatus && (
                    <SendEngagementTalentEmailItem
                      componentType='menu-item'
                      emailMessagingEngagementTalentId={
                        talentEmailMessaging?.id ?? ''
                      }
                      operation={talentEmailMessaging?.operations.sendEmailTo}
                    />
                  )}

                  {renderUpdateInterviewGoogleEventItem({
                    hidden: !isInInterviewStatus
                  })}

                  {isInInterviewStatus && (
                    <CancelInterviewMenuItem
                      engagementId={id}
                      operation={cancelEngagementInInterviewOperation}
                    />
                  )}

                  {isInInterviewStatus && (
                    <RejectEngagementCandidateMenuItem
                      engagementId={id}
                      operation={rejectEngagementOnInterviewOperation}
                    />
                  )}

                  {isInInterviewStatus && (
                    <ScheduleInterviewItem
                      componentType='menu-item'
                      engagementId={id}
                      latestExternalInterview={latestExternalInterview}
                      newExternalInterview={newExternalInterview}
                    />
                  )}
                  {isInInterviewStatus && (
                    <RescheduleInterviewItem
                      componentType='menu-item'
                      latestExternalInterview={latestExternalInterview}
                      newExternalInterview={newExternalInterview}
                    >
                      Reschedule Interview
                    </RescheduleInterviewItem>
                  )}

                  {!isInInterviewStatus && (
                    <SendEngagementClientEmailItem
                      componentType='menu-item'
                      emailMessagingEngagementClientId={
                        clientEmailMessaging?.id ?? ''
                      }
                      operation={clientEmailMessaging?.operations.sendEmailTo}
                    />
                  )}

                  {!isInInterviewStatus && (
                    <SendEngagementTalentEmailItem
                      componentType='menu-item'
                      emailMessagingEngagementTalentId={
                        talentEmailMessaging?.id ?? ''
                      }
                      operation={talentEmailMessaging?.operations.sendEmailTo}
                    />
                  )}

                  {isCurrentStatus && (
                    <ChangeEngagementCommitmentMenuItem
                      operation={changeEngagementCommitmentOperation}
                      showModal={showCommitmentChangeModal}
                    />
                  )}

                  {isCurrentStatus && (
                    <ChangeEngagementStartDateMenuItem
                      engagementId={id}
                      operation={changeEngagementStartDateOperation}
                    />
                  )}

                  {isCurrentStatus && (
                    <ChangeEngagementEndDateMenuItem
                      engagementId={id}
                      operation={changeEngagementEndDateOperation}
                    />
                  )}

                  {isBillingCycleSettingsOperationShown && (
                    <BillingCycleSettingsMenuItem
                      operation={changeProductBillingFrequencyOperation}
                      showModal={showBillingCycleSettings}
                    />
                  )}

                  {isCurrentStatus && (
                    <ScheduleBreakMenuItem
                      engagementId={id}
                      status={engagement.status}
                      operation={scheduleEngagementBreakOperation}
                    />
                  )}

                  {isCurrentStatus && (
                    <ReopenEngagementAndApproveTrialMenuItem
                      engagementId={id}
                      operation={reopenExpiredEngagementOperation}
                    />
                  )}

                  {isCurrentStatus && (
                    <RevertEngagementTrialToActiveItem
                      engagementId={id}
                      operation={revertEngagementTrialToActiveOperation}
                    />
                  )}

                  {isApproveEngagementTrialOperationShown && (
                    <ApproveEngagementTrialMenuItem
                      engagementId={id}
                      clientId={clientId}
                      talentType={talentType}
                      operation={approveEngagementTrialOperation}
                    />
                  )}

                  {isTerminateEngagementOperationShown && (
                    <TerminateEngagementMenuItem
                      engagementId={id}
                      operation={terminateEngagementOperation}
                      talentCount={job?.talentCount}
                    />
                  )}

                  {isCurrentStatus && (
                    <RejectEngagementTrialMenuItem
                      engagementId={id}
                      talentType={talentType}
                      operation={rejectEngagementTrialOperation}
                    />
                  )}

                  {isCurrentStatus && (
                    <RejectApprovedEngagementTrialMenuItem
                      engagementId={id}
                      talentType={talentType}
                      operation={rejectApprovedEngagementTrialOperation}
                    />
                  )}

                  {renderCancelEngagementItem()}

                  <ApproveRejectedTrialItem
                    engagementId={id}
                    talentType={talentType}
                    operation={approveRejectedEngagementTrialOperation}
                  />
                </MoreButton>
              )}
            </StaffCommitmentChangeWidget>
          )}
        </StaffBillingCycleSettingsWidget>
      </WidgetErrorBoundary>
    </>
  )
}

export default EngagementMoreActionsDropdown
