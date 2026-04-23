import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  UpdateEngagementExtraHoursEnabledDocument,
  UpdateEngagementExtraHoursEnabledMutation
} from './update-engagement-extra-hours-enabled.staff.gql.types'

export const UPDATE_ENGAGEMENT_EXTRA_HOURS_ENABLED = gql`
  mutation UpdateEngagementExtraHoursEnabled(
    $input: UpdateEngagementExtraHoursEnabledInput!
  ) {
    updateEngagementExtraHoursEnabled(input: $input) {
      engagement {
        id
        extraHoursEnabled
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateEngagementExtraHoursEnabled = ({
  onCompleted
}: {
  onCompleted?: (data: UpdateEngagementExtraHoursEnabledMutation) => void
}) =>
  useMutation(UpdateEngagementExtraHoursEnabledDocument, {
    onCompleted
  })
