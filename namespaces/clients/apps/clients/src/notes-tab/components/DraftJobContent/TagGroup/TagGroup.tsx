import React from 'react'
import { Tag } from '@toptal/picasso'
import { SkillTag } from '@staff-portal/talents'
import { SkillRating } from '@staff-portal/graphql/staff'

type Props = {
  items?: { skillName: string; rating?: SkillRating }[]
  'data-testid'?: string
}

const TagGroup = ({ items, 'data-testid': dataTestId }: Props) => {
  if (!items?.length) {
    return null
  }

  return (
    <Tag.Group>
      {items.map(item => (
        <SkillTag
          hasLink
          rating={item?.rating}
          name={item.skillName}
          key={item.skillName}
          data-testid={dataTestId}
        />
      ))}
    </Tag.Group>
  )
}

export default TagGroup
