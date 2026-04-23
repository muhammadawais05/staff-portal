import { pactMatchers, Matchers } from '@staff-portal/pact-utils'

const { string, somethingLike } = Matchers

export const featuredCommunityLeadersMock = {
  data: {
    communityFeaturedLeaders: [{
      appliedStaffRole: {
        id: pactMatchers.id(),
        fullName: string('Laraine Tillman'),
        email: somethingLike('bach-1b9a4f54698b9fa8@toptal.io'),
        photo: null,
        roleFlags: null,
        webResource: {
          text: somethingLike('Alexander Danilenko'),
          url: null,
          __typename: 'Link'
        },
        location: null,
        __typename: somethingLike('Talent')
      },
      appliedTalentRole: null,
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
        type: string('COMMUNITY_LEADER'),
        __typename: 'CommunityLeader'
      },
      __typename: 'CommunityLeaderAccount'
    }]
  }
}

export const featuredCommunityLeadersMockCheck = {
  communityFeaturedLeaders: [{
    __typename: 'CommunityLeaderAccount'
  }]
}
