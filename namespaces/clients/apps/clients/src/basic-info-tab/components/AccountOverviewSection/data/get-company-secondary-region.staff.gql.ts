import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import { GetCompanySecondaryRegionDocument } from './get-company-secondary-region.staff.gql.types'

export default gql`
  query GetCompanySecondaryRegion($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        secondaryRegion {
          id
        }
      }
    }
  }
`

export const useGetCompanySecondaryRegion = (clientId: string) => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetCompanySecondaryRegionDocument,
    {
      variables: { clientId }
    }
  )

  return () => ({
    request,
    loading,
    error,
    data: data?.node?.secondaryRegion?.id || '',
    called
  })
}
