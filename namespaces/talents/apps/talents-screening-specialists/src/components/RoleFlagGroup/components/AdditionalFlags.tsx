import React from 'react'
import { Tag, Tooltip } from '@toptal/picasso'
import { RoleFlagFragment } from '@staff-portal/role-flags'

export interface Props {
  roleFlags: RoleFlagFragment[] | undefined
}

const AdditionalFlags = ({ roleFlags = [] }: Props) => {
  if (!roleFlags.length) {
    return null
  }

  const squashedFlagTitles = roleFlags
    .map(roleFlag => roleFlag.flag.title)
    .join(', ')

  return (
    <Tooltip data-testid='additional-flags' content={squashedFlagTitles}>
      <Tag.Rectangular>+{roleFlags.length.toString()}</Tag.Rectangular>
    </Tooltip>
  )
}

export default AdditionalFlags
