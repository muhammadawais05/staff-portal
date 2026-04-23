import { CommunityLeaderType } from '@staff-portal/graphql/staff'

import { getCommunityLeaderType } from './get-community-leader-type'

describe('Get community leader type helper', () => {
  it.each([
    {
      result: 'Online Leader',
      type: CommunityLeaderType.ONLINE_LEADER
    },
    {
      result: 'Full Leader',
      type: CommunityLeaderType.COMMUNITY_LEADER
    }
  ])('returns %s for %s type', ({ type, result }) => {
    const leaderType = getCommunityLeaderType(type)

    expect(leaderType).toBe(result)
  })
})
