import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  CommunityLeaderApplicationStatus,
  CommunityLeaderRecordStatus,
  CommunityLeaderStatus,
  CommunityLeaderType,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import {
  ApproveCommunityLeaderButton,
  RejectCommunityLeaderButton,
  RemoveCommunityLeaderButton,
  RestoreCommunityLeaderButton,
  HoldCommunityLeaderButton
} from '../../../components'
import TalentCommunityLeaderField, {
  Props as TalentCommunityLeaderFieldProps
} from './TalentCommunityLeaderField'

jest.mock('../../../components')

const OPERATIONS = {
  appointCommunityLeader: {
    callable: OperationCallableTypes.HIDDEN,
    messages: []
  },
  updateCommunityLeader: {
    callable: OperationCallableTypes.HIDDEN,
    messages: []
  },
  rejectCommunityLeaderApplication: {
    callable: OperationCallableTypes.HIDDEN,
    messages: []
  },
  removeCommunityLeader: {
    callable: OperationCallableTypes.HIDDEN,
    messages: []
  },
  approveCommunityLeaderApplication: {
    callable: OperationCallableTypes.HIDDEN,
    messages: []
  },
  restoreCommunityLeader: {
    callable: OperationCallableTypes.HIDDEN,
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

const mockApproveCommunityLeaderButton =
  ApproveCommunityLeaderButton as jest.Mock
const mockRejectCommunityLeaderButton = RejectCommunityLeaderButton as jest.Mock
const mockRemoveCommunityLeaderButton = RemoveCommunityLeaderButton as jest.Mock
const mockRestoreCommunityLeaderButton =
  RestoreCommunityLeaderButton as jest.Mock
const mockHoldCommunityLeaderButton = HoldCommunityLeaderButton as jest.Mock
const SHARED_ID = '123465'

const arrangeTest = (props: Partial<TalentCommunityLeaderFieldProps>) => {
  mockApproveCommunityLeaderButton.mockReturnValue(<button>Approve</button>)
  mockRejectCommunityLeaderButton.mockReturnValue(<button>Reject</button>)
  mockRemoveCommunityLeaderButton.mockReturnValue(<button>Remove</button>)
  mockRestoreCommunityLeaderButton.mockReturnValue(<button>Restore</button>)
  mockHoldCommunityLeaderButton.mockReturnValue(<button>Hold</button>)
  const MERGED_PROPS: TalentCommunityLeaderFieldProps = {
    id: SHARED_ID,
    name: 'John Doe',
    communityLeaderData: {
      id: SHARED_ID,
      status: CommunityLeaderStatus.APPROVED,
      type: CommunityLeaderType.COMMUNITY_LEADER,
      application: {
        id: SHARED_ID,
        createdAt: '2021-10-11',
        updatedAt: '2021-10-11',
        status: CommunityLeaderApplicationStatus.APPROVED
      },
      node: {
        requestedAt: '2021-10-11',
        createdAt: '2021-10-11',
        id: SHARED_ID,
        leaderStatus: CommunityLeaderRecordStatus.ACTIVE,
        type: CommunityLeaderType.COMMUNITY_LEADER
      },
      appliedStaffRole: {
        id: SHARED_ID,
        fullName: 'John Doe',
        email: 'john.doe@toptal.com',
        webResource: {
          text: 'John Doe',
          url: 'http://staff-portal.toptal.net/talent/profile'
        }
      },
      ...props?.communityLeaderData
    },
    communityLeaderBasicInfo: {
      __typename: 'Staff',
      fullName: 'John Doe',
      id: SHARED_ID,
      operations: {
        appointCommunityLeader: OPERATIONS.appointCommunityLeader
      }
    },
    ...props
  }

  return render(
    <TestWrapper>
      <TalentCommunityLeaderField {...MERGED_PROPS} />
    </TestWrapper>
  )
}

describe('TalentCommunityLeaderField', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders default row when talent never applied', () => {
    arrangeTest({
      communityLeaderData: {
        id: SHARED_ID,
        operations: {
          ...OPERATIONS,
          appointCommunityLeader: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          }
        }
      }
    })

    expect(screen.getByText('Not Applied')).toBeInTheDocument()
    expect(screen.getByText('Set As Community Leader')).toBeInTheDocument()
  })

  it('renders properly when status is "APPLIED"', () => {
    arrangeTest({
      communityLeaderData: {
        id: SHARED_ID,
        status: CommunityLeaderStatus.APPLIED,
        application: {
          id: SHARED_ID,
          createdAt: '2021-10-11',
          updatedAt: '2021-10-11',
          status: CommunityLeaderApplicationStatus.APPLIED
        },
        operations: {
          ...OPERATIONS,
          approveCommunityLeaderApplication: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          },
          rejectCommunityLeaderApplication: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          }
        }
      }
    })

    expect(screen.getByText('Applied')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Approve' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reject' })).toBeInTheDocument()
  })

  it('renders properly when status is "ON_HOLD"', () => {
    arrangeTest({
      communityLeaderData: {
        id: SHARED_ID,
        status: CommunityLeaderStatus.ON_HOLD,
        application: {
          id: SHARED_ID,
          createdAt: '2021-10-11',
          updatedAt: '2021-10-11',
          status: CommunityLeaderApplicationStatus.ON_HOLD
        },
        operations: OPERATIONS
      }
    })

    expect(screen.getByText('Paused')).toBeInTheDocument()
  })

  it('renders properly when status is "REJECTED"', () => {
    arrangeTest({
      communityLeaderData: {
        id: SHARED_ID,
        status: CommunityLeaderStatus.REJECTED,
        operations: {
          ...OPERATIONS,
          appointCommunityLeader: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          }
        }
      }
    })

    expect(screen.getByText('Rejected')).toBeInTheDocument()
    expect(screen.getByText('Set As Community Leader')).toBeInTheDocument()
  })

  describe('when status is "APPROVED"', () => {
    it('renders properly with link to community leader page', () => {
      arrangeTest({
        communityLeaderData: {
          id: SHARED_ID,
          status: CommunityLeaderStatus.APPROVED,
          operations: {
            ...OPERATIONS,
            appointCommunityLeader: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            },
            updateCommunityLeader: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            }
          }
        },
        viewMode: 'talent'
      })

      expect(screen.getByText('Approved')).toHaveAttribute(
        'href',
        `/community_leaders/${SHARED_ID}`
      )
    })

    it('renders properly without link to community leader page', () => {
      arrangeTest({
        communityLeaderData: {
          id: SHARED_ID,
          status: CommunityLeaderStatus.APPROVED,
          operations: {
            ...OPERATIONS,
            removeCommunityLeader: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            },
            updateCommunityLeader: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            }
          }
        },
        viewMode: 'default'
      })

      expect(screen.getByText('Approved')).not.toHaveAttribute('href')
    })
  })

  describe('when status is "DELETED"', () => {
    it('renders properly with link to community leader page', () => {
      arrangeTest({
        communityLeaderData: {
          id: SHARED_ID,
          status: CommunityLeaderStatus.DELETED,
          operations: {
            ...OPERATIONS,
            restoreCommunityLeader: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            }
          }
        },
        viewMode: 'talent'
      })

      expect(screen.getByText('Deleted')).toHaveAttribute(
        'href',
        `/community_leaders/${SHARED_ID}`
      )
      expect(
        screen.getByRole('button', { name: 'Restore' })
      ).toBeInTheDocument()
    })

    it('renders properly without link to community leader page', () => {
      arrangeTest({
        communityLeaderData: {
          id: SHARED_ID,
          status: CommunityLeaderStatus.DELETED,
          operations: {
            ...OPERATIONS,
            restoreCommunityLeader: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            }
          }
        },
        viewMode: 'default'
      })

      expect(screen.getByText('Deleted')).not.toHaveAttribute('href')
      expect(
        screen.getByRole('button', { name: 'Restore' })
      ).toBeInTheDocument()
    })
  })
})
