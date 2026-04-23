import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import { CHECK_CLIENT_COMPLIANCE_FRAGMENT } from '../../../../data'
import { GetCheckClientComplianceDataDocument } from './get-check-compliance-data.staff.gql.types'

export default gql`
  query GetCheckClientComplianceData($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        ...CheckComplianceFragment
      }
    }
  }

  ${CHECK_CLIENT_COMPLIANCE_FRAGMENT}
`

export const useGetCheckClientComplianceData = (clientId: string) => {
  const [fetch, { data, loading }] = useLazyQuery(
    GetCheckClientComplianceDataDocument,
    {
      variables: {
        clientId
      }
    }
  )

  return { fetch, data, loading }
}
