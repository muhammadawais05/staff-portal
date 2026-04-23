import { gql, useGetNode } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import { GetTransferRequestDocument } from './get-transfer-request.staff.gql.types'

export default gql`
  query GetTransferRequest($clientId: ID!) {
    node(id: $clientId) {
      ...TransferRequestFragment
    }
  }

  fragment TransferRequestFragment on Client {
    id
    transferRequests(filter: { status: PENDING }) {
      nodes {
        ...ClientTransferRoleRequestFragment
      }
      totalCount
    }
  }

  fragment ClientTransferRoleRequestFragment on ClientTransferRoleRequest {
    id
    status
    relationship
    comment
    requester {
      id
      fullName
    }
    requestedTransfer {
      id
      fullName
    }
    operations {
      confirmClientTransferRoleRequest {
        ...OperationFragment
      }
      rejectClientTransferRoleRequest {
        ...OperationFragment
      }
    }
  }
  ${OPERATION_FRAGMENT}
`

export const useGetTransferRequest = (clientId: string) => {
  const { data, ...rest } = useGetNode(GetTransferRequestDocument)(
    { clientId },
    { throwOnError: true }
  )

  return {
    transferRequests: data?.transferRequests?.nodes || [],
    ...rest
  }
}
