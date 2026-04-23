import React, { ReactNode } from 'react'
import { SendEmailActionItem } from '@staff-portal/communication-send-email'
import { ContentWrapper } from '@staff-portal/page-wrapper'

import { getRoleOrClientIdForEntity } from '../../utils'

export interface Props {
  entityType?: string
  entityId?: string
  children?: ReactNode
}

const getPageActions = (entityType?: string, entityId?: string) => {
  const roleOrClientId = getRoleOrClientIdForEntity(entityType, entityId)

  if (!roleOrClientId) {
    return null
  }

  return (
    <SendEmailActionItem
      nodeId={roleOrClientId}
      skipOperationCheck
      componentType='button'
      size='small'
    />
  )
}

const EmailMessageContentWrapper = ({
  entityType,
  entityId,
  children
}: Props) => {
  return (
    <ContentWrapper
      title='Email Message'
      actions={getPageActions(entityType, entityId)}
    >
      {children}
    </ContentWrapper>
  )
}

export default EmailMessageContentWrapper
