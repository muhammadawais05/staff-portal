import { useQuery, gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import { GetReassignRoleStepOperationDocument } from './get-reassign-role-step-operation.staff.gql.types'

export const GET_REASSIGN_ROLE_STEP_OPERATION: typeof GetReassignRoleStepOperationDocument = gql`
  query GetReassignRoleStepOperation($roleStepId: ID!) {
    node(id: $roleStepId) {
      ... on RoleStep {
        id
        operations {
          reassignRoleStep {
            ...OperationFragment
          }
        }
      }
    }
  }

  ${OPERATION_FRAGMENT}
`

export const useGetReassignRoleStepOperation = ({
  roleStepId,
  skip,
  onError
}: {
  roleStepId: string
  skip: boolean
  onError: () => void
}) =>
  useQuery(GET_REASSIGN_ROLE_STEP_OPERATION, {
    variables: { roleStepId },
    skip,
    onError
  })
