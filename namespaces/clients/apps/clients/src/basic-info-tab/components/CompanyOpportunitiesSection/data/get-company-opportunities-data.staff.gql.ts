import { gql, useQuery } from '@staff-portal/data-layer-service'
import { URL_WITH_MESSAGES_FRAGMENT } from '@staff-portal/facilities'
import { OPPORTUNITY_FRAGMENT } from '@staff-portal/opportunities'

import { GetOpportunitiesDocument } from './get-company-opportunities-data.staff.gql.types'
import { sortByRecentUpdateDate } from '../utils/utils'

export const GET_OPPORTUNITIES_CLIENT: typeof GetOpportunitiesDocument = gql`
  query GetOpportunities($clientId: ID!, $showSubsidiary: Boolean!) {
    staffNode(id: $clientId) {
      ...OpportunitiesFragment
    }
  }

  fragment OpportunitiesFragment on Client {
    id
    businessType: businessTypeV2
    children {
      totalCount
    }
    createOpportunityUrl {
      ...UrlWithMessagesFragment
    }
    opportunities(filter: { showSubsidiary: $showSubsidiary }) {
      nodes {
        ...OpportunityFragment
      }
    }
  }

  ${OPPORTUNITY_FRAGMENT}
  ${URL_WITH_MESSAGES_FRAGMENT}
`

export const useGetCompanyOpportunities = (
  clientId: string,
  showSubsidiary: boolean
) => {
  const { data, loading, error } = useQuery(GET_OPPORTUNITIES_CLIENT, {
    variables: { clientId, showSubsidiary }
  })

  return {
    client: data?.staffNode,
    opportunities: [...(data?.staffNode?.opportunities?.nodes || [])].sort(
      sortByRecentUpdateDate
    ),
    loading,
    error
  }
}
