import { titleize } from '@staff-portal/string'
import { toTitleCase } from '@toptal/picasso/utils'

const ROLE_TYPE_SPLIT_OPTIONS = { splitter: /[\s_]+|(?=[A-Z])/ }

type RoleTypeTextOptions = {
  roleTitle?: string | null
}

export const getRoleTypeText = (
  type?: string | null,
  options: RoleTypeTextOptions = {}
) => {
  const { roleTitle } = options

  if (roleTitle) {
    return toTitleCase(roleTitle) as string
  }

  if (!type) {
    return ''
  }

  return titleize(type, ROLE_TYPE_SPLIT_OPTIONS)
}
