import React, { useMemo } from 'react'
import { Tag, Tooltip } from '@toptal/picasso'
import { RoleFlag, RoleFlagFragment } from '@staff-portal/role-flags'

import * as S from './styles'

export interface Props {
  flags: RoleFlagFragment[]
  visibleLength: number
}

const RoleFlags = ({ flags, visibleLength }: Props) => {
  const hiddenFlagCount = flags.length - visibleLength
  const items = flags.map(flag => flag.flag.title)

  const hiddenTagsContent = useMemo(() => {
    const moreItems = items.slice(visibleLength, items.length)

    return <>{moreItems.join(', ')}</>
  }, [items, visibleLength])

  return (
    <Tag.Group css={S.fullWidthContainer}>
      {flags.slice(0, visibleLength).map(roleFlag => (
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
      {hiddenFlagCount > 0 && (
        <Tooltip placement='bottom' preventOverflow content={hiddenTagsContent}>
          <Tag>+{hiddenFlagCount}</Tag>
        </Tooltip>
      )}
    </Tag.Group>
  )
}

export default RoleFlags
