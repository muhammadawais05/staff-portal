import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { TalentAvailabilitySubscriptionFragment } from './talent-availability-subscription-fragment.staff.gql.types'

const OPERATION = {
  callable: OperationCallableTypes.ENABLED,
  messages: [],
  __typename: 'Operation'
}

export const createTalentAvailabilitySubscriptionFragmentMock = (
  TalentAvailabilitySubscription: Partial<TalentAvailabilitySubscriptionFragment> = {}
): TalentAvailabilitySubscriptionFragment => ({
  id: encodeEntityId('1000', 'TalentAvailabilitySubscription'),
  active: true,
  comment: 'Subscription reason',
  operations: {
    unsubscribe: OPERATION,
    updateComment: OPERATION
  },
  ...TalentAvailabilitySubscription
})
