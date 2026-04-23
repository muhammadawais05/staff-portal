import { RoleType } from '@staff-portal/graphql/staff'
import { getRoleEmailMessagesPath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'

const roleTypeToUrlFormat = (type: string) => {
  const pluralPostfix = type !== RoleType.STAFF ? 's' : ''

  return type.toLocaleLowerCase() + pluralPostfix
}

export const buildRoleEmailMessagesPath = (roleId: string | undefined) => {
  if (!roleId) {
    return '#'
  }
  const { type, id } = decodeEntityId(roleId)

  return getRoleEmailMessagesPath(roleTypeToUrlFormat(type), id)
}
