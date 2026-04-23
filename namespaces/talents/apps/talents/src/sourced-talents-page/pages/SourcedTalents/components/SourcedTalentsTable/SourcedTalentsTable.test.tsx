import React from 'react'
import { render, screen } from '@testing-library/react'
import { useLocation } from '@staff-portal/navigation'
import { useGetData } from '@staff-portal/data-layer-service'
import { SourcingStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { SourcedTalentFragment } from '../../data/sourced-talent-fragment.staff.gql.types'
import SourcedTalentsTable from './SourcedTalentsTable'

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useLocation: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/query-params-state', () => ({
  __esModule: true,
  ...jest.requireActual('@staff-portal/query-params-state'),
  useQueryParamsState: () => [{}, jest.fn()]
}))
const PAGE_SIZE = 25

jest.mock('@staff-portal/filters', () => ({
  __esModule: true,
  ...jest.requireActual('@staff-portal/filters'),
  usePagination: () => ({
    page: { page: 1 },
    limit: PAGE_SIZE,
    handlePageChange: jest.fn(),
    pagination: { offset: 0, limit: PAGE_SIZE },
    resolving: false,
    normalizePage: () => {}
  })
}))
const useGetDataMock = useGetData as jest.Mock
const useLocationMock = useLocation as jest.Mock

const SOURCED_TALENT: SourcedTalentFragment = {
  id: 'TALENT_ID',
  fullName: 'Sourced Talent',
  joinedAt: '2020-05-01T01:00:00',
  type: 'Developer',
  sourcingStatus: SourcingStatus.SCREENING_TECHNICAL,
  nextMeetingDate: '2022-06-01',
  webResource: { url: 'url.to' },
  technicalStepsProgress: { currentStep: 1, totalSteps: 3 }
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <SourcedTalentsTable />
    </TestWrapper>
  )

describe('SourcedTalentsTable', () => {
  beforeEach(() => {
    useLocationMock.mockReturnValue({})
  })

  describe('when data is loaded', () => {
    it('renders the table', () => {
      useGetDataMock.mockReturnValue(() => ({
        loading: false,
        data: {
          sourcedTalents: { nodes: [SOURCED_TALENT], totalCount: 1 }
        }
      }))
      arrangeTest()

      expect(screen.getByTestId('SourcedTalentsList-item')).toBeInTheDocument()
    })
  })

  describe('when no sourced talents data', () => {
    it('shows the empty message', () => {
      useGetDataMock.mockReturnValue(() => ({
        loading: false,
        data: {
          sourcedTalents: { nodes: [], totalCount: 0 }
        }
      }))
      arrangeTest()

      expect(
        screen.getByTestId('sourced-talents-empty-message')
      ).toBeInTheDocument()

      expect(
        screen.getByTestId('sourced-talents-empty-message')
      ).toHaveTextContent('You have not sourced any talent yet')
    })
  })

  describe('when data is loading', () => {
    it('renders the skeleton loaders', () => {
      useGetDataMock.mockReturnValue(() => ({
        loading: true
      }))
      arrangeTest()

      expect(
        screen.getByTestId('SourcedTalentsTable-skeleton-loader')
      ).toBeInTheDocument()
    })
  })
})
