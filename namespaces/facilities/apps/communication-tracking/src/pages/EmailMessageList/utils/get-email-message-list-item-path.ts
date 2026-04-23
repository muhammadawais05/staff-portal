import {
  getRoleEmailMessagePath,
  getEmailMessagePath
} from '@staff-portal/routes'

export const getEmailMessageListItemPath = ({
  id,
  entityType,
  entityId
}: {
  id: string
  entityType?: string
  entityId?: string
}) =>
  entityType && entityId
    ? getRoleEmailMessagePath(entityType, entityId, id)
    : getEmailMessagePath(id)
