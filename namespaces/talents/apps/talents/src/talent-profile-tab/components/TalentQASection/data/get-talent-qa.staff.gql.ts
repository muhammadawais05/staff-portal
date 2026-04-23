import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetTalentQaDocument } from './get-talent-qa.staff.gql.types'

export const GET_TALENT_QA: typeof GetTalentQaDocument = gql`
  query GetTalentQA($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        statusV2
        quizItems {
          nodes {
            questionLabel
            readableValue
          }
        }
      }
    }
  }
`

export const useGetTalentQA = (
  talentId: string,
  { onError }: { onError: () => void }
) => {
  const { data, loading, refetch } = useQuery(GET_TALENT_QA, {
    onError,
    variables: { talentId },
    fetchPolicy: 'cache-first'
  })

  return {
    loading,
    data: data?.node?.quizItems?.nodes,
    status: data?.node?.statusV2,
    refetch
  }
}
