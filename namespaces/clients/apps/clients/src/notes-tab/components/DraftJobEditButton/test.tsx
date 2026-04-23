import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  GetLazyOperationQuery,
  GetLazyOperationVariables,
  useGetLazyOperation
} from '@staff-portal/operations'

import DraftJobEditButton from './DraftJobEditButton'

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
  callable: OperationCallableTypes = OperationCallableTypes.ENABLED
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
              updateSalesDraftJob: operation
            }
          }
        }),
      {}
    ]
  )

  render(
    <TestWrapper>
      <DraftJobEditButton
        draftJobId='123'
        operation={operation}
        onClick={onClick}
      />
    </TestWrapper>
  )
}

describe('DraftJobEditButton', () => {
  it('renders for ENABLED operation', () => {
    arrangeTest()

    expect(screen.getByLabelText(/Edit Draft Job/)).toBeInTheDocument()
  })

  it('does not display for HIDDEN operation', () => {
    arrangeTest(OperationCallableTypes.HIDDEN)

    expect(screen.queryByLabelText(/Edit Draft Job/)).not.toBeInTheDocument()
  })

  it('renders disabled for DISABLED operation', () => {
    arrangeTest(OperationCallableTypes.DISABLED)

    expect(
      screen.queryByLabelText(/Edit Draft Job/)?.closest('button')
    ).toBeDisabled()
  })

  it('calls callback on click', async () => {
    arrangeTest()

    fireEvent.click(screen.getByLabelText(/Edit Draft Job/))
    expect(onClick).toHaveBeenCalled()
  })
})
