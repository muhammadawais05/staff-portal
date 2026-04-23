import { gql, useQuery } from '@staff-portal/data-layer-service'

import {
  GetBillingOverviewDetailsDocument,
  GetBillingOverviewDetailsQuery
} from './get-billing-overview-details.graphql.types'

export const GET_BILLING_OVERVIEW_DETAILS = gql`
  query GetBillingOverviewDetails {
    viewer {
      me {
        id
        manageesHaveSupervisedCompanies
      }
    }
  }
`

export const useGetBillingOverviewDetails = () => {
  const { data, ...rest } = useQuery<GetBillingOverviewDetailsQuery>(
    GetBillingOverviewDetailsDocument,
    {
      fetchPolicy: 'cache-first'
    }
  )

  return {
    manageesHaveSupervisedCompanies: Boolean(
      data?.viewer.me.manageesHaveSupervisedCompanies
    ),
    ...rest
  }
}
