import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  GetLazyOperationQuery,
  GetLazyOperationVariables,
  useGetLazyOperation
} from '@staff-portal/operations'

import { useRemoveActivity } from './data'
import ActivityNoteDeleteButton from './ActivityNoteDeleteButton'

jest.mock(
  '@staff-portal/operations/src/components/LazyOperation/data/get-lazy-operation',
  () => ({
    __esModule: true,
    useGetLazyOperation: jest.fn()
  })
)

jest.mock('./data', () => ({
  __esModule: true,
  useRemoveActivity: jest.fn()
}))

const mockReturnValues = (
  operation: OperationCallableTypes = OperationCallableTypes.ENABLED
) => {
  const mockUseGetLazyOperation = useGetLazyOperation as jest.Mock

  mockUseGetLazyOperation.mockImplementation(
    (
      _: GetLazyOperationVariables,
      {
        onCompleted
      }: {
        onCompleted: (data: GetLazyOperationQuery) => void
      }
    ) => [
      () =>
        onCompleted({
          node: {
            operations: {
              removeActivity: {
                callable: operation,
                messages: []
              }
            }
          }
        }),
      {
        data: {
          loading: false,
          node: {
            operations: {
              removeActivity: {
                callable: operation,
                messages: []
              }
            }
          }
        }
      }
    ]
  )

  const mockUseRemoveActivity = useRemoveActivity as jest.Mock

  mockUseRemoveActivity.mockReturnValue([
    () => ({
      data: {
        removeActivity: {
          success: true
        }
      }
    })
  ])
}

const arrangeTest = (
  callable: OperationCallableTypes = OperationCallableTypes.ENABLED
) =>
  render(
    <TestWrapper>
      <ActivityNoteDeleteButton
        activityId='test-activity-id'
        removeActivityOperation={{ callable, messages: [] } as Operation}
      />
    </TestWrapper>
  )

describe('ActivityNoteDeleteButton', () => {
  it('renders activity delete button', () => {
    mockReturnValues()
    arrangeTest()

    expect(screen.getByLabelText('Delete Activity')).toBeInTheDocument()
  })

  it('should not display the delete button', () => {
    mockReturnValues(OperationCallableTypes.HIDDEN)
    arrangeTest(OperationCallableTypes.HIDDEN)

    expect(screen.queryByLabelText('Delete Activity')).not.toBeInTheDocument()
  })

  it('should display success message', async () => {
    mockReturnValues()
    arrangeTest(OperationCallableTypes.DISABLED)

    fireEvent.click(screen.getByLabelText('Delete Activity'))

    expect(
      screen.queryByText('Are you sure that you want to delete this activity?')
    ).toBeInTheDocument()

    fireEvent.click(screen.getAllByText('Delete Activity')[1])

    expect(
      await screen.findByText('Activity has been deleted.')
    ).toBeInTheDocument()
  })
})
