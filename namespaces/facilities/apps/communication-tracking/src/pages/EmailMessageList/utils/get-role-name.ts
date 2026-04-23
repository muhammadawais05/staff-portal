import { capitalize } from '@toptal/picasso/utils'
export const getRoleName = (roleId: string): string =>
  capitalize(
    roleId
      .split(/(?=[A-Z])/)
      .join(' ')
      .toLowerCase()
  )
