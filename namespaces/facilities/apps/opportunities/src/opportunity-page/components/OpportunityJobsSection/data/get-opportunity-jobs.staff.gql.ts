import { gql, useQuery } from '@staff-portal/data-layer-service'

import { OPPORTUNITY_JOBS_FRAGMENT } from './opportunity-jobs-fragment.staff.gql'
import { GetOpportunityJobsDocument } from './get-opportunity-jobs.staff.gql.types'
import { sortByCreatedAtDate } from '../utils'

export const GET_OPPORTUNITY_JOBS: typeof GetOpportunityJobsDocument = gql`
  query GetOpportunityJobs($opportunityId: ID!) {
    node(id: $opportunityId) {
      ...OpportunityJobsFragment
    }
  }

  ${OPPORTUNITY_JOBS_FRAGMENT}
`

export const useGetOpportunityJobs = (opportunityId: string) => {
  const { data, loading, error } = useQuery(GET_OPPORTUNITY_JOBS, {
    variables: { opportunityId }
  })

  return {
    opportunity: data?.node,
    jobs: [...(data?.node?.jobs?.nodes || [])].sort(sortByCreatedAtDate),
    loading,
    error
  }
}
