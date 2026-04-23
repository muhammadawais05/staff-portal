import { GigParticipationType } from '@staff-portal/graphql/staff'
import {
  SlackWorkspaceFragment,
  RoleFragment
} from '@staff-portal/talents-gigs'

const getRequestAssignee = (
  slackWorkspaces: SlackWorkspaceFragment[]
): RoleFragment | undefined => {
  return slackWorkspaces
    .map(slackWorkspace => slackWorkspace.participations.nodes)
    .flat()
    .find(
      participation =>
        GigParticipationType.FULFILLER === participation.participationType
    )?.role
}

export default getRequestAssignee
