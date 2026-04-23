import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import {
  GetLazyRoleStepMainActionDocument,
  GetLazyRoleStepMainActionQuery
} from './get-lazy-main-action.staff.gql.types'

export const LAZY_MAIN_ACTION_QUERY: typeof GetLazyRoleStepMainActionDocument = gql`
  query GetLazyRoleStepMainAction($roleStepId: ID!) {
    node(id: $roleStepId) {
      ... on RoleStep {
        id
        mainAction {
          actionName
          status
          tooltip
        }
        status
        claimer {
          id
        }
        additionalActions {
          nodes {
            actionName
            emailTemplate {
              id
              name
            }
          }
        }
      }
    }
  }
`

export const useGetLazyMainAction = ({
  roleStepId,
  onCompleted,
  onError
}: {
  roleStepId: string
  onCompleted: (data: GetLazyRoleStepMainActionQuery) => void
  onError: () => void
}) =>
  useLazyQuery(LAZY_MAIN_ACTION_QUERY, {
    variables: { roleStepId },
    fetchPolicy: 'network-only',
    onCompleted,
    onError
  })
