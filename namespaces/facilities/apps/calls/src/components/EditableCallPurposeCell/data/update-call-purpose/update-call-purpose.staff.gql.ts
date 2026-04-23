import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { UpdateCallPurposeDocument } from './update-call-purpose.staff.gql.types'

export const UPDATE_CALL_PURPOSE = gql`
  mutation UpdateCallPurpose($input: UpdateCallPurposeInput!) {
    updateCallPurpose(input: $input) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateCallPurpose = ({
  onError
}: {
  onError?: (error: Error) => void
}) => useMutation(UpdateCallPurposeDocument, { onError })
