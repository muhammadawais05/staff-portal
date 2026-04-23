import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CallRoleDocument,
  CallRoleMutation
} from './use-call-role.staff.gql.types'

export default gql`
  mutation CallRole($input: CallRoleInput!) {
    callRole(input: $input) {
      ...MutationResultFragment
      externalCallUrl
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCallRole = ({
  onError,
  onCompleted
}: {
  onError: () => void
  onCompleted?: (data: CallRoleMutation) => void
}) =>
  useMutation(CallRoleDocument, {
    onError,
    onCompleted
  })
