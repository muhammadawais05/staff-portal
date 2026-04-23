import { gql, useQuery } from '@staff-portal/data-layer-service'

import {
  GetPossibleSourcersDocument,
  GetPossibleSourcersQuery
} from './get-possible-sourcers.staff.gql.types'

export const GET_POSSIBLE_SOURCERS: typeof GetPossibleSourcersDocument = gql`
  query GetPossibleSourcers($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        sourcer {
          ... on Role {
            id
            __typename
          }
        }
        sourcers(order: { direction: ASC, field: FULL_NAME }) {
          nodes {
            id
            fullName
          }
        }
      }
    }
  }
`

export const useGetPossibleSourcers = ({
  talentId,
  onError,
  onCompleted
}: {
  talentId: string
  onError: () => void
  onCompleted: (data: GetPossibleSourcersQuery) => void
}) => {
  const { data, loading } = useQuery(GET_POSSIBLE_SOURCERS, {
    onError,
    onCompleted,
    variables: { talentId }
  })

  return {
    talentHasSourcer: !!data?.node?.sourcer,
    possibleSourcers: data?.node?.sourcers?.nodes,
    loading
  }
}
