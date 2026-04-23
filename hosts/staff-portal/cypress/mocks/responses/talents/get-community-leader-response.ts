import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Talent } from '@staff-portal/graphql/staff'

export const getCommunityLeaderResponse = (talent?: Partial<Talent>) => ({
  data: {
    communityLeader: {
      status: 'APPROVED',
      application: null,
      id: encodeEntityId('432', 'CommunityLeaderAccount'),
      node: {
        about: 'some text',
        createdAt: '2021-08-06T15:08:06+02:00',
        featuredOrder: null,
        id: encodeEntityId('123', 'Talent'),
        leaderStatus: 'ACTIVE',
        memos: null,
        requestedAt: '2021-08-06T15:08:06+02:00',
        reviewedAt: null,
        type: 'COMMUNITY_LEADER',
        __typename: 'CommunityLeader'
      },
      appliedStaffRole: {
        fullName: 'Euna Conroy',
        id: encodeEntityId('123', 'Talent'),
        photo: null,
        roleFlags: {
          nodes: [
            {
              flag: {
                id: encodeEntityId('123', 'Flag'),
                title: 'Screening Paused',
                __typename: 'Flag'
              },
              __typename: 'RoleFlag'
            }
          ],
          __typename: 'RoleFlagConnection'
        },
        webResource: {
          text: 'Euna Conroy',
          url: 'https://staging.toptal.net/platform/staff/talents/123',
          __typename: 'Link'
        },
        type: 'COMMUNITY_LEADER',
        email: 'euna.conroy@toptal.com',
        location: {
          country: {
            id: '1',
            name: 'Spain'
          },
          cityName: 'Córdoba',
          stateName: 'Andalucía'
        }
      },
      type: null,
      operations: null,
      ...talent,
      __typename: 'CommunityLeaderAccount'
    }
  }
})
