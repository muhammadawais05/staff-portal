import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { createTalentAvailabilityFragmentMock } from '../../../../../../data/talent-availability-fragment/mocks'
import { getFutureAvailability } from '../../../../../../utils'
import CompactEndingEngagementsIndicator from './CompactEndingEngagementsIndicator'

jest.mock('../../../../../../utils/get-talent-availability')
const getFutureAvailabilityMock = getFutureAvailability as jest.Mock

const arrangeTest = (
  props: ComponentProps<typeof CompactEndingEngagementsIndicator>
) =>
  render(
    <TestWrapper>
      <CompactEndingEngagementsIndicator {...props} />
    </TestWrapper>
  )

describe('CompactEndingEngagementsIndicator', () => {
  beforeEach(() => {
    getFutureAvailabilityMock.mockReturnValueOnce({
      variant: 'green',
      availableHours: 20,
      allocatedHours: 40,
      futureAvailabilityDistanceToNow: '1 month'
    })
  })

  it('renders info icon and indicator with future availability', () => {
    const developer = createTalentAvailabilityFragmentMock()

    arrangeTest({
      talentRole: developer
    })

    expect(getFutureAvailabilityMock).toHaveBeenCalledWith(developer)
    expect(screen.getByTestId('info-icon')).toBeInTheDocument()
    expect(screen.getByTestId('indicator-green')).toBeInTheDocument()
  })
})
