import { gql, useQuery } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import {
  GetCheckComplianceStatusDocument,
  GetCheckComplianceStatusQuery
} from './get-check-compliance-status.staff.gql.types'

export const GET_CHECK_COMPLIANCE_STATUS: typeof GetCheckComplianceStatusDocument = gql`
  query GetCheckComplianceStatus($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        ofacProhibited
        visualComplianceStatus
        operations {
          checkClientCompliance {
            ...OperationFragment
          }
        }
      }
    }
  }

  ${OPERATION_FRAGMENT}
`

export const useGetCheckComplianceStatus = ({
  pollInterval,
  clientId,
  skip,
  onError,
  onCompleted
}: {
  pollInterval: number
  clientId: string
  skip: boolean
  onError: () => void
  onCompleted: (data: GetCheckComplianceStatusQuery) => void
}) =>
  useQuery(GET_CHECK_COMPLIANCE_STATUS, {
    variables: {
      clientId
    },
    skip,
    pollInterval,
    // Fix for "Using useQuery with pollInterval triggers onCompleted only once" https://github.com/apollographql/apollo-client/issues/5531
    notifyOnNetworkStatusChange: true,
    onError,
    onCompleted
  })
