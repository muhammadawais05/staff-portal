import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  UpdateTalentQuizQuestionMutation,
  UpdateTalentQuizQuestionDocument
} from './update-talent-quiz-question.staff.gql.types'

export const UPDATE_TALENT_QUIZ_QUESTION = gql`
  mutation UpdateTalentQuizQuestion($input: UpdateTalentQuizQuestionInput!) {
    updateTalentQuizQuestion(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateTalentQuizQuestion = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: UpdateTalentQuizQuestionMutation) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(UpdateTalentQuizQuestionDocument, {
    onCompleted,
    onError,
    refetchQueries: ['GetTalentQuizQuestionsList']
  })
