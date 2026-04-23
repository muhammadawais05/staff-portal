import {
  OperationCallableTypes,
  UserError,
  SubscribeToTalentAvailabilityUpdatesInput
} from '@staff-portal/graphql/staff'
import { mapToTypename } from '@staff-portal/test-utils'

import { SUBSCRIBE_TO_TALENT_AVAILABILITY_UPDATES } from './use-subscribe-to-talent-availability-updates.staff.gql'

const OPERATION = {
  callable: OperationCallableTypes.ENABLED,
  messages: [],
  __typename: 'Operation'
}

export const createSubscribeToTalentAvailabilityUpdatesMock = (
  input: SubscribeToTalentAvailabilityUpdatesInput,
  success = true,
  errors: UserError[] = []
) => ({
  request: {
    query: SUBSCRIBE_TO_TALENT_AVAILABILITY_UPDATES,
    variables: { input }
  },
  result: {
    data: {
      subscribeToTalentAvailabilityUpdates: {
        __typename: 'MutationResult',
        talent: {
          id: input.talentId,
          viewerActiveAvailabilitySubscription: {
            id: '123',
            active: true,
            comment: input.comment,
            operations: {
              unsubscribe: OPERATION,
              updateComment: OPERATION
            }
          }
        },
        success,
        errors: mapToTypename(errors, 'UserError')
      }
    }
  }
})
