import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useGetNotificationQuery } from './getNotification.graphql.types'

export const useGetNotification = (nodeId: string) =>
  useGetNode(useGetNotificationQuery)({ nodeId })
