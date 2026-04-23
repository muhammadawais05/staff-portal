import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { subDays } from '@staff-portal/date-time-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import { createTalentAvailabilityFragmentMock } from '../../../../data/talent-availability-fragment/mocks'
import AvailabilityUpdatedAt from './AvailabilityUpdatedAt'

const talentAvailability = createTalentAvailabilityFragmentMock({
  allocatedHoursConfirmedAt: subDays(new Date(), 2).toISOString()
})

const arrangeTest = (props: ComponentProps<typeof AvailabilityUpdatedAt>) =>
  render(
    <TestWrapper>
      <AvailabilityUpdatedAt {...props} />
    </TestWrapper>
  )

describe('AvailabilityUpdatedAt', () => {
  it('shows availability updated at message', () => {
    arrangeTest({ talentAvailability })

    expect(
      screen.getByText('Availability updated 2 days ago.')
    ).toBeInTheDocument()
  })

  it('renders nothing if allocatedHoursConfirmedAt is not defined', () => {
    const { container } = arrangeTest({
      talentAvailability: {
        ...talentAvailability,
        allocatedHoursConfirmedAt: null
      }
    })

    expect(container.firstChild).toBeEmptyDOMElement()
  })
})
