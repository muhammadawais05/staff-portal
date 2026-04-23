import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'

type Props = {
  variables: {
    nodeId: string
  }
}

export const getRoleFlagsLazyOperations =
  (nodeType: 'Staff' | 'Talent') =>
  ({ variables: { nodeId } }: Props) => {
    const flagId = encodeEntityId('123', 'RoleFlag')

    if (nodeId === flagId) {
      return {
        data: {
          node: {
            id: flagId,
            operations: {
              removeRoleFlag: enabledOperationMock(),
              updateRoleFlag: enabledOperationMock(),
              __typename: 'RoleFlagOperations'
            },
            __typename: 'RoleFlag'
          }
        }
      }
    }

    return {
      data: {
        node: {
          id: encodeEntityId('123', nodeType),
          operations: {
            addRoleFlag: enabledOperationMock(),
            __typename: nodeType + 'Operations'
          },
          __typename: nodeType
        }
      }
    }
  }
