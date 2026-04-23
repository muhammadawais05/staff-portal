import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CloneTalentQuizQuestionMutation,
  CloneTalentQuizQuestionDocument
} from './clone-questions.staff.gql.types'

export const CLONE_TALENT_QUIZ_QUESTIONS = gql`
  mutation CloneTalentQuizQuestion($input: CloneTalentQuizQuestionInput!) {
    cloneTalentQuizQuestion(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCloneQuestions = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: CloneTalentQuizQuestionMutation) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(CloneTalentQuizQuestionDocument, {
    onCompleted,
    onError,
    refetchQueries: ['GetTalentQuizQuestionsList', 'GetQuizzesVerticals']
  })
