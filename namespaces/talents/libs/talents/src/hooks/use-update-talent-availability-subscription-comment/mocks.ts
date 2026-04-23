import {
  UserError,
  UpdateCommentOfTalentAvailabilityUpdatesSubscriptionInput
} from '@staff-portal/graphql/staff'
import { mapToTypename } from '@staff-portal/test-utils'

import { UPDATE_TALENT_AVAILABILITY_SUBSCRIPTION_COMMENT } from './use-update-talent-availability-subscription-comment.staff.gql'

export const createUpdateTalentAvailabilitySubscriptionCommentMock = (
  input: UpdateCommentOfTalentAvailabilityUpdatesSubscriptionInput,
  success = true,
  errors: UserError[] = []
) => ({
  request: {
    query: UPDATE_TALENT_AVAILABILITY_SUBSCRIPTION_COMMENT,
    variables: { input }
  },
  result: {
    data: {
      updateCommentOfTalentAvailabilityUpdatesSubscription: {
        __typename: 'MutationResult',
        talent: {
          id: '123',
          viewerActiveAvailabilitySubscription: {
            id: input.talentAvailabilitySubscriptionId,
            active: true,
            comment: input.comment
          }
        },
        success,
        errors: mapToTypename(errors, 'UserError')
      }
    }
  }
})
