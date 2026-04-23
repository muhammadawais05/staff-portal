import React from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { MemoryRouter } from '@staff-portal/navigation'
import { hasAuthorizationError } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import { createRateChangeRequestMock } from '../../data/rate-change-request-fragment/mocks'
import RateChangeRequestListFilters from './components/RateChangeRequestListFilters'
import { RateChangeRequestItem } from '../../components'
import { useGetRateChangeRequestList } from '../../data'
import RateChangeRequestList from './RateChangeRequestList'

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  hasAuthorizationError: jest.fn()
}))

jest.mock('../../data', () => ({
  ...jest.requireActual('../../data'),
  useGetRateChangeRequestList: jest.fn()
}))

jest.mock('@staff-portal/talents/src/components/SkillTag', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <>{name}</>
}))

jest.mock('./components/RateChangeRequestListFilters', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('../../components/RateChangeRequestItem', () => ({
  __esModule: true,
  default: jest.fn()
}))

const mockedRateChangeRequestListFilters =
  RateChangeRequestListFilters as unknown as jest.Mock
const mockedRateChangeRequestItem =
  RateChangeRequestItem as unknown as jest.Mock
const mockedHasAuthorizationError = hasAuthorizationError as jest.Mock
const mockedUseGetRateChangeRequestList =
  useGetRateChangeRequestList as jest.Mock

const arrangeTest = async () => {
  render(
    <TestWrapper>
      <MemoryRouter>
        <RateChangeRequestList />
      </MemoryRouter>
    </TestWrapper>
  )
  await waitForElementToBeRemoved(() => screen.getAllByRole('progressbar'))
}

describe('RateChangeRequestList', () => {
  beforeEach(() => {
    mockedRateChangeRequestListFilters.mockReturnValue(null)
    mockedRateChangeRequestItem.mockReturnValue(null)
    mockedHasAuthorizationError.mockReturnValue(false)
  })

  it('shows filters and no results message when there is no data', async () => {
    mockedUseGetRateChangeRequestList.mockReturnValue({
      loading: false,
      data: {
        rateChangeRequests: [],
        totalCount: 0
      }
    })

    await arrangeTest()

    expect(screen.getByTestId('content-title')).toHaveTextContent(
      'Rate Change Requests (0)'
    )
    expect(mockedRateChangeRequestListFilters).toHaveBeenCalledWith(
      expect.objectContaining({
        filterValues: {}
      }),
      {}
    )
    expect(mockedRateChangeRequestItem).not.toHaveBeenCalled()
    expect(
      screen.queryByText(
        'There are no rate change requests for this search criteria'
      )
    ).toBeInTheDocument()
  })

  it('shows filters and rate change request items when data is available', async () => {
    const rateChangeRequest = createRateChangeRequestMock()

    mockedUseGetRateChangeRequestList.mockReturnValue({
      loading: false,
      data: {
        rateChangeRequests: [rateChangeRequest],
        totalCount: 1
      }
    })
    mockedHasAuthorizationError.mockReturnValue(true)

    await arrangeTest()

    expect(screen.getByTestId('content-title')).toHaveTextContent(
      'Rate Change Requests (1)'
    )
    expect(mockedRateChangeRequestListFilters).toHaveBeenCalledWith(
      expect.objectContaining({
        filterValues: {}
      }),
      {}
    )
    expect(mockedRateChangeRequestItem).toHaveBeenCalledWith(
      expect.objectContaining({
        rateChangeRequest,
        rateRecommendationUnauthorized: true
      }),
      {}
    )
  })
})
