import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useGetTransfersQuery } from './getTransfers.graphql.types'
import { useGetTransferQuery } from './getTransfer.graphql.types'

export const useGetTransfers = (nodeId: string) =>
  useGetNode(useGetTransfersQuery)({ nodeId })

export const useGetTransfer = (transferNodeId: string) =>
  useGetNode(useGetTransferQuery)({ transferNodeId })
