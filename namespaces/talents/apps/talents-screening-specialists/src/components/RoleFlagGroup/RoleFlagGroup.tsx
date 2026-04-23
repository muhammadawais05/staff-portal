import React from 'react'
import { Tag } from '@toptal/picasso'
import { RoleFlag, RoleFlagFragment } from '@staff-portal/role-flags'

import { splitFlags, sortFlags } from './utils'
import AdditionalFlags from './components/AdditionalFlags'
import * as S from './styles'

export interface Props {
  roleFlags: RoleFlagFragment[] | undefined
  maxLineLength?: number
}

const MAX_LINE_LENGTH = 18 // The number is based on manual visual testing to fit at least 2 flags with short-medium length.

const RoleFlagGroup = ({
  roleFlags,
  maxLineLength = MAX_LINE_LENGTH
}: Props) => {
  if (!roleFlags) {
    return null
  }

  const { mainFlags, additionalFlags } = splitFlags(
    sortFlags(roleFlags),
    maxLineLength
  )

  return (
    <Tag.Group css={S.tagGroup}>
      {mainFlags.map(roleFlag => (
        <RoleFlag
          key={roleFlag.id}
          title={roleFlag.flag.title}
          color={roleFlag.flag.color}
          comment={roleFlag.comment}
          createdAt={roleFlag.createdAt}
          updatedAt={roleFlag.updatedAt}
          flaggedBy={roleFlag.flaggedBy?.fullName}
        />
      ))}
      <AdditionalFlags roleFlags={additionalFlags} />
    </Tag.Group>
  )
}

export default RoleFlagGroup
