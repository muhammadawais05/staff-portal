import { gql, useLazyQuery, useGetNode } from '@staff-portal/data-layer-service'

import { CALL_REQUEST_FRAGMENT } from '../call-request-fragment'
import { GetCallRequestDocument } from './get-call-request.staff.gql.types'
import { OVERLAPPING_MEETINGS_FRAGMENT } from '../overlapping-meetings-fragment'

export default gql`
  query GetCallRequest($id: ID!) {
    node(id: $id) {
      ...CallRequestFragment
      ...OverlappingMeetingsFragment
    }
  }

  ${CALL_REQUEST_FRAGMENT}
  ${OVERLAPPING_MEETINGS_FRAGMENT}
`

export const useGetCallRequest = (id: string) =>
  useGetNode(GetCallRequestDocument)({ id })

export const useGetLazyCallRequest = (id: string) =>
  useLazyQuery(GetCallRequestDocument, { variables: { id } })
