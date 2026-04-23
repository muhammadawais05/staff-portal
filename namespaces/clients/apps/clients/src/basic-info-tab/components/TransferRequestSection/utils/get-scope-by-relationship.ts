import {
  RoleV2Scope,
  ClientTransferRoleRequestRelationship
} from '@staff-portal/graphql/staff'

const scopeByRelationship = {
  [ClientTransferRoleRequestRelationship.CLAIMER]: RoleV2Scope.COMPANY_CLAIMERS,
  [ClientTransferRoleRequestRelationship.AM]: RoleV2Scope.SMB_ACCOUNT_MANAGERS,
  [ClientTransferRoleRequestRelationship.RM]:
    RoleV2Scope.SMB_RELATIONSHIP_MANAGERS
}

export const getScopeByRelationship = (
  relationship: ClientTransferRoleRequestRelationship
) => scopeByRelationship[relationship]
