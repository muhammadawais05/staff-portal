import { RoleFlagFragment } from '@staff-portal/role-flags'

const compareFlags = (
  prevRoleFlag: RoleFlagFragment,
  nextRoleFlag: RoleFlagFragment
) => {
  if (Number(prevRoleFlag.flag.color?.length)) {
    return -1
  }

  return prevRoleFlag.flag.title.length - nextRoleFlag.flag.title.length
}

export const sortFlags = (roleFlags: RoleFlagFragment[]): RoleFlagFragment[] =>
  [...roleFlags].sort(compareFlags)
