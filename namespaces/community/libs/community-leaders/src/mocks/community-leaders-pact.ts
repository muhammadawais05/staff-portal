import { pactMatchers, Matchers } from '@staff-portal/pact-utils'

const { string, integer, somethingLike } = Matchers

export const communityLeadersMock = {
  data: {
    communityLeaders: {
      totalCount: integer(1),
      nodes: [
        {
          application: null,
          appliedTalentRole: null,
          appliedStaffRole: {
            fullName: string('Laraine Tillman'),
            email: somethingLike('bach-1b9a4f54698b9fa8@toptal.io'),
            location: null,
            photo: null,
            id: pactMatchers.id(),
            roleFlags: null,
            webResource: {
              text: somethingLike('Alexander Danilenko'),
              url: null,
              __typename: 'Link'
            },
            __typename: 'Staff'
          },
          id: pactMatchers.id(),
          node: {
            about: null,
            id: pactMatchers.id(),
            featuredOrder: 1,
            createdAt: pactMatchers.time(),
            requestedAt: pactMatchers.time(),
            reviewedAt: null,
            memos: string('memo'),
            leaderStatus: string('ACTIVE'),
            type: somethingLike('ONLINE_LEADER'),
            __typename: 'CommunityLeader'
          },
          operations: {
            appointCommunityLeader: {
              callable: string('ENABLED'),
              messages: ['Community leader or community leader application already exists.']
            },
            updateCommunityLeader: {
              callable: string('ENABLED'),
              messages: []
            },
            rejectCommunityLeaderApplication: {
              callable: string('ENABLED'),
              messages: ['Community leader application does not exist for this user']
            },
            removeCommunityLeader: {
              callable: string('ENABLED'),
              messages: []
            },
            approveCommunityLeaderApplication: {
              callable: string('ENABLED'),
              messages: ['Community leader application does not exist for this user']
            },
            restoreCommunityLeader: {
              callable: string('ENABLED'),
              messages: ['Only removed Community Leaders can be restored.']
            },
            holdCommunityLeaderApplication: {
              callable: string('ENABLED'),
              messages: ['Community leader application does not exist for this user']
            },
            featureCommunityLeader: {
              callable: string('ENABLED'),
              messages: ['Leader is already featured.']
            },
            unfeatureCommunityLeader: {
              callable: string('ENABLED'),
              messages: []
            },
            __typename: 'CommunityLeaderOperations'
          },
          status: somethingLike('APPROVED'),
          type: 'ONLINE_LEADER',
          __typename: 'CommunityLeaderAccount'
        }
      ],
      __typename: 'CommunityLeaderAccountConnection'
    }
  }
}

export const communityLeadersMockCheck = {
  communityLeaders: {
    __typename: 'CommunityLeaderAccountConnection'
  }
}
