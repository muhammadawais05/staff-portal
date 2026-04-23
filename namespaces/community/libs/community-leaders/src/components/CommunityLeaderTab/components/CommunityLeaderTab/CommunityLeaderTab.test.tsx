import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  OperationCallableTypes,
  CommunityLeaderStatus,
  CommunityLeaderType
} from '@staff-portal/graphql/staff'

import { useGetCommunityLeader } from '../../../../data/get-community-leader/get-community-leader.staff.gql'
import {
  RemoveCommunityLeaderButton,
  RestoreCommunityLeaderButton,
  ApproveCommunityLeaderButton,
  FeatureCommunityLeaderButton,
  RejectCommunityLeaderButton,
  RemoveFeaturedCommunityLeaderButton,
  MakeCommunityLeaderButton,
  CommunityLeaderApplicationsHistory,
  CommunityLeaderUpdateField
} from '../../../../components'
import CommunityLeaderTab from './CommunityLeaderTab'
import { useUpdateCommunityLeader } from '../../../TalentCommunityLeaderModal/data/update-community-leader'

jest.mock(
  '../../../../data/get-community-leader/get-community-leader.staff.gql'
)
jest.mock('../../../TalentCommunityLeaderModal/data/update-community-leader')
jest.mock('../../../../components')

const mockRemoveCommunityLeaderButton = RemoveCommunityLeaderButton as jest.Mock
const mockRestoreCommunityLeaderButton =
  RestoreCommunityLeaderButton as jest.Mock
const mockMakeCommunityLeaderButton = MakeCommunityLeaderButton as jest.Mock
const mockApproveCommunityLeaderButton =
  ApproveCommunityLeaderButton as jest.Mock
const mockFeatureCommunityLeaderButton =
  FeatureCommunityLeaderButton as jest.Mock
const mockRemoveFeaturedCommunityLeaderButton =
  RemoveFeaturedCommunityLeaderButton as jest.Mock
const mockRejectCommunityLeaderButton = RejectCommunityLeaderButton as jest.Mock
const mockCommunityLeaderApplicationsHistory =
  CommunityLeaderApplicationsHistory as jest.Mock
const mockCommunityLeaderUpdateField = CommunityLeaderUpdateField as jest.Mock
const useGetCommunityLeaderMock = useGetCommunityLeader as jest.Mock
const useUpdateCommunityLeaderMock = useUpdateCommunityLeader as jest.Mock

const OPERATIONS = {
  appointCommunityLeader: {
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
  }
}

const DEFAULT_LEADER_DATA = {
  appliedStaffRole: {
    id: '123',
    fullName: 'John Smith'
  },
  node: {
    id: '123',
    requestedAt: '2021-12-17T03:32:12+03:00',
    type: CommunityLeaderType.COMMUNITY_LEADER,
    about: 'about'
  },
  application: {
    id: '12345',
    performerComment: 'As reviewer of this application, I believe...'
  }
}

const arrangeTest = (
  communityLeaderData: typeof DEFAULT_LEADER_DATA & {
    status?: string
    operations?: typeof OPERATIONS
  } = DEFAULT_LEADER_DATA
) => {
  useUpdateCommunityLeaderMock.mockReturnValue([jest.fn(), { loading: false }])
  useGetCommunityLeaderMock.mockReturnValue({
    data: { communityLeader: communityLeaderData }
  })

  return render(
    <TestWrapper>
      <CommunityLeaderTab talentId={DEFAULT_LEADER_DATA.appliedStaffRole.id} />
    </TestWrapper>
  )
}

describe('CommunityLeaderTab', () => {
  beforeEach(() => {
    mockRemoveCommunityLeaderButton.mockReturnValue(<button>remove</button>)
    mockRestoreCommunityLeaderButton.mockReturnValue(<button>restore</button>)
    mockMakeCommunityLeaderButton.mockReturnValue(<button>make</button>)
    mockApproveCommunityLeaderButton.mockReturnValue(<button>approve</button>)
    mockFeatureCommunityLeaderButton.mockReturnValue(<button>feature</button>)
    mockRemoveFeaturedCommunityLeaderButton.mockReturnValue(
      <button>remove feature</button>
    )
    mockRejectCommunityLeaderButton.mockReturnValue(<button>reject</button>)
    mockCommunityLeaderApplicationsHistory.mockReturnValue(
      <div>application history</div>
    )
    mockCommunityLeaderUpdateField.mockReturnValue(<div>full leader</div>)
  })

  it('renders loading component while data is being fetched', () => {
    useGetCommunityLeaderMock.mockReturnValue({ data: {}, loading: true })

    render(
      <TestWrapper>
        <CommunityLeaderTab talentId='leaderId' />
      </TestWrapper>
    )

    expect(
      screen.queryByTestId('talent-community-leader-section')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('There are no community leader data for this user.')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(
        'Something went wrong while loading community leader data.'
      )
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('community-leader-tab-loader')
    ).toBeInTheDocument()
  })

  it('renders error text when no data is returned as a response', () => {
    useGetCommunityLeaderMock.mockReturnValue({ data: {}, loading: false })

    render(
      <TestWrapper>
        <CommunityLeaderTab talentId='leaderId' />
      </TestWrapper>
    )

    expect(
      screen.queryByTestId('talent-community-leader-section')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('There are no community leader data for this user.')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('community-leader-tab-loader')
    ).not.toBeInTheDocument()
    expect(
      screen.getByText(
        'Something went wrong while loading community leader data.'
      )
    ).toBeInTheDocument()
  })

  it('renders informative text when user is not a community leader', () => {
    useGetCommunityLeaderMock.mockReturnValue({
      data: {
        communityLeader: null,
        basicLeaderInfo: {
          fullName: 'John Doe',
          id: 'leaderId',
          operations: {
            appointCommunityLeader: OPERATIONS.appointCommunityLeader
          }
        }
      },
      loading: false
    })

    render(
      <TestWrapper>
        <CommunityLeaderTab talentId='leaderId' />
      </TestWrapper>
    )

    expect(
      screen.queryByTestId('talent-community-leader-section')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('community-leader-tab-loader')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(
        'Something went wrong while loading community leader data.'
      )
    ).not.toBeInTheDocument()
    expect(
      screen.getByText('There are no community leader data for this user.')
    ).toBeInTheDocument()
    expect(screen.getByText('make')).toBeInTheDocument()
  })

  it('calls applications history component', () => {
    arrangeTest()

    expect(mockCommunityLeaderApplicationsHistory).toHaveBeenCalledTimes(1)
    expect(mockCommunityLeaderApplicationsHistory).toHaveBeenCalledWith(
      {
        communityLeaderId: DEFAULT_LEADER_DATA.node.id
      },
      {}
    )
  })

  it('renders data for talent who never applied', () => {
    arrangeTest({
      ...DEFAULT_LEADER_DATA,
      operations: {
        ...OPERATIONS,
        appointCommunityLeader: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      }
    })

    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getByText('make')).toBeInTheDocument()
    expect(screen.getByText('Not Applied')).toBeInTheDocument()
  })

  it('renders information for rejected talent', () => {
    arrangeTest({
      ...DEFAULT_LEADER_DATA,
      status: CommunityLeaderStatus.REJECTED,
      operations: {
        ...OPERATIONS,
        appointCommunityLeader: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      }
    })

    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getByText('make')).toBeInTheDocument()
    expect(screen.getByText('Rejected')).toBeInTheDocument()
    expect(screen.getByText('about')).toBeInTheDocument()
    expect(
      screen.getByText('As reviewer of this application, I believe...')
    ).toBeInTheDocument()
    expect(screen.getByText('Comments About Application')).toBeInTheDocument()
  })

  it('renders information for applied talent', () => {
    arrangeTest({
      ...DEFAULT_LEADER_DATA,
      status: CommunityLeaderStatus.APPLIED,
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
    })

    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getByText('approve')).toBeInTheDocument()
    expect(screen.getByText('reject')).toBeInTheDocument()
    expect(screen.getByText('Applied')).toBeInTheDocument()
    expect(screen.getByText('about')).toBeInTheDocument()
  })

  it('renders information for approved talent', () => {
    arrangeTest({
      ...DEFAULT_LEADER_DATA,
      status: CommunityLeaderStatus.APPROVED,
      operations: {
        ...OPERATIONS,
        removeCommunityLeader: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      }
    })

    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getByText('feature')).toBeInTheDocument()
    expect(screen.getByText('remove')).toBeInTheDocument()
    expect(screen.getByText('Approved')).toBeInTheDocument()
    expect(screen.getByText('about')).toBeInTheDocument()
    expect(
      screen.getByText('As reviewer of this application, I believe...')
    ).toBeInTheDocument()
    expect(screen.getByText('Comments About Application')).toBeInTheDocument()
  })

  it('renders information for deleted talent', () => {
    arrangeTest({
      ...DEFAULT_LEADER_DATA,
      status: CommunityLeaderStatus.DELETED,
      operations: {
        ...OPERATIONS,
        restoreCommunityLeader: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      }
    })

    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getByText('restore')).toBeInTheDocument()
    expect(screen.getByText('make')).toBeInTheDocument()
    expect(screen.getByText('Deleted')).toBeInTheDocument()
    expect(screen.getByText('about')).toBeInTheDocument()
    expect(
      screen.getByText('As reviewer of this application, I believe...')
    ).toBeInTheDocument()
    expect(screen.getByText('Comments About Application')).toBeInTheDocument()
  })
})
