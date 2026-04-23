import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { DestroyTalentQuizQuestionDocument } from './destroy-talent-quiz-question.staff.gql.types'

export const DESTROY_TALENT_QUIZ_QUESTION = gql`
  mutation DestroyTalentQuizQuestion($input: DestroyTalentQuizQuestionInput!) {
    destroyTalentQuizQuestion(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useDestroyTalentQuizQuestion = ({
  onError
}: {
  onError: () => void
}) => {
  return useMutation(DestroyTalentQuizQuestionDocument, {
    onError,
    refetchQueries: ['GetTalentQuizQuestionsList']
  })
}
