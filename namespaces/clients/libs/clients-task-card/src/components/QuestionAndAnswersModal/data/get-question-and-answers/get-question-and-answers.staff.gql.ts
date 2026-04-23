import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetQuestionAndAnswersDocument } from './get-question-and-answers.staff.gql.types'

export const GET_QUESTION_AND_ANSWERS: typeof GetQuestionAndAnswersDocument = gql`
  query GetQuestionAndAnswers($companyId: ID!) {
    node(id: $companyId) {
      ... on Client {
        id
        remoteQuizUrl
        referralPage {
          text
          url
        }
        quizItems {
          nodes {
            readableValue
            questionLabel
          }
        }
      }
    }
  }
`

export const useGetQuestionAndAnswers = (companyId: string) => {
  const { data, loading } = useQuery(GET_QUESTION_AND_ANSWERS, {
    throwOnError: true,
    variables: { companyId }
  })

  return {
    loading,
    data: data?.node
  }
}
