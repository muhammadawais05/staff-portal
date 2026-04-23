import React from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { MemoryRouter } from '@staff-portal/navigation'
import { useGetRoleFlags } from '@staff-portal/role-flags'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { createEmptyGetCoachingAssignees } from '@staff-portal/talents-coaching/src/mocks'

import TalentCoachingList from './TalentCoachingList'
import {
  createGetTalentCoachingEngagementsList,
  createEmptyGetTalentCoachingEngagementsList
} from '../../data/get-talent-coaching-engagements-list/mocks'

jest.mock('@staff-portal/clients', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('@staff-portal/role-flags', () => ({
  __esModule: true,
  default: jest.fn(),
  useGetRoleFlags: jest.fn()
}))
jest.mock('@staff-portal/talents-list', () => ({
  TalentListSkeletonLoader: () => <div data-testid='TalentListSkeletonLoader' />
}))

const useGetRoleFlagsMock = useGetRoleFlags as jest.Mock

const arrangeTest = async (mocks?: MockedResponse[]) => {
  useGetRoleFlagsMock.mockReturnValue({
    loading: false,
    data: [],
    error: false
  })

  render(
    <TestWrapperWithMocks mocks={mocks}>
      <MemoryRouter>
        <TalentCoachingList />
      </MemoryRouter>
    </TestWrapperWithMocks>
  )
  await waitForElementToBeRemoved(() =>
    screen.queryByTestId('TalentListSkeletonLoader')
  )
}

describe('TalentCoachingList', () => {
  it('shows filters and no results message when there is no data', async () => {
    const mocks = [
      createEmptyGetTalentCoachingEngagementsList(),
      createEmptyGetCoachingAssignees()
    ]

    await arrangeTest(mocks)

    expect(screen.getByTestId('content-title')).toHaveTextContent(
      'Talent Coaching List (0)'
    )
    expect(screen.queryByPlaceholderText('Talent Name')).toBeInTheDocument()
    expect(screen.queryByTestId('filters-header')).toBeInTheDocument()
    expect(screen.queryByTestId('Sort Order')).toBeInTheDocument()
    expect(screen.queryByTestId('toggle-filters-form')).toBeInTheDocument()
    expect(
      screen.queryByText(
        'There are no talent coaching for this search criteria'
      )
    ).toBeInTheDocument()
  })

  it('shows filters and coaching items when data is available', async () => {
    const mocks = [
      createGetTalentCoachingEngagementsList(),
      createEmptyGetCoachingAssignees()
    ]

    await arrangeTest(mocks)

    expect(screen.getByTestId('content-title')).toHaveTextContent(
      'Talent Coaching List (1)'
    )
    expect(screen.queryByPlaceholderText('Talent Name')).toBeInTheDocument()
    expect(screen.queryByTestId('filters-header')).toBeInTheDocument()
    expect(screen.queryByTestId('Sort Order')).toBeInTheDocument()
    expect(screen.queryByTestId('toggle-filters-form')).toBeInTheDocument()
    expect(screen.queryAllByTestId('talent-coaching-list-item')).toHaveLength(1)
  })
})
