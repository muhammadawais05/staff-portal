import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  MarkOutdatedFeedbackDocument,
  MarkOutdatedFeedbackMutation
} from './mark-outdated-feedback.staff.gql.types'

export const MARK_OUTDATED_FEEDBACK = gql`
  mutation MarkOutdatedFeedback($input: MarkOutdatedFeedbackInput!) {
    markOutdatedFeedback(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useMarkOutdatedFeedback = ({
  onError,
  onCompleted
}: {
  onError?: (error: Error) => void
  onCompleted?: (data: MarkOutdatedFeedbackMutation) => void
} = {}) => useMutation(MarkOutdatedFeedbackDocument, { onError, onCompleted })
