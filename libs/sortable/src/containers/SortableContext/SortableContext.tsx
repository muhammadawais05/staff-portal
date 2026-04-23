import React, { ReactNode } from 'react'
import { closestCenter, DndContext, DndContextProps } from '@dnd-kit/core'
import {
  SortableContext as SortableContextKit,
  SortableContextProps,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import {
  restrictToVerticalAxis,
  restrictToWindowEdges
} from '@dnd-kit/modifiers'

type Props = SortableContextProps &
  Pick<
    DndContextProps,
    | 'sensors'
    | 'onDragStart'
    | 'onDragOver'
    | 'onDragEnd'
    | 'modifiers'
    | 'collisionDetection'
  > & {
    overlay?: ReactNode
  }

const SortableContext = ({
  sensors,
  onDragStart,
  onDragOver,
  onDragEnd,
  children,
  strategy,
  collisionDetection,
  modifiers,
  overlay,
  ...restProps
}: Props) => (
  <DndContext
    collisionDetection={collisionDetection ?? closestCenter}
    modifiers={modifiers ?? [restrictToVerticalAxis, restrictToWindowEdges]}
    sensors={sensors}
    onDragStart={onDragStart}
    onDragOver={onDragOver}
    onDragEnd={onDragEnd}
  >
    <SortableContextKit
      strategy={strategy ?? verticalListSortingStrategy}
      {...restProps}
    >
      {children}
    </SortableContextKit>

    {overlay}
  </DndContext>
)

export default SortableContext
