import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import {
  createEndingEngagementMock,
  createTalentAvailabilityFragmentMock
} from '../../../../data/talent-availability-fragment/mocks'
import FutureAvailabilityTooltipContent from './FutureAvailabilityTooltipContent'

const talentAvailability = createTalentAvailabilityFragmentMock({
  allocatedHoursConfirmedAt: new Date().toISOString(),
  endingEngagements: {
    nodes: [
      createEndingEngagementMock({ id: '1' }),
      createEndingEngagementMock({ id: '2' }),
      createEndingEngagementMock({ id: '3' })
    ]
  }
})

const arrangeTest = (
  props: ComponentProps<typeof FutureAvailabilityTooltipContent>
) =>
  render(
    <TestWrapper>
      <FutureAvailabilityTooltipContent {...props} />
    </TestWrapper>
  )

describe('FutureAvailabilityTooltipContent', () => {
  it('shows future availability, ending engagements, update date and preliminary search status', () => {
    arrangeTest({
      talentAvailability
    })

    expect(screen.getByTestId('future-availability-label')).toBeInTheDocument()
    expect(screen.getAllByTestId('ending-engagement-label')).toHaveLength(3)
    expect(screen.getByTestId('availability-updated-at')).toBeInTheDocument()
    expect(screen.getByTestId('preliminary-search-label')).toBeInTheDocument()
  })
})
