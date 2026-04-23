import { useCallback, useState } from 'react'
import { SortableContextProps } from '@dnd-kit/sortable'
import { DndContextProps, DragOverEvent, rectIntersection } from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'

import {
  DragStartEvent,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '../../index'

type Props = {
  sortType: 'multiline'
  onDragStateUpdate: (
    event: Pick<
      DragOverEvent | DragEndEvent,
      'active' | 'over' | 'collisions' | 'delta'
    >
  ) => void
}

export const noOpSortingStrategy = () => null

const useHandleUnpredictableWidthSorting = ({
  sortType,
  onDragStateUpdate: handleDragOver
}: Props) => {
  const sensors = useSensors(useSensor(PointerSensor))
  const [activeId, setActiveId] = useState<string | null>(null)

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      setActiveId(event.active.id)
    },
    [setActiveId]
  )
  const handleDragEnd = useCallback(() => {
    setActiveId(null)
  }, [])

  let sortableContextProps: Partial<
    Pick<SortableContextProps, 'strategy'> &
      Pick<
        DndContextProps,
        | 'sensors'
        | 'modifiers'
        | 'collisionDetection'
        | 'onDragStart'
        | 'onDragOver'
        | 'onDragEnd'
      >
  > = {
    sensors,
    strategy: noOpSortingStrategy,
    onDragStart: handleDragStart,
    onDragOver: handleDragOver,
    onDragEnd: handleDragEnd
  }

  switch (sortType) {
    case 'multiline':
      sortableContextProps = {
        ...sortableContextProps,
        collisionDetection: rectIntersection,
        modifiers: [restrictToWindowEdges]
      }
      break

    default:
      break
  }

  return {
    activeId,
    sortableContextProps
  }
}

export default useHandleUnpredictableWidthSorting
