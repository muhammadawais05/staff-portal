import React from 'react'
import { Menu } from '@toptal/picasso'
import { JobStatus } from '@staff-portal/graphql/staff'
import { getJobEditPath, getAddSourcingRequestPath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { Operation } from '@staff-portal/operations'
import { MenuLink, WrapWithTooltip, MoreButton } from '@staff-portal/ui'
import { useModal } from '@staff-portal/modals-service'

import { JobPageFragment } from '../../pages/JobPage/data/get-job-page-data'
import { useJobMoreActions } from './hooks/use-job-more-actions'
import { useAllEngagementOperationsHidden } from './hooks/use-all-engagement-operations-hidden'
import renderEngagementActions from './utils/render-engagement-actions'
import JobMoreActionsWrapper from '../JobMoreActionsWrapper'
import SendJobEmailMenuItem from '../SendJobEmailMenuItem'
import UnlinkJobOpportunityModal from '../UnlinkJobOpportunityModal'

export interface Props {
  job: JobPageFragment
}

// eslint-disable-next-line max-lines-per-function
const JobMoreActions = ({
  job: {
    id,
    assignTalentLink,
    casesUrl,
    client: { fullName: clientFullName },
    emailMessaging: jobEmailMessaging,
    notActive,
    jobCurrentEngagement,
    status,
    operations,
    jobType,
    title,
    talentCount,
    client
  }
}: Props) => {
  const { showModal: showUnlinkJobOpportunityModal } = useModal(
    UnlinkJobOpportunityModal,
    { jobId: id }
  )

  const {
    showDeleteJobModal,
    showRestorePostponeModal,
    showLinkJobOportunityModal,
    showCloneJobModal,
    showJobForRehireModal,
    showRemoveJobAvailabilityRequestsRestrictionModal,
    showRestoreSendingAwayModal,
    showPostponeJobModal,
    showRefundDepositModal,
    showSendJobAwayModal,
    showRequestAvailabilityModal,
    allOperationsHidden
  } = useJobMoreActions({
    jobId: id,
    jobStatus: status,
    operations,
    clientFullName,
    jobType,
    jobTitle: title,
    sendEmailToClientOperation: jobEmailMessaging?.operations.sendEmailTo
  })

  const hasMultipleTalent = Boolean(talentCount && talentCount > 1)

  const isEmailCompanyVisible = !!notActive || hasMultipleTalent

  const clientDoesHaveStaSigned =
    client?.contracts && client?.contracts?.totalCount > 0

  const { allEngagementOperationsHidden } =
    useAllEngagementOperationsHidden(jobCurrentEngagement)

  return (
    <>
      <JobMoreActionsWrapper engagement={jobCurrentEngagement}>
        {showCommitmentChangeModal => (
          <MoreButton
            hidden={allOperationsHidden && allEngagementOperationsHidden}
            fullHeight
            disablePopper
            left='xsmall'
          >
            <Operation
              operation={operations?.linkJobOpportunity}
              render={disabled => (
                <Menu.Item
                  disabled={disabled}
                  onClick={showLinkJobOportunityModal}
                >
                  Link Opportunity
                </Menu.Item>
              )}
              inline={false}
            />

            <Operation
              operation={operations?.unlinkJobOpportunity}
              render={disabled => (
                <Menu.Item
                  disabled={disabled}
                  onClick={showUnlinkJobOpportunityModal}
                >
                  Unlink Opportunity
                </Menu.Item>
              )}
              inline={false}
            />

            {status &&
              [
                JobStatus.POSTPONED,
                JobStatus.PENDING_CLAIM,
                JobStatus.PENDING_ENGINEER,
                JobStatus.ACTIVE
              ].includes(status) && (
                <Operation
                  operation={operations?.updateJob}
                  render={disabled => (
                    <Menu.Item
                      disabled={disabled}
                      as={MenuLink}
                      href={getJobEditPath(decodeEntityId(id).id)}
                      data-testid='edit-job-menu-item'
                    >
                      Edit
                    </Menu.Item>
                  )}
                />
              )}

            <Operation
              operation={operations.removeJob}
              render={disabled => (
                <Menu.Item disabled={disabled} onClick={showDeleteJobModal}>
                  Delete
                </Menu.Item>
              )}
            />

            <Operation
              operation={
                status === JobStatus.POSTPONED
                  ? operations.repostponeJob
                  : operations.postponeJob
              }
              render={disabled => (
                <Menu.Item disabled={disabled} onClick={showPostponeJobModal}>
                  Postpone Job
                </Menu.Item>
              )}
            />

            <Operation
              operation={operations.resumePostponedJob}
              render={disabled => (
                <Menu.Item
                  disabled={disabled}
                  onClick={showRestorePostponeModal}
                >
                  Restore Postponed
                </Menu.Item>
              )}
            />

            <Operation
              operation={operations.sendJobAway}
              render={disabled => (
                <Menu.Item disabled={disabled} onClick={showSendJobAwayModal}>
                  Send Away Job
                </Menu.Item>
              )}
            />

            <Operation
              operation={operations.resumeSendingJobAway}
              render={disabled => (
                <Menu.Item
                  disabled={disabled}
                  onClick={showRestoreSendingAwayModal}
                >
                  Restore Sending Away
                </Menu.Item>
              )}
            />

            {isEmailCompanyVisible && jobEmailMessaging && (
              <SendJobEmailMenuItem
                jobEmailMessagingId={jobEmailMessaging.id}
                operation={jobEmailMessaging.operations.sendEmailTo}
              />
            )}

            {assignTalentLink?.url && (
              <WrapWithTooltip
                enableTooltip={!clientDoesHaveStaSigned}
                content='STA must be signed'
              >
                <Menu.Item
                  disabled={!clientDoesHaveStaSigned}
                  as={MenuLink}
                  href={assignTalentLink.url}
                  data-testid='assign-developer-menu-item'
                >
                  {assignTalentLink.text}
                </Menu.Item>
              </WrapWithTooltip>
            )}

            {renderEngagementActions({
              engagement: jobCurrentEngagement,
              showCommitmentChangeModal
            })}

            <Operation
              operation={operations?.cloneJob}
              render={disabled => (
                <Menu.Item disabled={disabled} onClick={showCloneJobModal}>
                  Clone
                </Menu.Item>
              )}
            />

            <Operation
              operation={operations?.cloneJobForRehire}
              render={disabled => (
                <Menu.Item disabled={disabled} onClick={showJobForRehireModal}>
                  Rehire
                </Menu.Item>
              )}
            />

            <Operation
              operation={operations?.createAvailabilityRequestForJob}
              render={disabled => (
                <Menu.Item
                  disabled={disabled}
                  onClick={showRequestAvailabilityModal}
                >
                  Request Availability
                </Menu.Item>
              )}
            />

            <Operation
              operation={operations?.refundJobDeposit}
              render={disabled => (
                <Menu.Item disabled={disabled} onClick={showRefundDepositModal}>
                  Refund Deposit
                </Menu.Item>
              )}
            />

            {casesUrl && (
              <Menu.Item
                as={MenuLink}
                href={casesUrl}
                data-testid='workflows-menu-item'
              >
                Workflows
              </Menu.Item>
            )}

            <Operation
              operation={operations?.createSourcingRequest}
              render={disabled => (
                <Menu.Item
                  disabled={disabled}
                  as={MenuLink}
                  href={getAddSourcingRequestPath(decodeEntityId(id).id)}
                  data-testid='add-sourcing-request-menu-item'
                >
                  Add Sourcing Request
                </Menu.Item>
              )}
            />

            <Operation
              operation={operations?.removeJobAvailabilityRequestsRestriction}
              render={disabled => (
                <Menu.Item
                  disabled={disabled}
                  onClick={showRemoveJobAvailabilityRequestsRestrictionModal}
                >
                  Remove Restrictions for Availability Requests
                </Menu.Item>
              )}
            />
          </MoreButton>
        )}
      </JobMoreActionsWrapper>
    </>
  )
}

export default JobMoreActions
