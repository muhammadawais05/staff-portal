import { Menu } from '@toptal/picasso'
import React, { useState } from 'react'
import { MenuLink } from '@staff-portal/ui'
import { isOperationHidden } from '@staff-portal/operations'
import { TaskCardLayout } from '@staff-portal/tasks'
import { SendEngagementTalentEmailItem } from '@staff-portal/engagements'
import { useDeleteJobModal } from '@staff-portal/jobs'

import { TaskJob } from '../../types'

export interface Props {
  job: TaskJob
}

const JobTaskCardMoreActions = ({
  job: { id, status, searchCandidatesUrl, operations, currentEngagement }
}: Props) => {
  const [modalIsOpening, setModalIsOpening] = useState(false)
  const {
    renderLazyOperation: renderDeleteJobLazyOperation,
    renderModal: renderDeleteJobModal
  } = useDeleteJobModal({
    jobId: id,
    jobStatus: status,
    initialOperation: operations?.removeJob,
    onLazyOperationSettled: () => setModalIsOpening(false)
  })

  const isContactTalentButtonVisible =
    Boolean(currentEngagement?.nodes.length) &&
    currentEngagement?.nodes?.[0].talent?.id

  const isMoreButtonHidden =
    !searchCandidatesUrl &&
    !isContactTalentButtonVisible &&
    isOperationHidden(operations?.removeJob)

  return (
    <>
      <TaskCardLayout.MoreButton
        hidden={isMoreButtonHidden}
        loading={modalIsOpening}
      >
        {searchCandidatesUrl && (
          <Menu.Item
            as={MenuLink}
            href={searchCandidatesUrl}
            target='_blank'
            rel='noopener'
          >
            Search Candidates
          </Menu.Item>
        )}

        {isContactTalentButtonVisible && currentEngagement?.nodes?.[0]?.id && (
          <SendEngagementTalentEmailItem
            componentType='menu-item'
            emailMessagingEngagementTalentId={
              currentEngagement.nodes[0].talentEmailMessaging?.id ?? ''
            }
            operation={
              currentEngagement.nodes[0].talentEmailMessaging?.operations
                .sendEmailTo
            }
          />
        )}

        {renderDeleteJobLazyOperation(({ disabled, checkOperation }) => (
          <Menu.Item
            disabled={disabled}
            onClick={() => {
              checkOperation()
              setModalIsOpening(true)
            }}
          >
            Delete
          </Menu.Item>
        ))}
      </TaskCardLayout.MoreButton>

      {renderDeleteJobModal()}
    </>
  )
}

export default JobTaskCardMoreActions
