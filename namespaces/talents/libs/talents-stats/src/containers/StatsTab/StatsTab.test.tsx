import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { TalentCumulativeStatus } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import StatsTab from './StatsTab'
import {
  createGetTalentStatsSectionMock,
  createGetTalentStatsSectionFailedMock
} from './data/get-talent-stats-section/mocks'

const TALENT_ID = 'xyz123'

const arrangeTest = (mocks: MockedResponse[]) => {
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <StatsTab talentId={TALENT_ID} section={true} />
    </TestWrapperWithMocks>
  )
}

describe('Talent List Item Stats Section', () => {
  it('shows an error when query fails', async () => {
    const ERROR_MESSAGE = 'Failed fetching talent status section.'

    arrangeTest([
      createGetTalentStatsSectionFailedMock({
        talentId: TALENT_ID
      })
    ])

    expect(await screen.findByText(ERROR_MESSAGE)).toBeInTheDocument()
  })

  it('shows always certain fields when talent is active', async () => {
    arrangeTest([
      createGetTalentStatsSectionMock({
        talentId: TALENT_ID,
        cumulativeStatus: TalentCumulativeStatus.ACTIVE
      })
    ])

    await waitFor(() => screen.queryByTestId('stats-section'))

    expect(
      screen.getByTestId(/item-field: Engagement Rate/i)
    ).toBeInTheDocument()

    expect(
      screen.getByTestId(/item-field: Client Will Hire Again/i)
    ).toBeInTheDocument()

    expect(
      screen.getByTestId(/item-field: Repeated Clients/i)
    ).toBeInTheDocument()

    expect(
      screen.getByTestId(/item-field: Delta Waiting Time/i)
    ).toBeInTheDocument()

    expect(screen.getByTestId(/item-field: Trial Rate/i)).toBeInTheDocument()

    expect(screen.getByTestId(/item-field: AR Speed/i)).toBeInTheDocument()
  })

  it('shows default message when talent is not active', async () => {
    const DEFAULT_MESSAGE = 'Statistics are not available for inactive talent.'

    arrangeTest([
      createGetTalentStatsSectionMock({
        talentId: TALENT_ID,
        cumulativeStatus: TalentCumulativeStatus.PENDING_PROFILE
      })
    ])

    await waitFor(() => screen.queryByTestId('stats-section'))

    expect(await screen.findByText(DEFAULT_MESSAGE)).toBeInTheDocument()
  })
})
