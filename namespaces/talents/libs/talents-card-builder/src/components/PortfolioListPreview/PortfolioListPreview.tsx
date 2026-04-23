import {
  PointerSensor,
  rectSortingStrategy,
  restrictToWindowEdges,
  SortableContext,
  useSensor,
  useSensors
} from '@staff-portal/sortable'
import { Section } from '@toptal/picasso'
import React from 'react'

import { ProfilePortfolioItem } from '../../types'
import PortfolioItemTile from '../PortfolioItemTile'
import PortfolioListGrid from '../PortfolioListGrid'
import SortableItem from '../SortableItem/SortableItem'
import { useHandleStateDragEnd } from '../../hooks/use-handle-state-drag-end'
import * as S from './styles'

export interface ProfilePortfolioListPreviewProps {
  title: string
  sortable?: boolean
  data: ProfilePortfolioItem[]
}

const PortfolioListPreview = ({
  title,
  sortable,
  data
}: ProfilePortfolioListPreviewProps) => {
  const handleDragEnd = useHandleStateDragEnd('portfolio')
  const sensors = useSensors(useSensor(PointerSensor))

  if (data.length === 0) {
    return null
  }

  return (
    <Section title={title}>
      <SortableContext
        items={data.map(({ id }) => id)}
        strategy={rectSortingStrategy}
        sensors={sensors}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        <PortfolioListGrid>
          {data.map(item => (
            <SortableItem
              disabled={!sortable}
              style={S.item}
              key={item.id}
              id={item.id}
            >
              <PortfolioItemTile item={item} />
            </SortableItem>
          ))}
        </PortfolioListGrid>
      </SortableContext>
    </Section>
  )
}

export default PortfolioListPreview
