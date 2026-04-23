import { CommunityLeaderType } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { successMutationMock } from '~integration/mocks/mutations'

const updateSortFeaturedCommunityLeadersMock = () => {
  cy.stubGraphQLRequests({
    GetFeaturedCommunityLeaders: {
      data: {
        communityFeaturedLeaders: [
          {
            appliedStaffRole: null,
            appliedTalentRole: {
              fullName: 'Euna Conroy',
              id: encodeEntityId('123', 'Talent'),
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
              __typename: 'Talent'
            },
            id: encodeEntityId('123', 'CommunityLeaderAccount'),
            node: {
              about: 'This part was obfuscated',
              id: encodeEntityId('123', 'CommunityLeader'),
              featuredOrder: 1,
              type: CommunityLeaderType.COMMUNITY_LEADER,
              __typename: 'CommunityLeader'
            },
            __typename: 'CommunityLeaderAccount'
          },
          {
            appliedStaffRole: null,
            appliedTalentRole: {
              fullName: 'Test Conroy',
              id: encodeEntityId('124', 'Talent'),
              webResource: {
                text: 'Test Conroy',
                url: 'https://staging.toptal.net/platform/staff/talents/123',
                __typename: 'Link'
              },
              roleFlags: {
                nodes: [
                  {
                    flag: {
                      id: encodeEntityId('124', 'Flag'),
                      title: 'High Quality Headshot',
                      __typename: 'Flag'
                    },
                    __typename: 'RoleFlag'
                  }
                ],
                __typename: 'RoleFlagConnection'
              },
              __typename: 'Talent'
            },
            id: encodeEntityId('124', 'CommunityLeaderAccount'),
            node: {
              about: 'This part was obfuscated',
              id: encodeEntityId('124', 'CommunityLeader'),
              featuredOrder: 2,
              type: CommunityLeaderType.COMMUNITY_LEADER,
              __typename: 'CommunityLeader'
            },
            __typename: 'CommunityLeaderAccount'
          }
        ]
      }
    },
    ReorderFeaturedCommunityLeaders: {
      data: { reorderFeaturedCommunityLeaders: successMutationMock() }
    }
  })
}

export default updateSortFeaturedCommunityLeadersMock
