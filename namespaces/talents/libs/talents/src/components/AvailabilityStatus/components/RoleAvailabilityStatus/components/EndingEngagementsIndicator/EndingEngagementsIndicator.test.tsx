import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { Tooltip } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'

import { createTalentAvailabilityFragmentMock } from '../../../../../../data/talent-availability-fragment/mocks'
import { getFutureAvailability } from '../../../../../../utils'
import FutureAvailabilityTooltipContent from '../../../FutureAvailabilityTooltipContent'
import EndingEngagementsIndicator from './EndingEngagementsIndicator'

jest.mock('@toptal/picasso/Tooltip')
jest.mock('../../../../../../utils/get-talent-availability')
const TooltipMock = Tooltip as unknown as jest.Mock
const getFutureAvailabilityMock = getFutureAvailability as jest.Mock

const arrangeTest = (
  props: ComponentProps<typeof EndingEngagementsIndicator>
) =>
  render(
    <TestWrapper>
      <EndingEngagementsIndicator {...props} />
    </TestWrapper>
  )

describe('EndingEngagementsIndicator', () => {
  beforeEach(() => {
    TooltipMock.mockImplementation(({ children }) => (
      <div data-testid='tooltip'>{children}</div>
    ))
    getFutureAvailabilityMock.mockReturnValueOnce({
      variant: 'green',
      availableHours: 20,
      allocatedHours: 40,
      futureAvailabilityDistanceToNow: '1 month'
    })
  })

  it('renders tooltip with future availability', () => {
    const developer = createTalentAvailabilityFragmentMock()

    arrangeTest({
      role: developer
    })

    expect(screen.getByTestId('tooltip')).toBeInTheDocument()
    expect(TooltipMock).toHaveBeenCalledWith(
      expect.objectContaining({
        content: expect.objectContaining({
          type: FutureAvailabilityTooltipContent,
          props: {
            talentAvailability: developer
          }
        })
      }),
      {}
    )
  })

  describe('when preliminarySearchSetting is enabled', () => {
    it('renders info icon and tag with future availability', () => {
      const developerWithPreliminarySearch =
        createTalentAvailabilityFragmentMock({
          preliminarySearchSetting: { enabled: true }
        })

      arrangeTest({
        role: developerWithPreliminarySearch
      })

      expect(screen.getByTestId('info-icon')).toBeInTheDocument()
      expect(screen.getByText('Available 20/40 in 1 month')).toBeInTheDocument()
    })
  })

  describe('when preliminarySearchSetting is disabled', () => {
    it('renders exclamation icon', () => {
      const developerWithoutPreliminarySearch =
        createTalentAvailabilityFragmentMock({
          preliminarySearchSetting: { enabled: false }
        })

      arrangeTest({
        role: developerWithoutPreliminarySearch
      })

      expect(screen.getByTestId('exclamation-icon')).toBeInTheDocument()
    })
  })
})
