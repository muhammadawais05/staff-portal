import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { DetailedList } from '@staff-portal/ui'
import {
  useGetTalentGeneralData,
  useRejectForInactivityFields
} from '@staff-portal/talents-profile'

import TalentTab from './TalentTab'
import { communityLeadersListMock } from '../../mocks/community-leaders'

jest.mock('@staff-portal/talents-profile')
jest.mock('@staff-portal/ui')

const mockUseGetTalentGeneralData = useGetTalentGeneralData as jest.Mock
const mockUseRejectForInactivityFields =
  useRejectForInactivityFields as jest.Mock
const DetailedListMock = DetailedList as unknown as jest.Mock

const [COMMUNITY_LEADER] = communityLeadersListMock

const arrangeTest = () => {
  render(
    <TestWrapper>
      <TalentTab
        talentId={COMMUNITY_LEADER.id}
        communityLeader={COMMUNITY_LEADER}
        communityLeaderBasicInfo={{
          __typename: 'Talent',
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

describe('TalentTab', () => {
  beforeEach(() => {
    mockUseRejectForInactivityFields.mockReturnValueOnce({})
  })

  it('renders loading skeleton', () => {
    mockUseGetTalentGeneralData.mockReturnValueOnce({
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
    mockUseGetTalentGeneralData.mockReturnValueOnce({
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
    mockUseGetTalentGeneralData.mockReturnValue({
      loading: false,
      data: { operations: {} }
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
