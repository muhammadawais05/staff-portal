import React, { ReactNode } from 'react'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { SendClientOrRoleEmailItem } from '@staff-portal/communication-send-email'

import { getRoleOrClientIdForEntity } from '../../utils'

export interface Props {
  itemsCount?: number
  entityType?: string
  entityId?: string
  children?: ReactNode
}

const EmailMessageListContentWrapper = ({
  itemsCount,
  entityType,
  entityId,
  children
}: Props) => {
  const roleOrClientId = getRoleOrClientIdForEntity(entityType, entityId)

  return (
    <ContentWrapper
      title='Emails'
      itemsCount={itemsCount}
      actions={
        roleOrClientId && (
          <SendClientOrRoleEmailItem
            roleOrClientId={roleOrClientId}
            entityType={entityType || ''}
          />
        )
      }
    >
      {children}
    </ContentWrapper>
  )
}

export default EmailMessageListContentWrapper
