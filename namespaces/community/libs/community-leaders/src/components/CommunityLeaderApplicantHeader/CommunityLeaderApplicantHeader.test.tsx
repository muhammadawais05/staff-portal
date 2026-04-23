import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  CommunityLeaderApplicationStatus,
  CommunityLeaderOperations,
  CommunityLeaderRecordStatus,
  CommunityLeaderStatus,
  CommunityLeaderType,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'

import CommunityLeaderApplicantHeader from './CommunityLeaderApplicantHeader'
import {
  ApproveCommunityLeaderButton,
  RejectCommunityLeaderButton,
  HoldCommunityLeaderButton
} from '../../components'
import { CommunityLeaderApplicationData, CommunityLeader } from '../../types'

jest.mock(
  '../../components/ApproveCommunityLeaderButton/ApproveCommunityLeaderButton'
)
jest.mock(
  '../../components/RejectCommunityLeaderButton/RejectCommunityLeaderButton'
)
jest.mock(
  '../../components/HoldCommunityLeaderButton/HoldCommunityLeaderButton'
)

const mockApproveCommunityLeaderButton =
  ApproveCommunityLeaderButton as jest.Mock
const mockRejectCommunityLeaderButton = RejectCommunityLeaderButton as jest.Mock
const mockHoldCommunityLeaderButton = HoldCommunityLeaderButton as jest.Mock

const mockDate = '2021-08-06'

const COMMUNITY_LEADER: CommunityLeader = {
  id: '456',
  node: {
    id: '456',
    featuredOrder: 1,
    createdAt: mockDate,
    requestedAt: mockDate,
    reviewedAt: mockDate,
    type: CommunityLeaderType.COMMUNITY_LEADER,
    leaderStatus: CommunityLeaderRecordStatus.ACTIVE
  },
  status: CommunityLeaderStatus.APPROVED,
  type: CommunityLeaderType.COMMUNITY_LEADER,
  application: {
    id: '456',
    status: CommunityLeaderApplicationStatus.APPLIED,
    createdAt: mockDate,
    updatedAt: mockDate
  },
  appliedStaffRole: {
    id: '456',
    email: 'john.doe@toptal.com',
    fullName: 'John Doe',
    photo: {
      default: ''
    },
    location: {
      country: {
        id: '1',
        name: 'Spain'
      },
      cityName: 'Córdoba',
      stateName: 'Andalucía'
    },
    webResource: {
      text: 'Name',
      url: null
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
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    unfeatureCommunityLeader: {
      callable: OperationCallableTypes.ENABLED,
      messages: ['Leader is not featured.']
    },
    holdCommunityLeaderApplication: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  }
}

describe('CommunityLeaderApplicantHeader', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    mockApproveCommunityLeaderButton.mockReturnValue(<button>Approve</button>)
    mockRejectCommunityLeaderButton.mockReturnValue(<button>Reject</button>)
    mockHoldCommunityLeaderButton.mockReturnValue(<button>Hold</button>)
  })

  describe('when application is in APPLIED state', () => {
    it('renders approve, reject and hold buttons', () => {
      render(
        <TestWrapper>
          <CommunityLeaderApplicantHeader
            communityLeader={COMMUNITY_LEADER}
            refetchQueries={[]}
          />
        </TestWrapper>
      )

      expect(mockApproveCommunityLeaderButton).toHaveBeenCalledWith(
        {
          id: '456',
          name: 'John Doe',
          onApproveLeader: undefined,
          operation: {
            callable: 'ENABLED',
            messages: []
          },
          refetchQueries: []
        },
        {}
      )
      expect(mockRejectCommunityLeaderButton).toHaveBeenCalledWith(
        {
          id: '456',
          name: 'John Doe',
          onRejectLeader: undefined,
          operation: {
            callable: 'ENABLED',
            messages: []
          },
          refetchQueries: []
        },
        {}
      )
      expect(mockHoldCommunityLeaderButton).toHaveBeenCalledWith(
        {
          id: '456',
          name: 'John Doe',
          onHoldLeader: undefined,
          operation: {
            callable: 'ENABLED',
            messages: []
          },
          refetchQueries: []
        },
        {}
      )
    })
  })

  describe('when application is in REJECTED state', () => {
    it('renders without approve and reject buttons', () => {
      render(
        <TestWrapper>
          <CommunityLeaderApplicantHeader
            communityLeader={{
              ...COMMUNITY_LEADER,
              application: {
                ...(COMMUNITY_LEADER.application as CommunityLeaderApplicationData),
                status: CommunityLeaderApplicationStatus.REJECTED
              },
              operations: {
                ...(COMMUNITY_LEADER.operations as CommunityLeaderOperations),
                approveCommunityLeaderApplication: {
                  callable: OperationCallableTypes.DISABLED,
                  messages: []
                },
                rejectCommunityLeaderApplication: {
                  callable: OperationCallableTypes.DISABLED,
                  messages: []
                },
                holdCommunityLeaderApplication: {
                  callable: OperationCallableTypes.DISABLED,
                  messages: []
                }
              }
            }}
            refetchQueries={[]}
          />
        </TestWrapper>
      )

      expect(mockApproveCommunityLeaderButton).toHaveBeenCalledWith(
        {
          id: '456',
          name: 'John Doe',
          onApproveLeader: undefined,
          operation: {
            callable: 'DISABLED',
            messages: []
          },
          refetchQueries: []
        },
        {}
      )
      expect(mockRejectCommunityLeaderButton).toHaveBeenCalledWith(
        {
          id: '456',
          name: 'John Doe',
          onRejectLeader: undefined,
          operation: {
            callable: 'DISABLED',
            messages: []
          },
          refetchQueries: []
        },
        {}
      )
    })
  })
})
