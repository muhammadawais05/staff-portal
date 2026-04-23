import { ClientTransferRoleRequestRelationship } from '@staff-portal/graphql/staff'

import { ClientTransferRoleRequestFragment } from '../data'

const order = {
  [ClientTransferRoleRequestRelationship.CLAIMER]: 1,
  [ClientTransferRoleRequestRelationship.AM]: 2,
  [ClientTransferRoleRequestRelationship.RM]: 3
}

export const sortByRelationship = (
  itemA: ClientTransferRoleRequestFragment,
  itemB: ClientTransferRoleRequestFragment
) => {
  if (!itemA.relationship || !itemB.relationship) {
    return 0
  }

  return order[itemA.relationship] - order[itemB.relationship]
}
