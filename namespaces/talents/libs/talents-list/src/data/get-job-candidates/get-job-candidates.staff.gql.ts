import { useMemo } from 'react'
import { gql, useQuery, ABORT_KEY } from '@staff-portal/data-layer-service'
import { QueryParams } from '@staff-portal/query-params-state'
import { UserVerticalFragment } from '@staff-portal/verticals'

import { TALENT_LIST_ITEMS_ABORT_KEY } from '../../constants'
import { GetJobCandidatesDocument } from './get-job-candidates.staff.gql.types'
import { JOB_CANDIDATE_TALENT_LIST_ITEM_FRAGMENT } from '../job-candidate-talent-list-item-fragment/job-candidate-talent-list-item-fragment.staff.gql'
import { createGqlFilterVariables } from '../../services'

export default gql`
  query GetJobCandidates(
    $jobId: ID!
    $filter: JobTalentFilter!
    $pagination: OffsetPagination!
    $order: JobCandidateOrder!
  ) {
    node(id: $jobId) {
      ... on Job {
        id
        candidates(filter: $filter, pagination: $pagination, order: $order) {
          edges {
            node {
              id
            }
            ...JobCandidateTalentListItemFragment
          }
          totalCount
        }
      }
    }
  }

  ${JOB_CANDIDATE_TALENT_LIST_ITEM_FRAGMENT}
`

export const useGetJobCandidates = ({
  filterValues,
  page,
  verticals,
  skip
}: {
  filterValues: QueryParams
  page: number
  verticals?: UserVerticalFragment[]
  skip?: boolean
}) => {
  const variables = createGqlFilterVariables(filterValues, {
    verticals,
    page
  })

  const { data, refetch, ...restOptions } = useQuery(GetJobCandidatesDocument, {
    variables,
    throwOnError: true,
    context: { [ABORT_KEY]: TALENT_LIST_ITEMS_ABORT_KEY },
    skip
  })

  const talentData = useMemo(() => {
    if (!data?.node?.candidates) {
      return {}
    }

    const { candidates } = data.node
    const { edges, totalCount } = candidates
    const items = edges.map(({ node: { id: talentId }, ...jobCandidate }) => ({
      talentId,
      jobCandidate
    }))

    return { talents: items, totalCount }
  }, [data])

  return {
    data: talentData,
    refetch: () => refetch(variables),
    ...restOptions
  }
}
