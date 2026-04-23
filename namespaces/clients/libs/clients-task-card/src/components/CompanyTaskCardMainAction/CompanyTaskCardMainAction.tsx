import React, { useMemo } from 'react'
import { ContactType } from '@staff-portal/graphql/staff'
import {
  ContactCompanyPayload,
  SendEmailActionItem
} from '@staff-portal/communication-send-email'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { REFETCH_TASKS } from '@staff-portal/tasks'

import { TaskCardCompanyFragment } from '../../data/company-task-card-fragment'
import { ContactClientButton } from '../ContactClientButton'

export interface Props {
  company: TaskCardCompanyFragment
  preselectedEmailTemplateId?: string
  playbookTemplateId?: string
}

const CompanyTaskCardMainAction = ({
  company,
  playbookTemplateId,
  preselectedEmailTemplateId
}: Props) => {
  const emitMessage = useMessageEmitter()

  const hasOnlyEmail = useMemo(
    () =>
      company.contact?.contacts.nodes.every(
        contact => contact.type === ContactType.EMAIL
      ),
    [company.contact?.contacts.nodes]
  )

  const handleCompleted = (data?: ContactCompanyPayload) => {
    if (data?.refetchTasks) {
      emitMessage(REFETCH_TASKS)
    }
  }

  return hasOnlyEmail ? (
    <SendEmailActionItem
      nodeId={company.id}
      preselectedEmailTemplateId={preselectedEmailTemplateId}
      skipOperationCheck
      componentType='button'
      size='small'
      onCompleted={handleCompleted}
    />
  ) : (
    <ContactClientButton
      size='small'
      clientId={company.id}
      playbookTemplateId={playbookTemplateId}
      preselectedEmailTemplateId={preselectedEmailTemplateId}
      onCompleted={handleCompleted}
    >
      Contact
    </ContactClientButton>
  )
}

export default CompanyTaskCardMainAction
