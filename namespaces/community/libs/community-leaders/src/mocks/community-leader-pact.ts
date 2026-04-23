import { pactMatchers, Matchers } from '@staff-portal/pact-utils'

import { CommunityLeader } from '../types'

const { string, somethingLike } = Matchers

export const communityLeaderMock = {
  data: {
    communityLeader: {
      application: null,
      appliedStaffRole: {
        fullName: string('Laraine Tillman'),
        id: pactMatchers.id(),
        photo: null,
        roleFlags: null,
        webResource: {
          text: string('Laraine Tillman'),
          url: null,
          __typename: 'Link'
        },
        email: somethingLike('staff31@toptal.io'),
        location: null
      },
      appliedTalentRole: null,
      id: pactMatchers.id(),
      node: {
        about: null,
        createdAt: pactMatchers.time(),
        featuredOrder: 1,
        id: pactMatchers.id(),
        leaderStatus: string('ACTIVE'),
        memos: string('memo'),
        requestedAt: pactMatchers.time(),
        reviewedAt: null,
        type: string('COMMUNITY_LEADER'),
        __typename: 'CommunityLeader'
      },
      operations: {
        featureCommunityLeader: {
          callable: string('ENABLED'),
          messages: ['Leader is already featured.']
        },
        unfeatureCommunityLeader: {
          callable: string('ENABLED'),
          messages: []
        },
        appointCommunityLeader: {
          callable: string('HIDDEN'),
          messages: [
            'Community leader or community leader application already exists.'
          ]
        },
        updateCommunityLeader: {
          callable: string('ENABLED'),
          messages: []
        },
        removeCommunityLeader: {
          callable: 'ENABLED',
          messages: []
        },
        approveCommunityLeaderApplication: {
          callable: 'HIDDEN',
          messages: ['Community leader application does not exist for this user']
        },
        rejectCommunityLeaderApplication: {
          callable: 'HIDDEN',
          messages: ['Community leader application does not exist for this user']
        },
        restoreCommunityLeader: {
          callable: 'HIDDEN',
          messages: ['Only removed Community Leaders can be restored.']
        },
        holdCommunityLeaderApplication: {
          callable: 'HIDDEN',
          messages: ['Community leader application does not exist for this user']
        },
        __typename: 'CommunityLeaderOperations'
      },
      status: string('APPROVED'),
      type: string('COMMUNITY_LEADER'),
      __typename: 'CommunityLeaderAccount',
    } as unknown as CommunityLeader,
    node: null
  }
}

export const communityLeaderMockCheck = {
  communityLeader: {
    __typename: 'CommunityLeaderAccount'
  }
}
