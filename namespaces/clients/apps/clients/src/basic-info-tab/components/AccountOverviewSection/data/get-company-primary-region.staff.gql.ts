import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import { GetCompanyPrimaryRegionDocument } from './get-company-primary-region.staff.gql.types'

export default gql`
  query GetCompanyPrimaryRegion($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        primaryRegion {
          id
        }
      }
    }
  }
`

export const useGetCompanyPrimaryRegion = (clientId: string) => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetCompanyPrimaryRegionDocument,
    {
      variables: { clientId }
    }
  )

  return () => ({
    request,
    loading,
    error,
    data: data?.node?.primaryRegion?.id || '',
    called
  })
}
