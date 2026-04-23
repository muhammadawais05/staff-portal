import { RoleFlagFragment } from '@staff-portal/role-flags'

export const splitFlags = (
  roleFlags: RoleFlagFragment[],
  maxLength: number
) => {
  let currentLineLength = 0
  const mainFlags = []
  const additionalFlags = []

  for (let index = 0; index < roleFlags.length; index++) {
    const currentFlag = roleFlags[index]

    currentLineLength += currentFlag.flag.title.length
    if (currentLineLength > maxLength) {
      additionalFlags.push(currentFlag)
    } else {
      mainFlags.push(currentFlag)
    }
  }

  return {
    mainFlags,
    additionalFlags
  }
}
