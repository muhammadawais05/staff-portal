import React from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { MemoryRouter } from '@staff-portal/navigation'
import {
  getOperationalIssuesPath,
  OperationalIssuesPathEscalated,
  OperationalIssuesPathOwnedBy,
  OperationalIssuesPathStatus
} from '@staff-portal/routes'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { createGetOperationalIssuesCountersMock } from './data/get-operational-issues-counters/mocks'
import OperationalIssuesWidget from './OperationalIssuesWidget'

const arrangeTest = async ({ mocks }: { mocks: MockedResponse[] }) => {
  render(
    <MemoryRouter>
      <TestWrapperWithMocks mocks={mocks}>
        <OperationalIssuesWidget />
      </TestWrapperWithMocks>
    </MemoryRouter>
  )
  await waitForElementToBeRemoved(() => screen.getAllByText('Loading...'))
}

describe('OperationalIssuesWidget', () => {
  describe('when an operational issue is clicked', () => {
    it('renders correct links to the legacy staff portal page', async () => {
      const YOUR_ISSUES_PATH = getOperationalIssuesPath({
        ownedBy: OperationalIssuesPathOwnedBy.ME,
        status: [
          OperationalIssuesPathStatus.PENDING,
          OperationalIssuesPathStatus.CLAIMED,
          OperationalIssuesPathStatus.REOPENED
        ]
      })
      const TEAM_ISSUES_PATH = getOperationalIssuesPath({
        ownedBy: OperationalIssuesPathOwnedBy.TEAM,
        status: [
          OperationalIssuesPathStatus.PENDING,
          OperationalIssuesPathStatus.CLAIMED,
          OperationalIssuesPathStatus.REOPENED
        ]
      })
      const ALL_ISSUES_PATH = getOperationalIssuesPath({
        ownedBy: OperationalIssuesPathOwnedBy.ALL,
        status: [
          OperationalIssuesPathStatus.PENDING,
          OperationalIssuesPathStatus.CLAIMED,
          OperationalIssuesPathStatus.REOPENED
        ]
      })
      const ESCALATED_ISSUES_PATH = getOperationalIssuesPath({
        escalated: OperationalIssuesPathEscalated.ESCALATED,
        ownedBy: OperationalIssuesPathOwnedBy.ALL,
        status: [
          OperationalIssuesPathStatus.PENDING,
          OperationalIssuesPathStatus.CLAIMED,
          OperationalIssuesPathStatus.REOPENED
        ]
      })

      await arrangeTest({
        mocks: [createGetOperationalIssuesCountersMock()]
      })

      const yourIssuesLink = screen.getByTestId('your-issues')
      const teamIssuesLink = screen.getByTestId('team-issues')
      const allIssuesLink = screen.getByTestId('all-issues')
      const escalatedIssuesLink = screen.getByTestId('escalated-issues')

      expect(yourIssuesLink).toHaveAttribute('href', YOUR_ISSUES_PATH)

      expect(teamIssuesLink).toHaveAttribute('href', TEAM_ISSUES_PATH)

      expect(allIssuesLink).toHaveAttribute('href', ALL_ISSUES_PATH)

      expect(escalatedIssuesLink).toHaveAttribute('href', ESCALATED_ISSUES_PATH)
    })
  })
})
