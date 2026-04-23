import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { TALENT_AVAILABILITY_SUBSCRIPTION_FRAGMENT } from '../../data/talent-availability-subscription-fragment'
import {
  UpdateTalentAvailabilitySubscriptionCommentDocument,
  UpdateTalentAvailabilitySubscriptionCommentMutation
} from './use-update-talent-availability-subscription-comment.staff.gql.types'

export const UPDATE_TALENT_AVAILABILITY_SUBSCRIPTION_COMMENT = gql`
  mutation UpdateTalentAvailabilitySubscriptionComment(
    $input: UpdateCommentOfTalentAvailabilityUpdatesSubscriptionInput!
  ) {
    updateCommentOfTalentAvailabilityUpdatesSubscription(input: $input) {
      talent {
        id
        viewerActiveAvailabilitySubscription {
          ...TalentAvailabilitySubscriptionFragment
        }
      }
      ...MutationResultFragment
    }
  }

  ${TALENT_AVAILABILITY_SUBSCRIPTION_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateTalentAvailabilitySubscriptionComment = ({
  onCompleted,
  onError
}: {
  onCompleted?: (
    data: UpdateTalentAvailabilitySubscriptionCommentMutation
  ) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(UpdateTalentAvailabilitySubscriptionCommentDocument, {
    onCompleted,
    onError
  })
