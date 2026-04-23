import { gql, useGetNode } from '@staff-portal/data-layer-service'

import { GetSourcingRequestDataDocument } from './get-sourcing-request-data.staff.gql.types'
import { SOURCING_REQUEST_FOR_EDIT_FRAGMENT } from '../sourcing-request-for-edit-fragment'

export const GET_SOURCING_REQUEST_DATA = gql`
  query GetSourcingRequestData($sourcingRequestId: ID!) {
    node(id: $sourcingRequestId) {
      ... on SourcingRequest {
        ...SourcingRequestForEditFragment
      }
    }
  }

  ${SOURCING_REQUEST_FOR_EDIT_FRAGMENT}
`

export const useGetSourcingRequestData = (sourcingRequestId: string) =>
  useGetNode(GetSourcingRequestDataDocument)(
    { sourcingRequestId },
    { throwOnError: true }
  )
