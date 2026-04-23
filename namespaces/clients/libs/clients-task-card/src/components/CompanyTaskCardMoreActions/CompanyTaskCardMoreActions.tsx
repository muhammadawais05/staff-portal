import React from 'react'
import { Menu } from '@toptal/picasso'
import { MenuLink } from '@staff-portal/ui'
import { TaskCardLayout } from '@staff-portal/tasks'
import { useModal } from '@staff-portal/modals-service'
import { isOperationDisabled, Operation } from '@staff-portal/operations'
import { InviteToLoginModalItem } from '@staff-portal/client-representatives'
import {
  useMarkAsBadLeadModal,
  useDeleteApplicationModal,
  PauseClientItem,
  ResumeCompanyItem,
  RepauseCompanyItem,
  BlackFlagClientItem
} from '@staff-portal/clients'

import { TaskCardCompanyFragment } from '../../data/company-task-card-fragment/company-task-card-fragment.staff.gql.types'
import QuestionAndAnswersModal from '../QuestionAndAnswersModal'

export interface Props {
  company: TaskCardCompanyFragment
}

const CompanyTaskCardMoreActions = ({
  company: {
    id: companyId,
    fullName,
    operations: {
      markClientAsBadLead: markClientAsBadLeadOperation,
      resumeClient: resumeClientOperation,
      pauseClient: pauseClientOperation,
      repauseClient: repauseClientOperation,
      updateProfileClient: updateProfileClientOperation,
      blackFlagClient: blackFlagClientOperation,
      rejectClient: rejectClientOperation
    },
    updateProfileUrl,
    contact
  }
}: Props) => {
  const { showModal: showQuestionAndAnswersModal } = useModal(
    QuestionAndAnswersModal,
    {
      companyId
    }
  )

  const { showModal: showMarkAsBadLeadModal } = useMarkAsBadLeadModal({
    clientId: companyId
  })

  const { showModal: showDeleteApplicationModal } = useDeleteApplicationModal({
    clientId: companyId
  })

  return (
    <TaskCardLayout.MoreButton>
      <Menu.Item onClick={showQuestionAndAnswersModal}>Q&amp;A</Menu.Item>

      <ResumeCompanyItem
        componentType='menu-item'
        companyId={companyId}
        operation={resumeClientOperation}
      />

      <RepauseCompanyItem
        componentType='menu-item'
        companyId={companyId}
        operation={repauseClientOperation}
      />

      <Operation operation={markClientAsBadLeadOperation}>
        <Menu.Item
          titleCase={false}
          disabled={isOperationDisabled(markClientAsBadLeadOperation)}
          onClick={showMarkAsBadLeadModal}
        >
          Mark as Bad Lead
        </Menu.Item>
      </Operation>

      {updateProfileUrl && (
        <Operation operation={updateProfileClientOperation}>
          <Menu.Item
            as={MenuLink}
            href={updateProfileUrl}
            target='_blank'
            rel='noopener'
            disabled={isOperationDisabled(updateProfileClientOperation)}
          >
            Edit Profile
          </Menu.Item>
        </Operation>
      )}

      {contact && (
        <InviteToLoginModalItem
          contact={contact}
          operation={contact?.operations?.inviteToLoginCompanyRepresentative}
        />
      )}

      <BlackFlagClientItem
        clientId={companyId}
        companyName={fullName}
        operation={blackFlagClientOperation}
      />

      <PauseClientItem clientId={companyId} operation={pauseClientOperation} />

      <Operation operation={rejectClientOperation}>
        <Menu.Item
          disabled={isOperationDisabled(rejectClientOperation)}
          onClick={showDeleteApplicationModal}
        >
          Delete Application
        </Menu.Item>
      </Operation>
    </TaskCardLayout.MoreButton>
  )
}

export default CompanyTaskCardMoreActions
