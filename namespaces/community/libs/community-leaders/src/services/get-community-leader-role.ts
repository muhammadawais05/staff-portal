import {
  CommunityLeader,
  CommunityLeaderApplicationNode,
  CommunityLeaderData
} from '../types'

export const getCommunityLeaderRole = (
  leader: CommunityLeader | CommunityLeaderData | CommunityLeaderApplicationNode
) => {
  if (leader?.appliedStaffRole) {
    return leader.appliedStaffRole
  }

  if (leader?.appliedTalentRole) {
    return leader.appliedTalentRole
  }

  return null
}
