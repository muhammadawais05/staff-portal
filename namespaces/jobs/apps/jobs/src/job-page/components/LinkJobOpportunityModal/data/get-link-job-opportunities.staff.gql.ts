import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetLinkJobOpportunitiesDocument } from './get-link-job-opportunities.staff.gql.types'

export const GET_LINK_JOB_OPPORTUNITIES: typeof GetLinkJobOpportunitiesDocument = gql`
  query GetLinkJobOpportunities($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        client {
          opportunities(
            filter: { showSubsidiary: false, scope: JOB_LINKABLE }
          ) {
            nodes {
              id
              name
            }
          }
        }
        operations {
          linkJobOpportunity {
            callable
            messages
          }
        }
      }
    }
  }
`

export const useGetLinkJobOpportunities = (jobId: string) => {
  const { data } = useQuery(GET_LINK_JOB_OPPORTUNITIES, {
    variables: { jobId }
  })

  return {
    opportunities:
      data?.node?.client.opportunities?.nodes.map(({ name, id }) => ({
        text: name as string,
        value: id as string
      })) || []
  }
}
