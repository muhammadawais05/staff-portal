import { useCallback } from 'react'
import { gql, useMutation } from '@staff-portal/data-layer-service'
import { NodeType } from '@staff-portal/graphql'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  AddClientRoleFlagDocument,
  AddRoleFlagDocument
} from './add-role-flag.staff.gql.types'

export const ADD_ROLE_FLAG: typeof AddRoleFlagDocument = gql`
  mutation AddRoleFlag($input: AddRoleFlagInput!) {
    addRoleFlag(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const ADD_CLIENT_ROLE_FLAG: typeof AddClientRoleFlagDocument = gql`
  mutation AddClientRoleFlag($input: AddClientRoleFlagInput!) {
    addClientRoleFlag(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useAddRoleFlag = ({
  nodeType,
  onCompleted,
  onError
}: {
  nodeType: NodeType.CLIENT | NodeType.ROLE
  onCompleted?: () => void
  onError: (error: Error) => void
}) => {
  const [addRoleFlag, { loading: addRoleFlagLoading }] = useMutation(
    ADD_ROLE_FLAG,
    {
      onCompleted,
      onError
    }
  )

  const [addClientFlag, { loading: addClientFlagLoading }] = useMutation(
    ADD_CLIENT_ROLE_FLAG,
    {
      onCompleted,
      onError
    }
  )

  const addFlag = useCallback(
    async ({
      roleId,
      flagId,
      comment
    }: {
      roleId: string
      flagId: string
      comment: string
    }) =>
      nodeType === 'Client'
        ? (
            await addClientFlag({
              variables: {
                input: {
                  clientId: roleId,
                  flagId,
                  comment
                }
              }
            })
          ).data?.addClientRoleFlag
        : (
            await addRoleFlag({
              variables: {
                input: {
                  roleId,
                  flagId,
                  comment
                }
              }
            })
          ).data?.addRoleFlag,
    [addClientFlag, addRoleFlag, nodeType]
  )

  return {
    loading: addClientFlagLoading || addRoleFlagLoading,
    addFlag
  }
}
