import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from '@staff-portal/navigation'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { usePersistentFormContext } from '@staff-portal/forms'
import { createTalentCoachingEngagementWithActivitiesFragmentMock } from '@staff-portal/talents-coaching/src/mocks'

import Coaching from '../Coaching'
import { useGetTalentCoachingEngagements } from '../../data'

const noEngagementsCopy = 'No coaching engagements were added yet.'

const mockUsePersistentFormContext = usePersistentFormContext as jest.Mock
const mockUseGetTalentEngagements = useGetTalentCoachingEngagements as jest.Mock

jest.mock('@staff-portal/facilities/src/hooks/use-encoded-id')
jest.mock('../../data')
jest.mock('@staff-portal/forms', () => ({
  ...jest.requireActual('@staff-portal/forms'),
  __esModule: true,
  usePersistentFormContext: jest.fn()
}))

const arrangeTest = () =>
  render(
    <TestWrapperWithMocks>
      <MemoryRouter>
        <Coaching talentId='test-talent' />
      </MemoryRouter>
    </TestWrapperWithMocks>
  )

describe('Coaching', () => {
  beforeEach(() => {
    mockUsePersistentFormContext.mockReturnValue({
      getFormKeys: () => []
    })
  })

  it('renders title and loader if data is loading', () => {
    mockUseGetTalentEngagements.mockReturnValue({ networkLoading: true })

    arrangeTest()
    expect(screen.queryByText('Coaching')).toBeInTheDocument()
    expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument()
    expect(screen.queryByText(noEngagementsCopy)).not.toBeInTheDocument()
  })

  it('renders a message if there are no engagements yet', () => {
    mockUseGetTalentEngagements.mockReturnValue({
      loading: false,
      data: {
        id: 'talent-id',
        coachingEngagements: {
          nodes: []
        }
      }
    })

    arrangeTest()

    expect(screen.queryByTestId('skeleton-loader')).not.toBeInTheDocument()
    expect(screen.queryByText(noEngagementsCopy)).toBeInTheDocument()
  })

  it('renders engagements if they are loaded', () => {
    mockUseGetTalentEngagements.mockReturnValue({
      loading: false,
      data: {
        id: 'talent-id',
        coachingEngagements: {
          nodes: [createTalentCoachingEngagementWithActivitiesFragmentMock()]
        }
      }
    })

    arrangeTest()
    expect(screen.queryByTestId('skeleton-loader')).not.toBeInTheDocument()
    expect(screen.queryByText(noEngagementsCopy)).not.toBeInTheDocument()
    expect(screen.queryByText('Coaching Status')).toBeInTheDocument()
  })
})
