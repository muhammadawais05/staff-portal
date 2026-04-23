import { RoleStepMainAction } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'

import { LAZY_MAIN_ACTION_QUERY } from './get-lazy-main-action.staff.gql'

export const createGetLazyMainActionMock = ({
  roleStepId,
  mainAction
}: {
  roleStepId: string
  mainAction: RoleStepMainAction
}): MockedResponse => {
  return {
    request: { query: LAZY_MAIN_ACTION_QUERY, variables: { roleStepId } },
    result: {
      data: {
        node: {
          id: roleStepId,
          mainAction: {
            ...mainAction,
            __typename: 'RoleStepMainAction'
          },
          __typename: 'RoleStep'
        },
        __typename: 'Query'
      }
    }
  }
}
