import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { TALENT_AVAILABILITY_SUBSCRIPTION_FRAGMENT } from '../../data/talent-availability-subscription-fragment'
import {
  SubscribeToTalentAvailabilityUpdatesDocument,
  SubscribeToTalentAvailabilityUpdatesMutation
} from './use-subscribe-to-talent-availability-updates.staff.gql.types'

export const SUBSCRIBE_TO_TALENT_AVAILABILITY_UPDATES = gql`
  mutation SubscribeToTalentAvailabilityUpdates(
    $input: SubscribeToTalentAvailabilityUpdatesInput!
  ) {
    subscribeToTalentAvailabilityUpdates(input: $input) {
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

export const useSubscribeToTalentAvailabilityUpdates = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: SubscribeToTalentAvailabilityUpdatesMutation) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(SubscribeToTalentAvailabilityUpdatesDocument, {
    onCompleted,
    onError
  })
