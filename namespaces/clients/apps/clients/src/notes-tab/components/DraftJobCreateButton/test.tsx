import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  GetLazyOperationQuery,
  GetLazyOperationVariables,
  useGetLazyOperation
} from '@staff-portal/operations'

import DraftJobCreateButton from './DraftJobCreateButton'

jest.mock(
  '@staff-portal/operations/src/components/LazyOperation/data/get-lazy-operation',
  () => ({
    __esModule: true,
    useGetLazyOperation: jest.fn()
  })
)

const mockUseGetLazyOperation = useGetLazyOperation as jest.Mock

const onClick = jest.fn()

const arrangeTest = (
  callable: OperationCallableTypes = OperationCallableTypes.ENABLED,
  disabled?: boolean
) => {
  const operation = {
    callable,
    messages: []
  }

  // enforce direct operation result on button click without lazy query
  mockUseGetLazyOperation.mockImplementation(
    (
      _: GetLazyOperationVariables,
      { onCompleted }: { onCompleted: (data: GetLazyOperationQuery) => void }
    ) => [
      () =>
        onCompleted({
          node: {
            operations: {
              createSalesDraftJob: operation
            }
          }
        }),
      {}
    ]
  )

  render(
    <TestWrapper>
      <DraftJobCreateButton
        companyId='123'
        operation={operation}
        onClick={onClick}
        disabled={disabled}
      />
    </TestWrapper>
  )
}

describe('DraftJobCreateButton', () => {
  it('renders for ENABLED operation', () => {
    arrangeTest()

    expect(screen.getByText(/Log Draft Job/)).toBeInTheDocument()
  })

  it('does not display for HIDDEN operation', () => {
    arrangeTest(OperationCallableTypes.HIDDEN)

    expect(screen.queryByText(/Log Draft Job/)).not.toBeInTheDocument()
  })

  it('displays disabled for DISABLED operation', () => {
    arrangeTest(OperationCallableTypes.DISABLED)
    expect(screen.getByText(/Log Draft Job/)?.closest('button')).toBeDisabled()
  })

  it('displays disabled if disabled by property', () => {
    arrangeTest(OperationCallableTypes.ENABLED, true)
    expect(screen.getByText(/Log Draft Job/)?.closest('button')).toBeDisabled()
  })

  it('calls callback on click', async () => {
    arrangeTest()

    fireEvent.click(screen.getByText(/Log Draft Job/))
    expect(onClick).toHaveBeenCalled()
  })
})
