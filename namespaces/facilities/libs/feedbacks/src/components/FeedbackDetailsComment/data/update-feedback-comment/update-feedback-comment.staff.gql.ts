import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { FEEDBACK_DETAILS_FRAGMENT } from '../../../../data'
import {
  UpdateFeedbackCommentDocument,
  UpdateFeedbackCommentMutation
} from './update-feedback-comment.staff.gql.types'

export const UPDATE_FEEDBACK_COMMENT = gql`
  mutation UpdateFeedbackComment($input: UpdateFeedbackCommentInput!) {
    updateFeedbackComment(input: $input) {
      feedback {
        ...FeedbackDetailsFragment
      }
      ...MutationResultFragment
    }
  }

  ${FEEDBACK_DETAILS_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateFeedbackComment = ({
  onCompleted
}: {
  onCompleted?: (data: UpdateFeedbackCommentMutation) => void
}) =>
  useMutation(UpdateFeedbackCommentDocument, {
    onCompleted
  })
