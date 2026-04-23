import { Operation } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'

import {
  GetLazyOperationVariables,
  makeGetLazyOperationQuery
} from './get-lazy-operation.gql'

export const createGetLazyOperationMock = ({
  variables,
  operation
}: {
  variables: GetLazyOperationVariables
  operation: Operation
}): MockedResponse => {
  const { nodeId, ...operationType } = variables

  return {
    request: {
      query: makeGetLazyOperationQuery(operationType),
      variables: { nodeId }
    },
    newData: () => ({
      data: {
        node: {
          id: nodeId,
          operations: {
            [operationType.operationName]: {
              ...operation,
              __typename: 'Operation'
            },
            __typename: `${operationType.nodeType}Operations`
          },
          __typename: operationType.nodeType
        },
        __typename: 'Query'
      }
    })
  }
}
