import { Form } from '@toptal/picasso-forms'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { OnlineTestsFragment } from '@staff-portal/talents'

import { OnlineTestAttemptsFragment } from '../ClaimOnlineTestStepModal/data/get-online-test-data/get-online-test-data.staff.gql.types'
import OnlineTestOptions from './OnlineTestOptions'

const arrangeTest = ({
  onlineTestAttempts = [],
  onlineTests = []
}: Partial<{
  onlineTests: OnlineTestsFragment[]
  onlineTestAttempts: OnlineTestAttemptsFragment[]
}> = {}) => {
  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <OnlineTestOptions
          onlineTests={onlineTests}
          onlineTestAttempts={onlineTestAttempts}
        />
      </Form>
    </TestWrapper>
  )
}

describe('OnlineTestOptions', () => {
  it('shows empty component', () => {
    arrangeTest()

    expect(screen.queryByTestId('online-test-option')).not.toBeInTheDocument()

    expect(
      screen.queryByPlaceholderText('Please select a test')
    ).not.toBeInTheDocument()
  })

  it('shows the invite to test options and online test options', async () => {
    arrangeTest({
      onlineTests: [
        { id: '1', name: 'Test Name 1', service: 'Service Name 1' },
        { id: '2', name: 'Test Name 2', service: 'Service Name 2' },
        { id: '3', name: 'Test Name 3', service: 'Service Name 1' }
      ]
    })

    expect(screen.queryByTestId('online-test-option')).toBeInTheDocument()

    expect(
      screen.getByText('Invite to Service Name 1 Test')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Invite to Service Name 2 Test')
    ).toBeInTheDocument()

    expect(
      screen.queryByPlaceholderText('Please select a test')
    ).not.toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Invite to Service Name 1 Test'))

    expect(await screen.findByText('Service Name 1 Test')).toBeInTheDocument()
  })

  it('shows the test attempts', () => {
    arrangeTest({
      onlineTestAttempts: [{ id: '1', createdAt: '2019-01-28T02:40:27+03:00' }]
    })

    fireEvent.click(screen.getByLabelText('Track pending test "Unknown test"'))

    expect(
      screen.queryByPlaceholderText('Please select a test')
    ).not.toBeInTheDocument()
  })
})
