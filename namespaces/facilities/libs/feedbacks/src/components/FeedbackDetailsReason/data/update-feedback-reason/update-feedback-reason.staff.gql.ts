import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { FEEDBACK_DETAILS_FRAGMENT } from '../../../../data'
import {
  UpdateFeedbackReasonDocument,
  UpdateFeedbackReasonMutation
} from './update-feedback-reason.staff.gql.types'

export const UPDATE_FEEDBACK_REASON = gql`
  mutation UpdateFeedbackReason($input: UpdateFeedbackReasonInput!) {
    updateFeedbackReason(input: $input) {
      feedback {
        ...FeedbackDetailsFragment
      }
      ...MutationResultFragment
    }
  }

  ${FEEDBACK_DETAILS_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateFeedbackReason = ({
  onCompleted
}: {
  onCompleted?: (data: UpdateFeedbackReasonMutation) => void
}) =>
  useMutation(UpdateFeedbackReasonDocument, {
    onCompleted
  })
