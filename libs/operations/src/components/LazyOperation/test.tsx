import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { NodeType } from '@staff-portal/graphql'

import LazyOperation from './LazyOperation'
import {
  GetLazyOperationQuery,
  GetLazyOperationVariables,
  useGetLazyOperation
} from './data/get-lazy-operation'
import OperationWrapper from '../OperationWrapper'
import { createGetLazyOperationMock } from './data/get-lazy-operation/mocks'

jest.mock('./data/get-lazy-operation', () => ({
  ...jest.requireActual('./data/get-lazy-operation'),
  useGetLazyOperation: jest.fn()
}))

jest.mock('../../utils', () => ({
  isOperationDisabled: () => false
}))

jest.mock('../OperationWrapper', () => ({
  __esModule: true,
  default: jest.fn()
}))

const mockedOperationWrapper = OperationWrapper as jest.Mock

const mockUseGetLazyOperation = (
  variables: GetLazyOperationVariables,
  operation: Operation
) => {
  const mockedUseGetLazyOperation = useGetLazyOperation as jest.Mock

  const operationMock = createGetLazyOperationMock({
    variables,
    operation
  })

  const { data } = (
    operationMock.newData as () => {
      data: GetLazyOperationQuery
    }
  )()

  mockedUseGetLazyOperation.mockImplementation(() => [
    () => {},
    {
      loading: false,
      data
    }
  ])

  return operationMock
}

describe('LazyOperation', () => {
  it.each([
    OperationCallableTypes.ENABLED,
    OperationCallableTypes.DISABLED,
    OperationCallableTypes.HIDDEN
  ])(
    'renders OperationWrapper with expected props',
    (callable: OperationCallableTypes) => {
      const variables: GetLazyOperationVariables = {
        nodeId: 'node',
        nodeType: NodeType.ACTIVITY,
        operationName: 'removeActivity'
      }

      const messages =
        callable === OperationCallableTypes.HIDDEN ? [] : ['Backend Message']

      mockUseGetLazyOperation(variables, {
        callable,
        messages
      })

      mockedOperationWrapper.mockImplementation(() => null)

      const renderChildren = jest.fn(() => null)

      const tooltipTextOnEnabled = 'Enabled'
      const tooltipTextOnDisabled = 'Disabled'

      render(
        <TestWrapper>
          <LazyOperation
            tooltipTextOnEnabled={tooltipTextOnEnabled}
            tooltipTextOnDisabled={tooltipTextOnDisabled}
            getLazyOperationVariables={variables}
          >
            {renderChildren}
          </LazyOperation>
        </TestWrapper>
      )

      expect(mockedOperationWrapper).toHaveBeenCalledTimes(1)

      expect(mockedOperationWrapper).toHaveBeenCalledWith(
        {
          children: null,
          disableTooltip: undefined,
          hidden: false,
          inline: true,
          operation: {
            __typename: 'Operation',
            callable,
            messages
          },
          tooltipTextOnDisabled: 'Disabled',
          tooltipTextOnEnabled: 'Enabled'
        },
        {}
      )
    }
  )
})
