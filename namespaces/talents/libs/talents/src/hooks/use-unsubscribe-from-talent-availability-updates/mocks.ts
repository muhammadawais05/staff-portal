import {
  UserError,
  UnsubscribeFromTalentAvailabilityUpdatesInput
} from '@staff-portal/graphql/staff'
import { mapToTypename } from '@staff-portal/test-utils'

import { UNSUBSCRIBE_FROM_TALENT_AVAILABILITY_UPDATES } from './use-unsubscribe-from-talent-availability-updates.staff.gql'

export const createUnsubscribeFromTalentAvailabilityUpdatesMock = (
  input: UnsubscribeFromTalentAvailabilityUpdatesInput,
  success = true,
  errors: UserError[] = []
) => ({
  request: {
    query: UNSUBSCRIBE_FROM_TALENT_AVAILABILITY_UPDATES,
    variables: { input }
  },
  result: {
    data: {
      unsubscribeFromTalentAvailabilityUpdates: {
        __typename: 'MutationResult',
        talent: {
          id: '123',
          viewerActiveAvailabilitySubscription: {
            id: input.talentAvailabilitySubscriptionId,
            active: false,
            comment: 'Test subscription reason'
          },
          operations: {
            subscribeToTalentAvailabilityUpdates: {
              messages: [],
              callable: 'ENABLED'
            }
          }
        },
        success,
        errors: mapToTypename(errors, 'UserError')
      }
    }
  }
})
