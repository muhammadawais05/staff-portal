import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { DetailedList } from '@staff-portal/ui'

import StaffTab from './StaffTab'
import { useGetStaffGeneralData } from '../../data/get-staff-general-data/get-staff-general-data.staff.gql'
import { communityLeadersListMock } from '../../mocks/community-leaders'

jest.mock('../../data/get-staff-general-data/get-staff-general-data.staff.gql')
jest.mock('@staff-portal/ui')

const mockUseGetStaffGeneralData = useGetStaffGeneralData as jest.Mock
const DetailedListMock = DetailedList as unknown as jest.Mock

const [COMMUNITY_LEADER] = communityLeadersListMock

const arrangeTest = () => {
  render(
    <TestWrapper>
      <StaffTab
        communityLeaderId={COMMUNITY_LEADER.id}
        communityLeader={COMMUNITY_LEADER}
        communityLeaderBasicInfo={{
          __typename: 'Staff',
          id: '1',
          fullName: 'Alex Casillas',
          operations: {
            appointCommunityLeader: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            }
          }
        }}
      />
    </TestWrapper>
  )
}

describe('StaffTab', () => {
  it('renders loading skeleton', () => {
    mockUseGetStaffGeneralData.mockReturnValueOnce({
      loading: true,
      data: undefined
    })

    arrangeTest()

    expect(
      screen.getByTestId('communityLeaderProfileLoader')
    ).toBeInTheDocument()
    expect(
      screen.queryByText('Could not get community leader profile')
    ).not.toBeInTheDocument()
    expect(DetailedListMock).not.toHaveBeenCalled()
  })

  it('renders placeholder message if there is no data', () => {
    mockUseGetStaffGeneralData.mockReturnValueOnce({
      loading: false,
      data: null
    })

    arrangeTest()

    expect(
      screen.getByText('Could not get community leader profile')
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId('communityLeaderProfileLoader')
    ).not.toBeInTheDocument()
    expect(DetailedListMock).not.toHaveBeenCalled()
  })

  it('renders data when it is present', () => {
    DetailedListMock.mockReturnValue(<div />)
    mockUseGetStaffGeneralData.mockReturnValueOnce({
      loading: false,
      data: {}
    })

    arrangeTest()

    expect(
      screen.queryByText('Could not get community leader profile')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('communityLeaderProfileLoader')
    ).not.toBeInTheDocument()
    expect(DetailedListMock).toHaveBeenCalledTimes(1)
  })
})
