import React from 'react'
import {
  CSS,
  useSortable,
  defaultAnimateLayoutChanges,
  AnimateLayoutChanges
} from '@staff-portal/sortable'
import { Container, Drag16 } from '@toptal/picasso'

import { PresentationalSortableItem } from './PresentationalSortableItem'
import { FeaturedCommunityLeader } from '../../types'
import * as S from './styles'

const animateLayoutChanges: AnimateLayoutChanges = args => {
  const { isSorting, wasDragging } = args

  if (isSorting || wasDragging) {
    return defaultAnimateLayoutChanges(args)
  }

  return true
}

interface Props {
  communityLeader: FeaturedCommunityLeader
  isDragging?: boolean
  floating?: boolean
  dragHandler?: React.ReactNode
  disabled?: boolean
  removeCl?: () => void
}

export const SortableItem = ({
  communityLeader,
  removeCl,
  disabled = false
}: Props) => {
  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef,
    transform,
    transition,
    index
  } = useSortable({
    id: communityLeader.id,
    animateLayoutChanges
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style}>
      <PresentationalSortableItem
        dragHandler={
          <Container css={S.cursorPointer} {...listeners} {...attributes}>
            <Drag16 />
          </Container>
        }
        isDragging={isDragging}
        communityLeader={communityLeader}
        removeCl={removeCl}
        order={index + 1}
        disabled={disabled}
      />
    </div>
  )
}
