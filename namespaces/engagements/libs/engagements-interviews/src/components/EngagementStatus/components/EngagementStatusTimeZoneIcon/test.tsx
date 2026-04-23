import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper, assertOnTooltipText } from '@staff-portal/test-utils'

import EngagementStatusTimeZoneIcon from '../EngagementStatusTimeZoneIcon'

describe('EngagementStatusTimeZoneIcon', () => {
  it('has a correct tooltip', async () => {
    render(
      <TestWrapper>
        <EngagementStatusTimeZoneIcon timeZoneValue='Russia/Moscow' />
      </TestWrapper>
    )

    const timeZone = await screen.findByTestId(
      'engagement-status-timezone-icon'
    )

    assertOnTooltipText(timeZone, 'Russia/Moscow')
  })
})
