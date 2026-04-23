import { ClientTransferRoleRequestRelationship } from '@staff-portal/graphql/staff'

const nameByRelationship = {
  [ClientTransferRoleRequestRelationship.AM]: 'Account Manager',
  [ClientTransferRoleRequestRelationship.CLAIMER]: 'Claim',
  [ClientTransferRoleRequestRelationship.RM]: 'Relationship Manager'
}

export const getTransferRequestHeader = (
  relationship: ClientTransferRoleRequestRelationship
) => `Transfer ${nameByRelationship[relationship]} Request`
