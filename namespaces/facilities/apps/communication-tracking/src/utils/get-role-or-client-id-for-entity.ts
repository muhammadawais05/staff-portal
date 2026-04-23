import { encodeEntityId } from '@staff-portal/data-layer-service'

const CLIENT_ENTITY_TYPE = 'Client'
const ROLE_ENTITY_TYPE = 'Role'

const getRoleOrClientIdForEntity = (
  entityType?: string,
  entityId?: string
): string | undefined =>
  entityId &&
  entityType &&
  encodeEntityId(
    entityId,
    entityType === 'clients' ? CLIENT_ENTITY_TYPE : ROLE_ENTITY_TYPE
  )

export default getRoleOrClientIdForEntity
