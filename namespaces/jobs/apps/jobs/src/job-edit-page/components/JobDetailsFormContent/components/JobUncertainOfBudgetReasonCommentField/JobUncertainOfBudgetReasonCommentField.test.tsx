import React from 'react'
import { render } from '@testing-library/react'
import { useField, Form } from '@toptal/picasso-forms'
import { TestWrapper } from '@staff-portal/test-utils'

import { useGetUncertainOfBudgetReasons } from '../JobUncertainOfBudgetFields/components/UncertainOfBudgetReasonSelect/data/get-uncertain-of-budget-reasons'
import JobUncertainOfBudgetReasonCommentField from './JobUncertainOfBudgetReasonCommentField'

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useField: jest.fn()
}))

jest.mock(
  '../JobUncertainOfBudgetFields/components/UncertainOfBudgetReasonSelect/data/get-uncertain-of-budget-reasons'
)

const mockedUseGetUncertainOfBudgetReasons =
  useGetUncertainOfBudgetReasons as jest.Mock
const mockUseField = useField as jest.Mock

const renderComponent = () => {
  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <JobUncertainOfBudgetReasonCommentField />
      </Form>
    </TestWrapper>
  )
}

describe('JobUncertainOfBudgetReasonCommentField', () => {
  it('shows the input if uncertainOfBudget is Other', () => {
    mockUseField.mockReturnValueOnce({ input: { value: true } })
    mockUseField.mockReturnValueOnce({ input: { value: 'Other' } })

    mockedUseGetUncertainOfBudgetReasons.mockReturnValue({
      data: [],
      loading: false
    })

    const { getByTestId } = renderComponent()

    expect(
      getByTestId('uncertain-of-budget-reason-comment')
    ).toBeInTheDocument()
  })

  it('hides the input if uncertainOfBudget is undefined', () => {
    mockUseField.mockReturnValueOnce({ input: { value: false } })
    mockUseField.mockReturnValueOnce({ input: { value: 'Other' } })

    mockedUseGetUncertainOfBudgetReasons.mockReturnValue({
      data: [],
      loading: false
    })

    const { queryByTestId } = renderComponent()

    expect(
      queryByTestId('uncertain-of-budget-reason-comment')
    ).not.toBeInTheDocument()
  })
})
