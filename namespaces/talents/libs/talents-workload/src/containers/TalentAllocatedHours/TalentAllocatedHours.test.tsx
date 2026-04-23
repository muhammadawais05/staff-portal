import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  GetLazyOperationQuery,
  GetLazyOperationVariables,
  useGetLazyOperation
} from '@staff-portal/operations'

import TalentAllocatedHours from './TalentAllocatedHours'
import { TalentWorkingOperationFragment } from '../../data'

jest.mock(
  '@staff-portal/operations/src/components/LazyOperation/data/get-lazy-operation/get-lazy-operation.gql',
  () => ({
    __esModule: true,
    useGetLazyOperation: jest.fn()
  })
)

jest.mock(
  './data/update-talent-allocated-hours/update-talent-allocated-hours.staff.gql',
  () => ({
    useUpdateTalentAllocatedHours: () => [jest.fn(), { loading: false }]
  })
)

const getOperation = (
  callable: OperationCallableTypes
): TalentWorkingOperationFragment => ({
  callable,
  messages: []
})

const mockReturnValues = (operation: TalentWorkingOperationFragment) => {
  const mockedUseGetLazyOperation = useGetLazyOperation as jest.Mock

  mockedUseGetLazyOperation.mockImplementation(
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
          node: { operations: { updateTalentAllocatedHours: operation } }
        }),
      {
        data: {
          loading: false,
          node: { operations: { updateTalentAllocatedHours: operation } }
        }
      }
    ]
  )
}

const arrangeTest = (
  allocatedHours?: number,
  callable = OperationCallableTypes.ENABLED
) => {
  const operation = getOperation(callable)

  mockReturnValues(operation)

  return render(
    <TestWrapper>
      <TalentAllocatedHours
        talentId=''
        allocatedHours={allocatedHours}
        operation={operation}
        placeholder='allocated-hours'
      />
    </TestWrapper>
  )
}

describe('TalentAllocatedHours', () => {
  it('shows the edit button', () => {
    const ALLOCATED_HOURS = 22

    arrangeTest(ALLOCATED_HOURS)

    expect(
      screen.getByText(`${ALLOCATED_HOURS} hours/week`)
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Edit allocated hours')).toBeInTheDocument()
  })

  it('hides the edit button', () => {
    const ALLOCATED_HOURS = 22

    arrangeTest(ALLOCATED_HOURS, OperationCallableTypes.HIDDEN)

    expect(
      screen.getByText(`${ALLOCATED_HOURS} hours/week`)
    ).toBeInTheDocument()
    expect(
      screen.queryByLabelText('Edit allocated hours')
    ).not.toBeInTheDocument()
  })

  it('show limit error message', async () => {
    const ALLOCATED_HOURS = 22
    const MAX_VALUE = '169'
    const MIN_VALUE = '-1'

    arrangeTest(ALLOCATED_HOURS)

    expect(
      screen.getByText(`${ALLOCATED_HOURS} hours/week`)
    ).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Edit allocated hours'))

    expect(
      await screen.findByPlaceholderText('allocated-hours')
    ).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('allocated-hours'), {
      target: { value: MAX_VALUE }
    })

    fireEvent.blur(screen.getByPlaceholderText('allocated-hours'))

    expect(
      await screen.findByText('Must be less than or equal to 168.')
    ).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('allocated-hours'), {
      target: { value: MIN_VALUE }
    })

    fireEvent.blur(screen.getByPlaceholderText('allocated-hours'))

    expect(
      await screen.findByText('Must be greater than or equal to 0.')
    ).toBeInTheDocument()
  })
})
