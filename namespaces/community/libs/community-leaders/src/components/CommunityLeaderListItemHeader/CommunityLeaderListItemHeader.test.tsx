import React from 'react'
import { render, screen } from '@testing-library/react'
import { getCommunityLeadersProfilePath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  CommunityLeaderRecordStatus,
  CommunityLeaderStatus,
  CommunityLeaderType
} from '@staff-portal/graphql/staff'

import CommunityLeaderListItemHeader from './CommunityLeaderListItemHeader'
import { CommunityLeader } from '../../types'
import { CommunityLeaderNodeFragment } from '../../data/fragments/community-leader-node-fragment.staff.gql.types'

jest.mock('@staff-portal/data-layer-service/src/utils/gql-id-encoder', () => ({
  decodeEntityId: jest.fn()
}))

jest.mock('@staff-portal/routes', () => ({
  getCommunityLeadersProfilePath: jest.fn()
}))

const decodeEntityIdMock = decodeEntityId as jest.Mock
const getCommunityLeadersProfilePathMock =
  getCommunityLeadersProfilePath as jest.Mock

const mockDate = '2021-08-06'

const mockLeader: CommunityLeader = {
  id: '123456789',
  node: {
    id: '1',
    featuredOrder: 0,
    createdAt: mockDate,
    requestedAt: mockDate,
    reviewedAt: mockDate,
    type: CommunityLeaderType.COMMUNITY_LEADER,
    leaderStatus: CommunityLeaderRecordStatus.ACTIVE
  },
  status: CommunityLeaderStatus.APPROVED,
  type: CommunityLeaderType.COMMUNITY_LEADER,
  appliedStaffRole: {
    id: '123465789',
    email: 'alex.casillas@toptal.com',
    fullName: 'Alex Casillas',
    photo: {
      default: ''
    },
    webResource: {
      text: 'Staff Name',
      url: null
    },
    roleFlags: {
      nodes: [
        {
          flag: {
            id: '1',
            title: 'High Quality Headshot'
          }
        },
        {
          flag: {
            id: '2',
            title: 'Community Leader'
          }
        },
        {
          flag: {
            id: '3',
            title: 'Milestone box survey sent'
          }
        }
      ]
    }
  }
}

const arrangeTest = (communityLeader: CommunityLeader) =>
  render(
    <TestWrapper>
      <CommunityLeaderListItemHeader communityLeader={communityLeader} />
    </TestWrapper>
  )

describe('CommunityLeaderListItemHeader', () => {
  beforeEach(() => {
    decodeEntityIdMock.mockReturnValue({ type: 'Talent', id: '1' })
    getCommunityLeadersProfilePathMock.mockReturnValue(`/community_leaders/1`)
  })

  it('renders the component', () => {
    arrangeTest(mockLeader)

    expect(screen.getByText('Alex Casillas')).toBeInTheDocument()
  })

  it('renders a star icon when the community leader is featured', () => {
    arrangeTest({
      ...mockLeader,
      node: {
        ...mockLeader.node,
        featuredOrder: 1
      } as CommunityLeaderNodeFragment
    })

    expect(screen.getByTestId('featured-icon')).toBeInTheDocument()
  })
})
