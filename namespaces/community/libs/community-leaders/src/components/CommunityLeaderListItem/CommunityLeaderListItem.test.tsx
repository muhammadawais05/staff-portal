import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  CommunityLeaderRecordStatus,
  CommunityLeaderType,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'

import CommunityLeaderListItem from './CommunityLeaderListItem'
import {
  RemoveCommunityLeaderButton,
  RestoreCommunityLeaderButton,
  FeatureCommunityLeaderButton,
  RemoveFeaturedCommunityLeaderButton
} from '../../components'
import { CommunityLeader } from '../../types'
import CommunityLeaderUpdateField from '../CommunityLeaderUpdateField'

jest.mock('../../components/RemoveCommunityLeaderButton')
jest.mock('../../components/RestoreCommunityLeaderButton')
jest.mock('../../components/FeatureCommunityLeaderButton')
jest.mock('../../components/RemoveFeaturedCommunityLeaderButton')
jest.mock('../CommunityLeaderUpdateField')
const mockRemoveCommunityLeaderButton = RemoveCommunityLeaderButton as jest.Mock
const mockRestoreCommunityLeaderButton =
  RestoreCommunityLeaderButton as jest.Mock
const mockFeatureCommunityLeaderButton =
  FeatureCommunityLeaderButton as jest.Mock
const mockRemoveFeaturedCommunityLeaderButton =
  RemoveFeaturedCommunityLeaderButton as jest.Mock
const mockCommunityLeaderUpdateField = CommunityLeaderUpdateField as jest.Mock
const SHARED_ID = '123'
const SHARED_NAME = 'Adriana Koch'

const CL_NODE_DATA: CommunityLeader['node'] = {
  id: SHARED_ID,
  featuredOrder: 1,
  createdAt: '',
  requestedAt: '',
  reviewedAt: '',
  type: CommunityLeaderType.COMMUNITY_LEADER,
  leaderStatus: CommunityLeaderRecordStatus.ACTIVE
}
const CL_ROLE_DATA: CommunityLeader['appliedStaffRole'] = {
  id: 'VjEtVGFsZW50Q29tbXVuaXR5Um9sZS0yNzQ0Nzc3',
  fullName: SHARED_NAME,
  photo: null,
  email: 'john@doe.com',
  webResource: {
    text: 'Name',
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

const DEFAULT_LEADER_DATA: CommunityLeader = {
  id: SHARED_ID,
  node: CL_NODE_DATA,
  appliedStaffRole: CL_ROLE_DATA,
  operations: {
    appointCommunityLeader: {
      callable: OperationCallableTypes.HIDDEN,
      messages: [
        'Community leader or community leader application already exists.'
      ]
    },
    updateCommunityLeader: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    rejectCommunityLeaderApplication: {
      callable: OperationCallableTypes.HIDDEN,
      messages: ['Community leader application does not exist for this user']
    },
    removeCommunityLeader: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    approveCommunityLeaderApplication: {
      callable: OperationCallableTypes.HIDDEN,
      messages: ['Community leader application does not exist for this user']
    },
    restoreCommunityLeader: {
      callable: OperationCallableTypes.HIDDEN,
      messages: ['Only removed Community Leaders can be restored.']
    },
    featureCommunityLeader: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    unfeatureCommunityLeader: {
      callable: OperationCallableTypes.HIDDEN,
      messages: ['Leader is not featured.']
    },
    holdCommunityLeaderApplication: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  }
}

describe('CommunityLeaderListItem', () => {
  beforeEach(() => {
    mockRemoveCommunityLeaderButton.mockReturnValue(<button>Remove</button>)
    mockRestoreCommunityLeaderButton.mockReturnValue(<button>Restore</button>)
    mockFeatureCommunityLeaderButton.mockReturnValue(<button>Feature</button>)
    mockRemoveFeaturedCommunityLeaderButton.mockReturnValue(
      <button>Remove Featured</button>
    )
    mockCommunityLeaderUpdateField.mockReturnValue(<div>full leader</div>)
  })

  it('renders component properly', () => {
    render(
      <TestWrapper>
        <CommunityLeaderListItem
          communityLeader={DEFAULT_LEADER_DATA}
          refetchQueries={[]}
        />
      </TestWrapper>
    )

    expect(mockFeatureCommunityLeaderButton).toHaveBeenCalledWith(
      {
        id: SHARED_ID,
        name: SHARED_NAME,
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      },
      {}
    )
    expect(mockRemoveFeaturedCommunityLeaderButton).toHaveBeenCalledWith(
      {
        id: SHARED_ID,
        name: SHARED_NAME,
        operation: {
          callable: OperationCallableTypes.HIDDEN,
          messages: ['Leader is not featured.']
        }
      },
      {}
    )
    expect(mockRemoveCommunityLeaderButton).toHaveBeenCalledWith(
      {
        id: SHARED_ID,
        name: SHARED_NAME,
        refetchQueries: [],
        onRemoveLeader: undefined,
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      },
      {}
    )
    expect(mockRestoreCommunityLeaderButton).toHaveBeenCalledWith(
      {
        id: SHARED_ID,
        communityLeaderData: { ...DEFAULT_LEADER_DATA },
        refetchQueries: [],
        onRestoreLeader: undefined,
        children: 'Restore',
        operation: {
          callable: OperationCallableTypes.HIDDEN,
          messages: ['Only removed Community Leaders can be restored.']
        }
      },
      {}
    )
  })
})
