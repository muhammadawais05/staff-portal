import {
  gql,
  useQuery,
  filterUnauthorizedErrors,
  isNetworkLoading
} from '@staff-portal/data-layer-service'
import { TALENT_PROFILE_JOBS_ENGAGEMENT_FRAGMENT } from '@staff-portal/engagements'

import { GetTalentProfileJobsDocument } from './get-talent-profile-jobs.staff.gql.types'
import { JobsFilterType } from '../../../../enums'
import { getEngagementsParameters } from '../../utils'

export const GET_TALENT_PROFILE_JOBS: typeof GetTalentProfileJobsDocument = gql`
  query GetTalentProfileJobs(
    $talentId: ID!
    $engagementFilter: TalentEngagementFilter
    $engagementOrder: TalentEngagementOrder
  ) {
    node(id: $talentId) {
      ...TalentProfileJobsFragment
    }
  }

  fragment TalentProfileJobsFragment on Talent {
    id
    type
    engagements(filter: $engagementFilter, order: $engagementOrder) {
      nodes {
        extraHoursEnabled
        ...TalentProfileJobsEngagementFragment
      }
    }
  }

  ${TALENT_PROFILE_JOBS_ENGAGEMENT_FRAGMENT}
`

export const useGetTalentProfileJobs = ({
  talentId,
  jobsFilter,
  skip
}: {
  talentId: string
  jobsFilter?: JobsFilterType[]
  skip?: boolean
}) => {
  const { filter, order } = getEngagementsParameters(jobsFilter)

  const { data, loading, networkStatus, ...restOptions } = useQuery(
    GET_TALENT_PROFILE_JOBS,
    {
      fetchPolicy: 'cache-first',
      variables: { talentId, engagementOrder: order, engagementFilter: filter },
      throwOnError: true,
      errorFilters: [filterUnauthorizedErrors],
      skip
    }
  )

  return {
    data: data?.node,
    loading,
    networkLoading: isNetworkLoading({ data, loading, networkStatus }),
    ...restOptions
  }
}
