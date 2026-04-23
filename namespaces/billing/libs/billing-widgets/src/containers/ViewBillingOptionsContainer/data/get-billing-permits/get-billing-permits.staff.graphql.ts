import { gql } from '@staff-portal/data-layer-service'

import { useGetBillingPermitsQuery } from './get-billing-permits.staff.graphql.types'

export default gql`
  query GetBillingPermits {
    viewer {
      permits {
        canViewBillingOptions
      }
    }
  }
`

export const useGetBillingPermits = () => {
  const { data, ...rest } = useGetBillingPermitsQuery()

  return {
    permits: data?.viewer.permits,
    ...rest
  }
}
