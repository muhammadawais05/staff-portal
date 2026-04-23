import { QueryP2pRequestArgs } from '@staff-portal/graphql/staff'
import { gql, useQuery } from '@staff-portal/data-layer-service'
import { PublicationGigType } from '@staff-portal/talents-gigs'

import { GetRequestForCandidateListDocument } from './get-request-for-candidate-list.staff.gql.types'

export const GET_REQUEST_FOR_CANDIDATE_LIST: typeof GetRequestForCandidateListDocument = gql`
  query GetRequestForCandidateList($id: ID!) {
    node(id: $id) {
      ...on PublicationGig {
        id
        description
        skills
        status
        title
      }
    }
  }
`

export const useGetRequestForCandidateList = (
  variables: QueryP2pRequestArgs,
  skip?: boolean
) => {
  const { data, error, ...restOptions } = useQuery(
    GET_REQUEST_FOR_CANDIDATE_LIST,
    {
      variables,
      skip
    }
  )

  const request = data?.node as PublicationGigType

  if (error && !request) {
    throw error
  }

  return { request, error, ...restOptions }
}
