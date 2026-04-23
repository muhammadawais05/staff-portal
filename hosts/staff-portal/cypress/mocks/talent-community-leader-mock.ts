import {
  CommunityLeaderAccount,
  CommunityLeaderStatus,
  CommunityLeaderType
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock, hiddenOperationMock } from '~integration/mocks'

export const talentCommunityLeaderMock = (
  communityLeader?: Partial<CommunityLeaderAccount>
) => ({
  communityLeader: {
    id: encodeEntityId('123', 'CommunityLeaderAccount'),
    application: {
      id: encodeEntityId('123', 'CommunityLeaderApplication'),
      createdAt: '2022-02-04T15:23:56+03:00',
      interestedIn: CommunityLeaderType.COMMUNITY_LEADER,
      updatedAt: '2022-05-16T22:18:41+02:00',
      holdComment: null,
      initialIdeas: 'being the best cl',
      commitment: true,
      performerComment: '',
      slackChannel: 'a',
      type: CommunityLeaderType.COMMUNITY_LEADER,
      __typename: 'CommunityLeaderApplication',
      status: CommunityLeaderStatus.APPROVED,
      ...communityLeader?.application
    },
    node: {
      id: encodeEntityId('123', 'CommunityLeader'),
      memos: null,
      featuredOrder: null,
      offline: false,
      online: false,
      createdAt: '2022-05-16T21:18:49+02:00',
      requestedAt: '2022-02-04T15:46:16+03:00',
      reviewedAt: '2022-05-16T22:18:41+02:00',
      leaderStatus: 'ACTIVE',
      leaderNotes: null,
      about: 'This part was obfuscated, some content was here.',
      type: 'COMMUNITY_LEADER',
      __typename: 'CommunityLeader',
      ...communityLeader?.node
    },
    operations: {
      appointCommunityLeader: hiddenOperationMock(),
      updateCommunityLeader: enabledOperationMock(),
      removeCommunityLeader: enabledOperationMock(),
      approveCommunityLeaderApplication: hiddenOperationMock(),
      rejectCommunityLeaderApplication: hiddenOperationMock(),
      restoreCommunityLeader: hiddenOperationMock(),
      holdCommunityLeaderApplication: hiddenOperationMock(),
      unfeatureCommunityLeader: hiddenOperationMock(),
      featureCommunityLeader: enabledOperationMock(),
      ...communityLeader?.operations,
      __typename: 'CommunityLeaderOperations'
    },
    appliedStaffRole: {
      email: 'dcer-648f5dc1f365e51a@toptal.io',
      __typename: 'Talent',
      id: encodeEntityId('123', 'Talent'),
      fullName: 'Euna Conroy',
      photo: null,
      location: null,
      webResource: {
        text: 'Euna Conroy',
        url: 'https://staging.toptal.net/platform/staff/talents/123',
        __typename: 'Link'
      },
      roleFlags: {
        nodes: [
          {
            flag: {
              id: encodeEntityId('123', 'Flag'),
              title: 'High Quality Headshot',
              __typename: 'Flag'
            },
            __typename: 'RoleFlag'
          }
        ],
        __typename: 'RoleFlagConnection'
      },
      ...communityLeader?.appliedStaffRole
    },
    appliedTalentRole: {
      __typename: 'Talent',
      email: null,
      id: encodeEntityId('123', 'Talent'),
      fullName: 'Euna Conroy',
      photo: null,
      location: null,
      webResource: {
        text: 'Euna Conroy',
        url: 'https://staging.toptal.net/platform/staff/talents/123',
        __typename: 'Link'
      },
      roleFlags: {
        nodes: [
          {
            flag: {
              id: encodeEntityId('123', 'Flag'),
              title: 'High Quality Headshot',
              __typename: 'Flag'
            },
            __typename: 'RoleFlag'
          }
        ],
        __typename: 'RoleFlagConnection'
      },
      ...communityLeader?.appliedTalentRole
    },
    status: communityLeader?.status,
    __typename: 'CommunityLeaderAccount'
  },
  node: {
    __typename: 'Talent',
    fullName: 'Euna Conroy',
    id: encodeEntityId('123', 'Talent'),
    operations: {
      appointCommunityLeader: enabledOperationMock()
    }
  }
})
