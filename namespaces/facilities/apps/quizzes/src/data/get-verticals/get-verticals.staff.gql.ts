import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetQuizzesVerticalsDocument } from './get-verticals.staff.gql.types'

export const GET_QUIZZES_VERTICALS: typeof GetQuizzesVerticalsDocument = gql`
  query GetQuizzesVerticals {
    verticals(filter: { includeDisabled: true }) {
      nodes {
        id
        name
        talentType
        hasTalentQuizQuestions
      }
    }
  }
`

const useGetVerticals = () => {
  const { data, error, loading } = useQuery(GET_QUIZZES_VERTICALS, {
    fetchPolicy: 'cache-first'
  })

  return {
    data: data?.verticals?.nodes || [],
    loading,
    error
  }
}

export { useGetVerticals }
