import { Section, Tag } from '@toptal/picasso'
import React, { useCallback, useMemo } from 'react'

import { TagItem as TagItemType } from '../../types/TagItem'
import { compareTagNames } from '../../utils/tagName'
import TagItem from '../TagItem'

export interface TagListProps {
  data: TagItemType[]
  value: string[]
  toggleItem: (id: string) => void
  title: string
  testId: string
  /**
   * How many tags the user can select
   */
  maxLimit?: number
  /**
   * Tooltip text that will be displayed once the maxLimit is reached
   */
  maxLimitWarning?: string
}

const byName = (tag1: TagItemType, tag2: TagItemType) => {
  return compareTagNames(tag1.name, tag2.name)
}

const TagList = ({
  data,
  value,
  toggleItem,
  title,
  testId,
  maxLimit = Number.POSITIVE_INFINITY,
  maxLimitWarning
}: TagListProps) => {
  const handleClick = useCallback(
    e => {
      toggleItem(e.currentTarget.dataset.itemId)
    },
    [toggleItem]
  )

  const sortedData = useMemo(() => [...data].sort(byName), [data])
  const maxLimitReached = value.length >= maxLimit

  return (
    <Section title={title}>
      <Tag.Group>
        {sortedData.map(({ id, name }) => {
          const selected = value.includes(id)

          return (
            <TagItem
              key={id}
              onClick={handleClick}
              selected={selected}
              data-item-id={id}
              name={name}
              disabled={!selected && maxLimitReached}
              maxLimitWarning={maxLimitWarning}
              data-testid={testId}
            />
          )
        })}
      </Tag.Group>
    </Section>
  )
}

export default TagList
