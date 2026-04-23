import React from 'react'
import {
  TypedMessage,
  useMessageListener
} from '@toptal/staff-portal-message-bus'
import { OFAC_UPDATED } from '@staff-portal/ofac-compliance'

import StatusMessagesNotifications from '../StatusMessagesNotifications'
import { useGetNodeStatusMessages } from './data/node-status-messages/get-node-status-messages.staff.gql'

export type Props = {
  id: string
  refetchOnMessages?: TypedMessage[]
}

const NodeStatusMessageNotifications = ({
  id,
  refetchOnMessages = []
}: Props) => {
  const { statusMessages, loading, refetch } = useGetNodeStatusMessages(id)

  useMessageListener([...refetchOnMessages, OFAC_UPDATED], () => refetch())

  if (!statusMessages || loading) {
    return null
  }

  return <StatusMessagesNotifications statusMessages={statusMessages} />
}

export default NodeStatusMessageNotifications
