import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const TALENT_AVAILABILITY_SUBSCRIPTION_FRAGMENT = gql`
  fragment TalentAvailabilitySubscriptionFragment on TalentAvailabilitySubscription {
    id
    active
    comment
    operations {
      updateComment {
        ...OperationFragment
      }
      unsubscribe {
        ...OperationFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
`
