import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import EstimatedWeeklyRevenueTalentField from '.'
import { Props } from './EstimatedWeeklyRevenueTalentField'

jest.mock('./data', () => ({
  useUpdateJobEstimatedWeeklyRevenueTalent: () => [
    jest.fn(),
    { loading: false }
  ],
  getLazyEstimatedWeeklyRevenueTalent: () => () => ({
    request: () => {},
    data: undefined,
    loading: false
  })
}))

const getMockData = (
  operation: OperationCallableTypes = OperationCallableTypes.ENABLED
) => ({
  jobId: 'sdgrrw12313123',
  estimatedWeeklyRevenueTalent: '50',
  operation: {
    callable: operation,
    messages: []
  }
})

const arrangeTest = ({
  jobId,
  estimatedWeeklyRevenueTalent,
  operation
}: Props) => {
  render(
    <TestWrapper>
      <EstimatedWeeklyRevenueTalentField
        jobId={jobId}
        estimatedWeeklyRevenueTalent={estimatedWeeklyRevenueTalent}
        operation={operation}
      />
    </TestWrapper>
  )
}

describe('EstimatedWeeklyRevenueTalentField', () => {
  it('shows the editable field when operation is enabled', () => {
    arrangeTest(getMockData())

    expect(
      screen.getByTestId('EstimatedWeeklyRevenueTalent-editable-field')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('EstimatedWeeklyRevenueTalent-editable-field')
    ).toHaveTextContent('$50')
  })

  it('does not show the editable field when operation is disabled', () => {
    arrangeTest(getMockData(OperationCallableTypes.HIDDEN))

    expect(
      screen.queryByTestId('EstimatedWeeklyRevenueTalent-editable-field')
    ).not.toBeInTheDocument()
  })
})
