import { SectionWithDetailedListSkeleton } from '@staff-portal/ui'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@toptal/picasso/test-utils'
import React from 'react'

import { PitchCandidate } from '../../components'
import PitchCandidateDetails from './PitchCandidateDetails'
import { PitchStepDataFragment } from '../../data/get-pitch-step-data'

jest.mock('../../components')
jest.mock('@staff-portal/ui')

const mockSectionWithDetailedListSkeleton =
  SectionWithDetailedListSkeleton as jest.Mock
const mockPitchCandidate = PitchCandidate as jest.Mock

const renderComponent = ({
  data,
  loading
}: { data?: PitchStepDataFragment; loading?: boolean } = {}) => {
  mockSectionWithDetailedListSkeleton.mockImplementation(() => null)
  mockPitchCandidate.mockImplementation(() => null)

  return render(
    <TestWrapper>
      <PitchCandidateDetails pitchStepData={data} loading={loading ?? false} />
    </TestWrapper>
  )
}

describe('PitchCandidateDetails', () => {
  describe('when is loading', () => {
    it('shows the loading', () => {
      renderComponent({ loading: true })

      expect(mockSectionWithDetailedListSkeleton).toHaveBeenCalled()
      expect(mockPitchCandidate).not.toHaveBeenCalled()
    })
  })

  describe('when there is no data', () => {
    it('returns null', () => {
      renderComponent()

      expect(mockSectionWithDetailedListSkeleton).not.toHaveBeenCalled()
      expect(mockPitchCandidate).not.toHaveBeenCalled()
    })
  })

  describe('when there is data', () => {
    it('shows pitch candidate', () => {
      renderComponent({ data: { isPitchTextEnabled: true } })

      expect(mockSectionWithDetailedListSkeleton).not.toHaveBeenCalled()
      expect(mockPitchCandidate).toHaveBeenCalledWith(
        { candidate: { isPitchTextEnabled: true } as PitchStepDataFragment },
        expect.anything()
      )
    })
  })
})
