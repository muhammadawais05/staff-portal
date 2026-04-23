import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { ToggleCallDismissedDocument } from './toggle-call-dismissed.staff.gql.types'

export const TOGGLE_CALL_DISMISSED = gql`
  mutation ToggleCallDismissed($input: ToggleCallDismissedFlagInput!) {
    toggleCallDismissedFlag(input: $input) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useToggleCallDismissed = ({
  onError
}: {
  onError?: (error: Error) => void
}) =>
  useMutation(ToggleCallDismissedDocument, {
    onError
  })
