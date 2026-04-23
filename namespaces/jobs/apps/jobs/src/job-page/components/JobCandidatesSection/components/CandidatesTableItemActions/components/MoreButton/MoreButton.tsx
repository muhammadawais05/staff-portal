import React from 'react'
import { Menu } from '@toptal/picasso'
import {
  SendEngagementClientEmailItem,
  SendEngagementTalentEmailItem,
  CancelInterviewMenuItem,
  ChangeEngagementCommitmentMenuItem,
  ExpireEngagementItem,
  RejectEngagementCandidateMenuItem,
  AcceptCandidateItem
} from '@staff-portal/engagements'
import { MoreButton as ActionsMoreButton } from '@staff-portal/ui'
import {
  EngagementFragment,
  RescheduleInterviewItem,
  ScheduleInterviewItem
} from '@staff-portal/engagements-interviews'
import { StaffCommitmentChangeWidget } from '@staff-portal/billing-widgets'

import { useGetRenderMoreButtonActions } from '../../hooks'
import { hasSlackContacts } from '../../../../../SlackButton/utils'
import SlackButton from '../../../../../SlackButton/SlackButton'

interface Props {
  engagement: EngagementFragment
}

const MoreButton = ({ engagement }: Props) => {
  const {
    loading,
    isInInterviewStatus,
    handleOperationClick,
    renderEditInterviewDetailsLazyOperation
  } = useGetRenderMoreButtonActions({ engagement })

  const engagementId = engagement.id
  const slackContacts = engagement?.talent?.slackContacts?.nodes
  const latestExternalInterview = engagement.latestExternalInterview?.nodes?.[0]

  return isInInterviewStatus ? (
    <>
      <StaffCommitmentChangeWidget engagementId={engagementId}>
        {showCommitmentChangeModal => (
          <ActionsMoreButton
            left='xsmall'
            fullHeight
            disablePopper
            loading={loading}
          >
            <ExpireEngagementItem
              data-testid='expire-more-button'
              componentType='menu-item'
              engagementId={engagementId}
              initialOperation={engagement?.operations?.expireEngagement}
            />

            <AcceptCandidateItem
              componentType='menu-item'
              data-testid='accept-candidate-more-button'
              operation={
                engagement.operations.scheduleEngagementActivationStartDate
              }
              clientHasStaSigned={Boolean(
                engagement?.client?.contracts?.totalCount
              )}
              engagementId={engagementId}
            />

            <ChangeEngagementCommitmentMenuItem
              operation={engagement.operations.changeEngagementCommitment}
              showModal={showCommitmentChangeModal}
            />

            <SendEngagementClientEmailItem
              componentType='menu-item'
              emailMessagingEngagementClientId={
                engagement.clientEmailMessaging?.id ?? ''
              }
              operation={
                engagement.clientEmailMessaging?.operations.sendEmailTo
              }
            />

            <SendEngagementTalentEmailItem
              componentType='menu-item'
              emailMessagingEngagementTalentId={
                engagement.talentEmailMessaging?.id ?? ''
              }
              operation={
                engagement.talentEmailMessaging?.operations.sendEmailTo
              }
            />

            {hasSlackContacts(slackContacts) && (
              <SlackButton slackContacts={slackContacts} variant='menuItem' />
            )}

            <CancelInterviewMenuItem
              engagementId={engagementId}
              operation={engagement.operations.cancelEngagementInInterview}
            />

            <RejectEngagementCandidateMenuItem
              engagementId={engagementId}
              operation={engagement.operations.rejectEngagementOnInterview}
            />

            <ScheduleInterviewItem
              componentType='menu-item'
              engagementId={engagementId}
              latestExternalInterview={latestExternalInterview}
            />

            <ScheduleInterviewItem
              componentType='menu-item'
              additionalInterview
              engagementId={engagementId}
              latestExternalInterview={latestExternalInterview}
              newExternalInterview={engagement.newExternalInterview}
              data-testid='schedule-additional-interview-item'
            >
              {`Schedule ${
                latestExternalInterview ? 'Additional' : ''
              } Interview`}
            </ScheduleInterviewItem>

            {renderEditInterviewDetailsLazyOperation(
              ({ checkOperation, disabled }) => (
                <Menu.Item
                  disabled={disabled}
                  onClick={handleOperationClick(checkOperation)}
                  data-testid='edit-interview-details-more-button'
                >
                  Edit Interview Details
                </Menu.Item>
              )
            )}

            <RescheduleInterviewItem
              componentType='menu-item'
              latestExternalInterview={latestExternalInterview}
              newExternalInterview={engagement.newExternalInterview}
            >
              Reschedule Interview
            </RescheduleInterviewItem>
          </ActionsMoreButton>
        )}
      </StaffCommitmentChangeWidget>
    </>
  ) : null
}

export default MoreButton
