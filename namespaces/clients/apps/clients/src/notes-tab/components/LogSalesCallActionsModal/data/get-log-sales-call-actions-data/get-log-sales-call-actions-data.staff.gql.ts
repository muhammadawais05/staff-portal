import { gql, useGetNode } from '@staff-portal/data-layer-service'

import { GetLogSalesCallActionsDataDocument } from './get-log-sales-call-actions-data.staff.gql.types'

export default gql`
  query GetLogSalesCallActionsData($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        fullName
        ofacProhibited
        ofacStatus
        pausedAt
        status
        visualComplianceStatus
      }
    }
  }
`

export const useGetLogSalesCallActionsData = (clientId: string) =>
  useGetNode(GetLogSalesCallActionsDataDocument)({ clientId })
