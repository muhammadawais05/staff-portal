import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@toptal/picasso/test-utils'

import { useCandidateSendingContext } from '../../hooks'
import CandidateSendingTalentAvailabilitySection from './CandidateSendingTalentAvailabilitySection'

jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  SectionWithDetailedListSkeleton: () => <div data-testid='section-loader' />
}))
jest.mock('../TalentAvailability', () => ({
  __esModule: true,
  default: () => <div data-testid='talent-availability' />
}))

jest.mock('../../hooks')
const mockUseCandidateSendingContext = useCandidateSendingContext as jest.Mock

const renderComponent = ({
  talentId,
  data,
  loading = false
}: Partial<{
  data?: object
  talentId?: string
  loading?: boolean
}> = {}) => {
  mockUseCandidateSendingContext.mockReturnValue({ talentId })

  return render(
    <TestWrapper>
      <CandidateSendingTalentAvailabilitySection
        availabilityData={data}
        availabilityDataLoading={loading}
      />
    </TestWrapper>
  )
}

describe('CandidateSendingTalentAvailabilitySection', () => {
  describe('when is loading', () => {
    it('shows the loader', () => {
      renderComponent({ talentId: '1', loading: true })

      expect(screen.getByTestId('section-loader')).toBeInTheDocument()
    })
  })

  describe('when data is missing', () => {
    it('hides the talent availability and the loader', () => {
      renderComponent()

      expect(screen.queryByTestId('section-loader')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('talent-availability')
      ).not.toBeInTheDocument()
    })
  })

  describe('when there is data', () => {
    it('shows the talent availability', () => {
      renderComponent({ data: {} })

      expect(screen.queryByTestId('section-loader')).not.toBeInTheDocument()
      expect(screen.getByTestId('talent-availability')).toBeInTheDocument()
    })
  })
})
