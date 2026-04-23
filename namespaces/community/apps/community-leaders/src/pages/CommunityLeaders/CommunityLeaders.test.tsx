import React, { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  CommunityLeaderListSkeletonLoader,
  useCommunityLeadersFilterOptions,
  useCommunityLeadersFiltersConfig,
  useGetCommunityLeadersAccount,
} from '@staff-portal/community-leaders'
import { CommunityLeaderType } from '@staff-portal/graphql/staff'

import CommunityLeaders from './CommunityLeaders'

jest.mock('@staff-portal/page-wrapper', () => ({
  ...jest.requireActual('@staff-portal/page-wrapper'),
  ContentWrapper:  ({ children, actions, title }: { children: ReactNode, actions: ReactNode, title: string }) => (
    <>
    <div> {title}</div>
    <div data-testid="Actions"> {actions}</div>
    <div data-testid='ContentWrapper'>{children}</div>
    </>
  )
}))

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  RouterLink:  ({ children }: { children: ReactNode }) => (
    <>
    <div data-testid='RouterChild'>{children}</div>
    </>
  )
}))

jest.mock('@staff-portal/community-leaders')

const mockUseCommunityLeadersFilterOptions =
  useCommunityLeadersFilterOptions as jest.Mock
const mockUseCommunityLeadersFiltersConfig =
  useCommunityLeadersFiltersConfig as jest.Mock
const mockUseGetCommunityLeadersAccount =
  useGetCommunityLeadersAccount as jest.Mock
const mockCommunityLeaderListSkeletonLoader = CommunityLeaderListSkeletonLoader as jest.Mock

describe('Community leaders page', () => {
  beforeEach(() => {
    mockUseCommunityLeadersFilterOptions.mockReturnValue({
      filterValues: { type: [CommunityLeaderType.ONLINE_LEADER] },
      pagination: { page: 1 }
    })
    mockUseCommunityLeadersFiltersConfig.mockReturnValue({})
    mockUseGetCommunityLeadersAccount.mockReturnValue({})
  })



  it('renders page with filters and pagination', () => {
  const {getByText} =  render(
      <TestWrapper>
        <CommunityLeaders />
      </TestWrapper>
    )


    expect(getByText('Community Leaders')).toBeInTheDocument()
    expect(getByText('Sort Featured Leaders')).toBeInTheDocument()
    expect(mockUseGetCommunityLeadersAccount).toHaveBeenCalledWith({
      filter: {
        type: CommunityLeaderType.ONLINE_LEADER
      },
      pagination: { page: 1 }
    })
  })

  it('render nothing while we loading', () => {

    mockUseGetCommunityLeadersAccount.mockReturnValue({loading: true, data: undefined})
    mockCommunityLeaderListSkeletonLoader.mockReturnValue(<div>loading</div>)
  const {getByText} =  render(
      <TestWrapper>
        <CommunityLeaders />
      </TestWrapper>
    )

    expect(getByText('loading')).toBeInTheDocument();
  })




})
