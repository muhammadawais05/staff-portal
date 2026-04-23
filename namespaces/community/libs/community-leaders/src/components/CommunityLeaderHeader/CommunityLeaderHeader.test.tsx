import React from 'react'
import { render, screen } from '@testing-library/react'
import { getCommunityLeadersProfilePath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  CommunityLeaderRecordStatus,
  CommunityLeaderStatus,
  CommunityLeaderType,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'

import CommunityLeaderHeader from './CommunityLeaderHeader'
import { CommunityLeaderData } from '../../types'

jest.mock('@staff-portal/data-layer-service', () => ({
  decodeEntityId: jest.fn()
}))

jest.mock('@staff-portal/routes', () => ({
  getCommunityLeadersProfilePath: jest.fn()
}))

const decodeEntityIdMock = decodeEntityId as jest.Mock
const getCommunityLeadersProfilePathMock =
  getCommunityLeadersProfilePath as jest.Mock

const mockLeader: CommunityLeaderData = {
  id: '1234',
  status: CommunityLeaderStatus.APPROVED,
  type: CommunityLeaderType.COMMUNITY_LEADER,
  application: null,
  node: {
    id: 'VjEtVGFsZW50Q29tbXVuaXR5Q29tbXVuaXR5TGVhZGVyLTE1',
    requestedAt: '2021-08-06',
    createdAt: '2021-08-06',
    type: CommunityLeaderType.COMMUNITY_LEADER,
    leaderStatus: CommunityLeaderRecordStatus.ACTIVE
  },
  appliedStaffRole: {
    id: 'VjEtVGFsZW50Q29tbXVuaXR5Um9sZS0yNzQ0Nzc3',
    fullName: 'Adriana Koch',
    photo: null,
    email: 'alex.casillas@toptal.com',
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
  },
  operations: {
    appointCommunityLeader: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    updateCommunityLeader: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    rejectCommunityLeaderApplication: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    removeCommunityLeader: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    approveCommunityLeaderApplication: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    restoreCommunityLeader: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    featureCommunityLeader: {
      callable: OperationCallableTypes.HIDDEN,
      messages: []
    },
    unfeatureCommunityLeader: {
      callable: OperationCallableTypes.HIDDEN,
      messages: ['Leader is not featured.']
    },
    holdCommunityLeaderApplication: {
      callable: OperationCallableTypes.HIDDEN,
      messages: []
    }
  }
}

const arrangeTest = (communityLeader: CommunityLeaderData) =>
  render(
    <TestWrapper>
      <CommunityLeaderHeader communityLeader={communityLeader} />
    </TestWrapper>
  )

describe('CommunityLeaderHeader', () => {
  beforeEach(() => {
    decodeEntityIdMock.mockReturnValue({ type: 'Talent', id: '1' })
    getCommunityLeadersProfilePathMock.mockReturnValue(`/community_leaders/1`)
  })

  it('renders the component', () => {
    arrangeTest(mockLeader)

    expect(screen.getByText('Adriana Koch')).toBeInTheDocument()
  })
})
