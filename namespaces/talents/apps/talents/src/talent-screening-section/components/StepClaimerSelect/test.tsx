import { fireEvent, render } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { StepClaimerSelect, Props } from './StepClaimerSelect'

jest.mock('./data', () => ({
  __esModule: true,
  useGetStepClaimers: jest.fn()
}))

const arrangeTest = () =>
  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <StepClaimerSelect
          {...({
            value: 'id1',
            claimers: [
              { id: 'id1', fullName: 'Alex Sevilla' },
              { id: 'id2', fullName: 'Alex Vazirinull' }
            ]
          } as unknown as Props)}
        />
      </Form>
    </TestWrapper>
  )

describe('FormClaimerSelect', () => {
  it('renders select component with claimer options', () => {
    const { container, getByText } = arrangeTest()
    const selectInput = container.getElementsByTagName('INPUT')[0]

    fireEvent.click(selectInput)

    expect(getByText('Alex Sevilla (Staff)')).toBeInTheDocument()
    expect(getByText('Alex Vazirinull (Staff)')).toBeInTheDocument()
  })
})
