import { CommunityLeaderType } from '@staff-portal/graphql/staff'

export const getCommunityLeaderType = (type: CommunityLeaderType) => {
  const communityLeaderTypeMap: Record<CommunityLeaderType, string> = {
    [CommunityLeaderType.COMMUNITY_LEADER]: 'Full Leader',
    [CommunityLeaderType.ONLINE_LEADER]: 'Online Leader'
  }

  return communityLeaderTypeMap[type]
}
