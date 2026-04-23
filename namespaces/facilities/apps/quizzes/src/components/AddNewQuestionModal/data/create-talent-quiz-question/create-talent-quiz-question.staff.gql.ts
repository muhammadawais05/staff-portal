import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CreateTalentQuizQuestionMutation,
  CreateTalentQuizQuestionDocument
} from './create-talent-quiz-question.staff.gql.types'

export const CREATE_TALENT_QUIZ_QUESTION = gql`
  mutation CreateTalentQuizQuestion($input: CreateTalentQuizQuestionInput!) {
    createTalentQuizQuestion(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateTalentQuizQuestion = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: CreateTalentQuizQuestionMutation) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(CreateTalentQuizQuestionDocument, {
    onCompleted,
    onError,
    refetchQueries: ['GetTalentQuizQuestionsList']
  })
