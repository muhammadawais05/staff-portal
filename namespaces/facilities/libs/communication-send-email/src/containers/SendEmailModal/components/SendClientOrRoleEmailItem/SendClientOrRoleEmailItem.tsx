import React from 'react'
import { useQuery } from '@staff-portal/data-layer-service'
import { NodeType } from '@staff-portal/graphql'

import {
  GetSendEmailOperationDocument,
  GetSendEmailOperationQuery,
  GetSendEmailOperationQueryVariables
} from './data/get-send-email-operation.staff.gql.types'
import SendEmailActionItem from '../SendEmailActionItem'

type Props = {
  roleOrClientId: string
  entityType: string
}

const SendClientOrRoleEmailItem = ({ roleOrClientId, entityType }: Props) => {
  const { data, loading } = useQuery<
    GetSendEmailOperationQuery,
    GetSendEmailOperationQueryVariables
  >(GetSendEmailOperationDocument, {
    variables: { nodeId: roleOrClientId },
    throwOnError: true
  })

  if (!data || !data.staffNode?.emailMessaging?.operations.sendEmailTo) {
    return null
  }

  return (
    <SendEmailActionItem
      componentType='button'
      loading={loading}
      operation={data.staffNode?.emailMessaging?.operations.sendEmailTo}
      nodeId={roleOrClientId}
      operationVariables={{
        nodeId: data.staffNode?.emailMessaging?.id || '',
        nodeType:
          entityType === 'companies' || entityType === 'clients'
            ? NodeType.EMAIL_MESSAGING_CLIENT
            : NodeType.EMAIL_MESSAGING_ROLE,
        operationName: 'sendEmailTo'
      }}
      skipOperationCheck={
        !data.staffNode?.emailMessaging?.operations.sendEmailTo
      }
      data-testid='send-client-or-role-email-item'
    />
  )
}

export default SendClientOrRoleEmailItem
