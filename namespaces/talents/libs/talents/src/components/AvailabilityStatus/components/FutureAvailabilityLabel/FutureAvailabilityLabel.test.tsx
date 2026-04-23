import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { TalentAllocatedHoursAvailability } from '@staff-portal/graphql/staff'
import MockDate from 'mockdate'

import {
  createTalentAvailabilityFragmentMock,
  createEndingEngagementMock
} from '../../../../data/talent-availability-fragment/mocks'
import FutureAvailabilityLabel from './FutureAvailabilityLabel'

const endingEngagement = createEndingEngagementMock({
  endDate: '2022-01-02',
  proposedEnd: null
})

// Unavailable (0/40) → Part-time (20/40)
const productManagerUnavailableThenPartTime =
  createTalentAvailabilityFragmentMock({
    type: 'ProductManager',
    allocatedHours: 40,
    availableHoursIncludingEndingEngagements: 0,
    availableHours: 20,
    allocatedHoursAvailabilityIncludingEndingEngagements:
      TalentAllocatedHoursAvailability.UNAVAILABLE,
    allocatedHoursAvailability: TalentAllocatedHoursAvailability.PART_TIME,
    endingEngagements: {
      nodes: [endingEngagement]
    }
  })

const arrangeTest = (props: ComponentProps<typeof FutureAvailabilityLabel>) =>
  render(
    <TestWrapper>
      <FutureAvailabilityLabel {...props} />
    </TestWrapper>
  )

describe('FutureAvailabilityLabel', () => {
  beforeAll(() => {
    MockDate.set('2022-01-01')
  })

  it('shows message with status, available hour, allocated hour and date', () => {
    const { container } = arrangeTest({
      talentAvailability: productManagerUnavailableThenPartTime
    })

    expect(container).toHaveTextContent(
      'Talent will be available Part-time 20/40 hrs in 1 day.'
    )
  })

  it('shows talent type when requested', () => {
    const { container } = arrangeTest({
      talentAvailability: productManagerUnavailableThenPartTime,
      includeType: true
    })

    expect(container).toHaveTextContent(
      'Product Manager will be available Part-time 20/40 hrs in 1 day.'
    )
  })
})
