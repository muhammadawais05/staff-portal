import { gql, useQuery } from '@staff-portal/data-layer-service'

import {
  GetTalentQuizQuestionsListDocument,
  GetTalentQuizQuestionsListQueryVariables
} from './get-talent-quiz-questions-list.staff.gql.types'
import { TALENT_QUIZ_QUESTION_FRAGMENT } from './../talent-quiz-question-fragment'

export const GET_TALENT_QUIZ_QUESTIONS_LIST_QUERY = gql`
  query GetTalentQuizQuestionsList(
    $filter: TalentQuizQuestionsFilter!
    $pagination: OffsetPagination!
  ) {
    talentQuizQuestions(filter: $filter, pagination: $pagination) {
      nodes {
        ...TalentQuizQuestionFragment
      }
      totalCount
    }
  }

  ${TALENT_QUIZ_QUESTION_FRAGMENT}
`

export const useGetTalentQuizQuestionsList = (
  variables: GetTalentQuizQuestionsListQueryVariables,
  skip?: boolean
) => {
  const { data, error, loading } = useQuery(
    GetTalentQuizQuestionsListDocument,
    { variables, skip }
  )

  return {
    talentQuizQuestions: data?.talentQuizQuestions?.nodes,
    totalCount: data?.talentQuizQuestions?.totalCount,
    loading,
    error
  }
}
