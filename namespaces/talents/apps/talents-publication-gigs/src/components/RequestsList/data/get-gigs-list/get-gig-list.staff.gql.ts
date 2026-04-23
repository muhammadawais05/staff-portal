import { gql, useQuery } from '@staff-portal/data-layer-service'
import { GIG_FRAGMENT, GigFragment } from '@staff-portal/talents-gigs'

import {
  GetGigsListDocument,
  GetGigsListQueryVariables
} from './get-gig-list.staff.gql.types'

export const GET_GIG_LIST = gql`
  query GetGigsList($pagination: OffsetPagination, $filter: GigFilter) {
    gigs(filter: $filter, pagination: $pagination) {
      nodes {
        ...GigFragment
      }
      totalCount
    }
  }

  ${GIG_FRAGMENT}
`

export const useGetGigList = (
  variables?: GetGigsListQueryVariables,
  skip?: boolean
) => {
  const { data, error, ...restOptions } = useQuery(GetGigsListDocument, {
    variables,
    skip
  })

  const gigs = data && {
    nodes: data?.gigs.nodes.filter(gig => !!gig) as GigFragment[],
    totalCount: data?.gigs.totalCount
  }

  if (error && !gigs) {
    throw error
  }

  return { data: gigs, error, ...restOptions }
}
