import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { createGetGigMock } from '@staff-portal/talents-gigs/src/mocks'

import GigCandidatesSearch from './GigCandidatesSearch'
import useHandleTalentListFilters from './services/use-handle-talent-list-filters/use-handle-talent-list-filters'
import useGetTalentsForCandidateList from './services/use-get-talents-for-candidate-list/use-get-talents-for-candidate-list'
import { useGetRequestForCandidateList } from './data/get-request-for-candidate-list/get-request-for-candidate-list.staff.gql'
import useFiltersConfig from './services/use-filters-config/use-filters-config'

jest.mock('@staff-portal/talents-list', () => ({
  checkBestMatchQueryEnabled: () => false,
  TalentListSearchBar: () => <div data-testid='search-bar'></div>,
  TalentListSkeletonLoader: () => <div data-testid='search-bar-skeleton'></div>
}))

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useQuery: () => jest.fn()
}))

jest.mock('@staff-portal/filters', () => ({
  ...jest.requireActual('@staff-portal/filters'),
  Filters: () => <div data-testid='filters'></div>,
  Pagination: () => <div data-testid='pagination'></div>
}))

jest.mock(
  './services/use-handle-talent-list-filters/use-handle-talent-list-filters',
  () => ({
    __esModule: true,
    default: jest.fn()
  })
)
jest.mock('./containers/CandidateListItem/CandidateListItem', () => ({
  __esModule: true,
  default: () => <div data-testid='CandidateListItem' />
}))
jest.mock('./services/use-filters-config/use-filters-config', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock(
  './data/get-request-for-candidate-list/get-request-for-candidate-list.staff.gql',
  () => ({
    useGetRequestForCandidateList: jest.fn()
  })
)

jest.mock(
  './services/use-get-talents-for-candidate-list/use-get-talents-for-candidate-list',
  () => ({
    __esModule: true,
    default: jest.fn()
  })
)

jest.mock('@staff-portal/config', () => ({
  ENVIRONMENT: 'production'
}))

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useParams: jest.fn()
}))

jest.mock('@staff-portal/query-params-state', () => ({
  __esModule: true,
  ...jest.requireActual('@staff-portal/query-params-state'),
  useQueryParamsState: jest.fn()
}))

const useHandleTalentListFiltersMock = useHandleTalentListFilters as jest.Mock
const useGetRequestForCandidateListMock =
  useGetRequestForCandidateList as jest.Mock
const useGetTalentsForCandidateListMock =
  useGetTalentsForCandidateList as jest.Mock
const useFiltersConfigMock = useFiltersConfig as jest.Mock

describe('GigCandidatesSearch', () => {
  beforeEach(() => {
    useGetRequestForCandidateListMock.mockReturnValue({
      request: createGetGigMock().gig,
      loading: false
    })

    useGetTalentsForCandidateListMock.mockReturnValue({})

    useHandleTalentListFiltersMock.mockReturnValue({
      page: 0,
      filterValues: {
        request_id: 'VjEtUHVibGljYXRpb25HaWctNzE'
      },
      sortOptions: [],
      selectedSkills: [],
      resolvingFilters: false,
      handlePageChange: jest.fn(),
      handleFilterChange: jest.fn(),
      handleSkillSelect: jest.fn(),
      handleSkillDeselect: jest.fn()
    })
    useFiltersConfigMock.mockReturnValue({
      filtersConfig: {}
    })
  })

  it('renders breadcrumbs', () => {
    render(
      <TestWrapper>
        <GigCandidatesSearch />
      </TestWrapper>
    )

    const listBreadcrumb = screen.getByText('Toptal Publications')
    const requestBreadcrumb = screen.getByText(
      'Interacting With Python Files From Frontend Elements'
    )

    expect(listBreadcrumb).toBeInTheDocument()
    expect(listBreadcrumb).toHaveAttribute('href', '/toptal-publications')
    expect(requestBreadcrumb).toBeInTheDocument()
    expect(requestBreadcrumb).toHaveAttribute(
      'href',
      '/toptal-publications/VjEtUHVibGljYXRpb25HaWctNzE'
    )
    expect(screen.getByText('Search Candidates')).toBeInTheDocument()
  })

  it('loads candidates when request id present', () => {
    render(
      <TestWrapper>
        <GigCandidatesSearch />
      </TestWrapper>
    )

    expect(useGetTalentsForCandidateListMock).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: false
      })
    )
  })

  it('does not search with no request id', () => {
    useHandleTalentListFiltersMock.mockReturnValue({
      filterValues: {
        request_id: ''
      },
      selectedSkills: []
    })

    render(
      <TestWrapper>
        <GigCandidatesSearch />
      </TestWrapper>
    )

    expect(useGetTalentsForCandidateListMock).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: true
      })
    )
  })
})
