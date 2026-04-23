import {
  PointerSensor,
  SortableContext,
  useSensor,
  useSensors
} from '@staff-portal/sortable'
import { Section } from '@toptal/picasso'
import React from 'react'

import { useHandleStateDragEnd } from '../../hooks/use-handle-state-drag-end'
import { PreviewHighlightType } from '../../types'
import HighlightPreview from '../HighlightPreview/HighlightPreview'
import SortableItem from '../SortableItem/SortableItem'

interface Props {
  fullName: string
  highlights: PreviewHighlightType[]
  sortable?: boolean
}

const HighlightsPreview = ({ fullName, highlights, sortable }: Props) => {
  const sensors = useSensors(useSensor(PointerSensor))
  const handleDragEnd = useHandleStateDragEnd('items', ({ id }) => id)

  if (highlights.length === 0) {
    return null
  }

  const sortableItems = [...highlights.map(({ id }) => id)]

  return (
    <Section title='Highlights'>
      <SortableContext
        items={sortableItems}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        {highlights.map(highlight => (
          <SortableItem
            key={highlight.id}
            id={highlight.id}
            disabled={!sortable}
          >
            <HighlightPreview
              fullName={fullName}
              highlight={highlight}
              sortable={sortable}
            />
          </SortableItem>
        ))}
      </SortableContext>
    </Section>
  )
}

export default HighlightsPreview
