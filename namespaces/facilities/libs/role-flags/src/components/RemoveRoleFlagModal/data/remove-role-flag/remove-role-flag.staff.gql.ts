import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { RemoveRoleFlagDocument } from './remove-role-flag.staff.gql.types'

export const REMOVE_ROLE_FLAG: typeof RemoveRoleFlagDocument = gql`
  mutation RemoveRoleFlag($input: RemoveRoleFlagInput!) {
    removeRoleFlag(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useRemoveRoleFlag = ({
  onCompleted,
  onError
}: {
  onCompleted?: () => void
  onError: (error: Error) => void
}) =>
  useMutation(REMOVE_ROLE_FLAG, {
    onCompleted,
    onError
  })
