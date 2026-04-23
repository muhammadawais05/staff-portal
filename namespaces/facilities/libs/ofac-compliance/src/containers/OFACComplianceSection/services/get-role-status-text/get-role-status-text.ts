import { titleize } from '@staff-portal/string'

export const getRoleStatusText = (status: string) =>
  titleize(status, { capitalizeAllWords: false })
