import {
  Menu,
  // eslint-disable-next-line no-restricted-imports
  Link as PicassoLink
} from '@toptal/picasso'
import React from 'react'
import { Link } from '@staff-portal/navigation'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'
import {
  SendEngagementClientEmailItem,
  SendEngagementTalentEmailItem,
  ImportTopMenuItem,
  SendTopMenuItem,
  ApproveEngagementTrialMenuItem,
  CancelEngagementMenuItem,
  TerminateEngagementMenuItem,
  ReopenEngagementAndApproveTrialMenuItem,
  RejectEngagementTrialMenuItem,
  RejectApprovedEngagementTrialMenuItem,
  ChangeEngagementStartDateMenuItem,
  ChangeEngagementEndDateMenuItem,
  ChangeEngagementCommitmentMenuItem,
  BillingCycleSettingsMenuItem,
  ScheduleBreakMenuItem,
  useCommonEngagementActions,
  RevertEngagementTrialToActiveItem
} from '@staff-portal/engagements'
import { MoreButton } from '@staff-portal/ui'
import { getTalentProfileLinkTarget } from '@staff-portal/jobs'
import {
  StaffBillingCycleSettingsWidget,
  StaffCommitmentChangeWidget
} from '@staff-portal/billing-widgets'

import { HiredTalentEngagementFragment } from '../HiredTalentSection/data/get-hired-talent/get-hired-talent.staff.gql.types'
import * as S from './styles'
import SlackButton, { hasSlackContacts } from '../SlackButton'
import ReactivateEngagementMenuItem from '../ReactivateEngagementMenuItem'
import SendPaymentsAgreementItem from '../SendPaymentsAgreementItem'

type Props = {
  engagement: HiredTalentEngagementFragment
}

const HiredTalentMoreDropdown = ({ engagement }: Props) => {
  const {
    client,
    talent,
    webResource,
    id,
    job,
    clientEmailMessaging,
    talentEmailMessaging,
    operations: {
      approveEngagementTrial,
      rejectEngagementTrial,
      rejectApprovedEngagementTrial,
      sendSemiMonthlyEngagementPaymentsAgreement,
      sendTop,
      importTop,
      cancelEngagementTrial,
      terminateEngagement,
      reactivateEngagement,
      reopenExpiredEngagement,
      changeEngagementStartDate,
      changeEngagementEndDate,
      changeEngagementCommitment,
      changeProductBillingFrequency,
      scheduleEngagementBreak,
      revertEngagementTrialToActive
    }
  } = engagement
  const { id: clientId } = client || {}
  const { type: talentType, webResource: talentWebResource } = talent || {}

  const {
    operationIsLoading: loading,
    hasMultipleTalent,
    renderImportContractAsTopItem,
    isRequiresDecisionStatus
  } = useCommonEngagementActions({ engagement })

  // Platform code for order of menu items https://github.com/toptal/platform/blob/8e7bef60adb8ad83a45823e5ebc6bad99d53e435/app/views/platform/staff_space/jobs/_engagements_talent_detail.slim
  return (
    <>
      <WidgetErrorBoundary emptyOnError>
        <StaffBillingCycleSettingsWidget engagementId={id}>
          {showBillingCycleSettings => (
            <StaffCommitmentChangeWidget engagementId={id}>
              {showCommitmentChangeModal => (
                <MoreButton
                  loading={loading}
                  css={S.moreBtn}
                  inline
                  data-testid='HiredTalentMoreDropdown-more-button'
                >
                  {talentWebResource?.url && (
                    <Menu.Item
                      data-testid='talent-web-resoure-link'
                      as={Link as typeof PicassoLink}
                      href={talentWebResource.url}
                      target={getTalentProfileLinkTarget(talentWebResource.url)}
                    >
                      View Profile
                    </Menu.Item>
                  )}

                  {webResource?.url && (
                    <Menu.Item
                      data-testid='engagement-web-resoure-link'
                      as={Link as typeof PicassoLink}
                      href={webResource.url}
                    >
                      View Engagement
                    </Menu.Item>
                  )}

                  <SendTopMenuItem
                    engagementId={id}
                    operation={sendTop}
                    clientHasStaSigned={Boolean(client?.contracts?.totalCount)}
                  />

                  <ImportTopMenuItem engagementId={id} operation={importTop} />

                  {renderImportContractAsTopItem()}

                  <ChangeEngagementCommitmentMenuItem
                    operation={changeEngagementCommitment}
                    showModal={showCommitmentChangeModal}
                  />

                  <ChangeEngagementStartDateMenuItem
                    engagementId={id}
                    operation={changeEngagementStartDate}
                  />

                  <ChangeEngagementEndDateMenuItem
                    engagementId={id}
                    operation={changeEngagementEndDate}
                  />

                  {hasMultipleTalent && (
                    <BillingCycleSettingsMenuItem
                      operation={changeProductBillingFrequency}
                      showModal={showBillingCycleSettings}
                    />
                  )}

                  <SendPaymentsAgreementItem
                    engagementId={id}
                    operation={sendSemiMonthlyEngagementPaymentsAgreement}
                  />

                  <ScheduleBreakMenuItem
                    engagementId={id}
                    status={engagement.status}
                    operation={scheduleEngagementBreak}
                  />

                  <SendEngagementClientEmailItem
                    componentType='menu-item'
                    emailMessagingEngagementClientId={
                      clientEmailMessaging?.id ?? ''
                    }
                    operation={clientEmailMessaging?.operations.sendEmailTo}
                  />

                  <SendEngagementTalentEmailItem
                    componentType='menu-item'
                    emailMessagingEngagementTalentId={
                      talentEmailMessaging?.id ?? ''
                    }
                    operation={talentEmailMessaging?.operations.sendEmailTo}
                  />

                  {!!talent && hasSlackContacts(talent.slackContacts.nodes) && (
                    <SlackButton
                      slackContacts={talent.slackContacts.nodes}
                      variant='menuItem'
                    />
                  )}

                  {isRequiresDecisionStatus && (
                    <ApproveEngagementTrialMenuItem
                      engagementId={id}
                      clientId={clientId}
                      talentType={talentType}
                      operation={approveEngagementTrial}
                    />
                  )}

                  {!isRequiresDecisionStatus && (
                    <TerminateEngagementMenuItem
                      engagementId={id}
                      operation={terminateEngagement}
                      talentCount={job?.talentCount}
                    />
                  )}

                  <RejectEngagementTrialMenuItem
                    engagementId={id}
                    talentType={talentType}
                    operation={rejectEngagementTrial}
                  />
                  <RejectApprovedEngagementTrialMenuItem
                    engagementId={id}
                    talentType={talentType}
                    operation={rejectApprovedEngagementTrial}
                  />

                  <CancelEngagementMenuItem
                    engagementId={id}
                    operation={cancelEngagementTrial}
                  />

                  <ReopenEngagementAndApproveTrialMenuItem
                    engagementId={id}
                    operation={reopenExpiredEngagement}
                  />

                  <RevertEngagementTrialToActiveItem
                    engagementId={id}
                    operation={revertEngagementTrialToActive}
                  />

                  <ReactivateEngagementMenuItem
                    engagementId={id}
                    operation={reactivateEngagement}
                  >
                    Reactivate Engagement
                  </ReactivateEngagementMenuItem>
                </MoreButton>
              )}
            </StaffCommitmentChangeWidget>
          )}
        </StaffBillingCycleSettingsWidget>
      </WidgetErrorBoundary>
    </>
  )
}

export default HiredTalentMoreDropdown
