import { ClientTransferRoleRequestRelationship } from '@staff-portal/graphql/staff'

const nameByRelationship = {
  [ClientTransferRoleRequestRelationship.AM]: 'Account Manager',
  [ClientTransferRoleRequestRelationship.CLAIMER]: 'Claimer',
  [ClientTransferRoleRequestRelationship.RM]: 'Relationship Manager'
}

export const getTransferRequestLabel = (
  relationship: ClientTransferRoleRequestRelationship
) => nameByRelationship[relationship]
