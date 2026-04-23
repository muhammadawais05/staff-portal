import { GigParticipationType } from '@staff-portal/graphql/staff'

import { RoleFragment } from '..'

type Participation = {
  participationType: GigParticipationType
  role: RoleFragment
}

type Workspace = {
  participations: {
    nodes: Participation[]
  }
}

const getWorkspaceParticipant = (
  workspace: Workspace,
  participationType = GigParticipationType.FULFILLER
): RoleFragment | undefined => {
  return workspace.participations.nodes.find(
    participation => participation.participationType === participationType
  )?.role
}

export default getWorkspaceParticipant
