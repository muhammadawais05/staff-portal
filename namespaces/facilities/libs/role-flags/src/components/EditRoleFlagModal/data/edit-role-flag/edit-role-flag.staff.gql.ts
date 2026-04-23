import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { UpdateRoleFlagDocument } from './edit-role-flag.staff.gql.types'

export const UPDATE_ROLE_FLAG: typeof UpdateRoleFlagDocument = gql`
  mutation UpdateRoleFlag($input: UpdateRoleFlagInput!) {
    updateRoleFlag(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateRoleFlag = ({
  onCompleted,
  onError
}: {
  onCompleted?: () => void
  onError: (error: Error) => void
}) =>
  useMutation(UPDATE_ROLE_FLAG, {
    onCompleted,
    onError
  })
