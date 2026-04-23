import { renderHook } from '@testing-library/react-hooks'
import { OperationFragment } from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

import { DropdownActionType } from '../utils'
import { useGetLazyOperationVariables } from './use-get-lazy-operation-variables'

describe('useGetLazyOperationVariables', () => {
  describe('when provided with expected arguments', () => {
    it('returns expected variables', () => {
      const operationName = 'operationName'
      const nodeId = 'nodeId'
      const nodeType = 'nodeType' as NodeType
      const operations = { [operationName]: {} as OperationFragment }

      const {
        result: { current: getLazyOperationVariables }
      } = renderHook(() =>
        useGetLazyOperationVariables({ nodeId, nodeType, operations })
      )
      const variables = getLazyOperationVariables(operationName)

      expect(variables).toEqual({
        operationVariables: { nodeType, nodeId, operationName },
        operation: {},
        type: DropdownActionType.LAZY_OPERATION
      })
    })
  })
})
