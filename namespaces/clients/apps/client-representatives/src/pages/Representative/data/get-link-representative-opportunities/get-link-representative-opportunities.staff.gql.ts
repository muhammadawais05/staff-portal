import { gql, useGetNode } from '@staff-portal/data-layer-service'

import { GetLinkRepresentativeOpportunitiesDocument } from './get-link-representative-opportunities.staff.gql.types'

export const GET_LINK_REPRESENTATIVE_OPPORTUNITIES = gql`
  query GetLinkRepresentativeOpportunities($representativeId: ID!) {
    node(id: $representativeId) {
      ... on CompanyRepresentative {
        opportunities {
          nodes {
            id
            name
          }
        }
        client {
          opportunities {
            nodes {
              id
              name
            }
          }
        }
      }
    }
  }
`

export const useGetLinkRepresentativeOpportunities = (
  representativeId: string
) => {
  const { data, ...rest } = useGetNode(
    GetLinkRepresentativeOpportunitiesDocument
  )({ representativeId })

  const clientOpportunities = data?.client?.opportunities?.nodes
  const alreadyAssignedOpportunities = data?.opportunities?.nodes

  const unassignedOpportunities = clientOpportunities?.filter(
    opportunity =>
      alreadyAssignedOpportunities?.findIndex(
        assigned => opportunity.id === assigned.id
      ) === -1
  )

  return {
    ...rest,
    opportunities:
      unassignedOpportunities?.map(({ name, id }) => ({
        text: name as string,
        value: id as string
      })) || []
  }
}
