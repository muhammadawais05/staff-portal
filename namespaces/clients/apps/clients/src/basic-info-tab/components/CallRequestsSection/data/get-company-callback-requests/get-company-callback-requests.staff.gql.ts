import { gql, useQuery } from '@staff-portal/data-layer-service'
import { CALL_REQUEST_FRAGMENT } from '@staff-portal/clients-call-requests'

import { GetCompanyCallbackRequestsDocument } from './get-company-callback-requests.staff.gql.types'

export default gql`
  query GetCompanyCallbackRequests($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        callbackRequests {
          nodes {
            ...CallRequestFragment
          }
        }
      }
    }
  }

  ${CALL_REQUEST_FRAGMENT}
`

export const useGetCompanyCallbackRequests = (clientId: string) => {
  const { data, loading, initialLoading } = useQuery(
    GetCompanyCallbackRequestsDocument,
    {
      variables: { clientId }
    }
  )

  return {
    callbackRequests: data?.node?.callbackRequests?.nodes,
    initialLoading,
    loading
  }
}
