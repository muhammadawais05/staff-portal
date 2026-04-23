import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import CommitmentChangeRequestList from './CommitmentChangeRequestList'
import { CommitmentChangeRequestFragment } from '../../data'
import { createCommitmentChangeRequestMock } from '../../data/get-job-commitment-change-request/mocks'

const arrangeTest = (
  commitmentChangeRequest: CommitmentChangeRequestFragment
) => {
  render(
    <TestWrapper>
      <CommitmentChangeRequestList
        commitmentChangeRequest={commitmentChangeRequest}
      />
    </TestWrapper>
  )
}

describe('CommitmentChangeRequestList', () => {
  beforeEach(() => {
    arrangeTest(createCommitmentChangeRequestMock())
  })

  it('displays correct value of `Desired Commitment` field`', () => {
    expect(
      screen.getByTestId(/item-field: Desired Commitment/i)
    ).toHaveTextContent('Part-Time with Extra Hours Enabled')
  })

  it('displays correct values for date fields', () => {
    expect(screen.getByTestId(/item-field: Change Date/i)).toHaveTextContent(
      'Oct 26, 2021'
    )
    expect(screen.getByTestId(/item-field: Submitted/i)).toHaveTextContent(
      'Oct 25, 2021'
    )
  })
})
