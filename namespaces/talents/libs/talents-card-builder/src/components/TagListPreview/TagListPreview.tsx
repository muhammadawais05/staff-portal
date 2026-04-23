import { Section, Tag } from '@toptal/picasso'
import React, { useMemo } from 'react'
import {
  SortableContext,
  DragOverlay,
  useHandleUnpredictableWidthSorting
} from '@staff-portal/sortable'

import { TagItem } from '../../types/TagItem'
import { useHandleStateDragEnd } from '../../hooks/use-handle-state-drag-end'
import { PitcherHighlights } from '../../types'
import SortableItem from '../SortableItem/SortableItem'
import TagListItem from '../TagListItem/TagListItem'
import * as S from './styles'

export type TagListPreviewProps = {
  title: string
  data: TagItem[]
  sortable: boolean
  sortableKey: keyof PitcherHighlights
  testId: string
}

const TagListPreview = ({
  title,
  data,
  sortable,
  sortableKey,
  testId
}: TagListPreviewProps) => {
  const handleDragStateUpdate = useHandleStateDragEnd<
    keyof PitcherHighlights,
    string
  >(sortableKey)

  const { activeId, sortableContextProps } = useHandleUnpredictableWidthSorting(
    {
      sortType: 'multiline',
      onDragStateUpdate: handleDragStateUpdate
    }
  )

  const activeTagItem = useMemo(
    () => (activeId ? data.find(item => item.id === activeId) : null),
    [activeId, data]
  )

  const sortableItems = useMemo(() => [...data.map(({ id }) => id)], [data])

  if (data.length === 0) {
    return null
  }

  return (
    <Section title={title}>
      <Tag.Group css={S.tagItemContainer}>
        <SortableContext
          items={sortableItems}
          overlay={
            <DragOverlay>
              {activeTagItem ? (
                <TagListItem tagItem={activeTagItem} isGrabbed />
              ) : null}
            </DragOverlay>
          }
          {...sortableContextProps}
        >
          {data.map(tagItem => (
            <SortableItem key={tagItem.id} id={tagItem.id} disabled={!sortable}>
              {({ isDragging }) => (
                <TagListItem
                  tagItem={tagItem}
                  data-testid={testId}
                  isDragging={isDragging}
                />
              )}
            </SortableItem>
          ))}
        </SortableContext>
      </Tag.Group>
    </Section>
  )
}

export default TagListPreview
