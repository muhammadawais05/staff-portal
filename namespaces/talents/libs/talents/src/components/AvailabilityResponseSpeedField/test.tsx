import React from 'react'
import { screen, render } from '@testing-library/react'
import { TalentAvailabilityResponseSpeed } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import AvailabilityResponseSpeedField from './AvailabilityResponseSpeedField'

const arrangeTest = (speed: TalentAvailabilityResponseSpeed) =>
  render(
    <TestWrapper>
      <AvailabilityResponseSpeedField responseSpeed={speed} />
    </TestWrapper>
  )

describe('AvailabilityResponseSpeedField', () => {
  describe('shows the correct field value for response speed', () => {
    it('fast', async () => {
      const FIELD_VALUE = 'Fast (0 - 12 hrs)'

      arrangeTest(TalentAvailabilityResponseSpeed.FAST)

      expect(screen.getByText(FIELD_VALUE)).toBeInTheDocument()
    })

    it('moderate', async () => {
      const FIELD_VALUE = 'Moderate (12 - 36 hrs)'

      arrangeTest(TalentAvailabilityResponseSpeed.MODERATE)

      expect(screen.getByText(FIELD_VALUE)).toBeInTheDocument()
    })

    it('slow', async () => {
      const FIELD_VALUE = 'Slow (36+ hrs)'

      arrangeTest(TalentAvailabilityResponseSpeed.SLOW)

      expect(screen.getByText(FIELD_VALUE)).toBeInTheDocument()
    })

    it('not available', async () => {
      const FIELD_VALUE = 'N/A'

      arrangeTest(TalentAvailabilityResponseSpeed.NOT_AVAILABLE)

      expect(screen.getByText(FIELD_VALUE)).toBeInTheDocument()
    })
  })
})
