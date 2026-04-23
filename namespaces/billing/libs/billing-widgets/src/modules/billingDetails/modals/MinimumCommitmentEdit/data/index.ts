import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useGetMinimumCommitmentEditQuery } from './getMinimumCommitmentEdit.graphql.types'

export const useGetMinimumCommitmentEdit = (nodeId: string) =>
  useGetNode(useGetMinimumCommitmentEditQuery)(
    { nodeId },
    { fetchPolicy: 'no-cache' }
  )
export { useSetUpdateClientCommitmentMutation } from './setUpdateClientCommitment.graphql.types'
