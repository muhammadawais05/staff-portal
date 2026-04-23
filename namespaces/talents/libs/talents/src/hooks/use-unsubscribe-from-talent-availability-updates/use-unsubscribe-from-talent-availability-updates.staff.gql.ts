import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import { TALENT_AVAILABILITY_SUBSCRIPTION_FRAGMENT } from '../../data/talent-availability-subscription-fragment'
import {
  UnsubscribeFromTalentAvailabilityUpdatesDocument,
  UnsubscribeFromTalentAvailabilityUpdatesMutation
} from './use-unsubscribe-from-talent-availability-updates.staff.gql.types'

export const UNSUBSCRIBE_FROM_TALENT_AVAILABILITY_UPDATES = gql`
  mutation UnsubscribeFromTalentAvailabilityUpdates(
    $input: UnsubscribeFromTalentAvailabilityUpdatesInput!
  ) {
    unsubscribeFromTalentAvailabilityUpdates(input: $input) {
      talent {
        id
        viewerActiveAvailabilitySubscription {
          ...TalentAvailabilitySubscriptionFragment
        }
        operations {
          subscribeToTalentAvailabilityUpdates {
            ...OperationFragment
          }
        }
      }
      ...MutationResultFragment
    }
  }

  ${TALENT_AVAILABILITY_SUBSCRIPTION_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
  ${OPERATION_FRAGMENT}
`

export const useUnsubscribeFromTalentAvailabilityUpdates = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: UnsubscribeFromTalentAvailabilityUpdatesMutation) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(UnsubscribeFromTalentAvailabilityUpdatesDocument, {
    onCompleted,
    onError
  })
