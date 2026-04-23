import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  UpdateJobMatcherQuestionsDocument,
  UpdateJobMatcherQuestionsMutation
} from './update-job-matcher-questions.staff.gql.types'

export const UPDATE_JOB_MATCHER_QUESTIONS = gql`
  mutation updateJobMatcherQuestions($input: UpdateJobMatcherQuestionsInput!) {
    updateJobMatcherQuestions(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateJobMatcherQuestions = ({
  onError,
  onCompleted
}: {
  onError?: (error: Error) => void
  onCompleted?: (data: UpdateJobMatcherQuestionsMutation) => void
}) => useMutation(UpdateJobMatcherQuestionsDocument, { onError, onCompleted })
