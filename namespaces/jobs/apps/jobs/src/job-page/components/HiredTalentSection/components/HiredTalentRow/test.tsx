import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { createHiredTalentEngagementFragmentMock } from '../../data/get-hired-talent/mocks'
import HiredTalentRow from './HiredTalentRow'

jest.mock('../HiredTalentRowContent', () => ({
  __esModule: true,
  default: () => <div data-testid='HiredTalentRowContent' />
}))
jest.mock('../../../HiredTalentMoreDropdown', () => ({
  __esModule: true,
  HiredTalentMoreDropdown: () => <div />
}))

const arrangeTest = (isExpanded: boolean) =>
  render(
    <TestWrapper>
      <table>
        <tbody>
          <HiredTalentRow
            jobId='some-id'
            isExpanded={isExpanded}
            engagement={createHiredTalentEngagementFragmentMock()}
          />
        </tbody>
      </table>
    </TestWrapper>
  )

describe('HiredTalentRow', () => {
  it('renders expandable row', () => {
    arrangeTest(false)

    expect(screen.getByTestId('HiredTalentRow-talent-link')).toBeInTheDocument()
    expect(screen.getByTestId('HiredTalentStatus')).toBeInTheDocument()
    expect(screen.getByTestId('HiredTalentRow-actions')).toBeInTheDocument()
    expect(
      screen.queryByTestId('HiredTalentRowContent')
    ).not.toBeInTheDocument()
  })

  it('renders expanded row', async () => {
    arrangeTest(true)

    expect(
      await screen.findByTestId('HiredTalentRowContent')
    ).toBeInTheDocument()
  })
})
