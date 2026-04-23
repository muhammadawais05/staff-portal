import {
  arrayMove,
  DragEndEvent,
  PointerSensor,
  SortableContext,
  useSensor,
  useSensors
} from '@staff-portal/sortable'
import { Container, Typography } from '@toptal/picasso'
import { useForm } from '@toptal/picasso-forms'
import React from 'react'

import { PitcherState, PreviewEmploymentType } from '../../types'
import HighlightItemPreview from '../HighlightItemPreview/HighlightItemPreview'
import SortableItem from '../SortableItem/SortableItem'

interface Props {
  data: PreviewEmploymentType
  sortable?: boolean
}

const EmploymentPreview = ({ data, sortable }: Props) => {
  const form = useForm<PitcherState>()
  const sensors = useSensors(useSensor(PointerSensor))
  const highlightTitle = `${data.position} at ${data.company}`

  const handleItemDragEnd = (
    { active, over }: DragEndEvent,
    containerId: string
  ) => {
    if (!over || active.id === over.id) {
      return
    }

    const state = form.getState().values.highlights

    const items = state.items.map(item => {
      if (item.id !== containerId) {
        return item
      }

      const descriptionItems = item.description_items ?? []
      const oldIndex = descriptionItems.findIndex(
        descriptionItem => descriptionItem === active.id
      )
      const newIndex = descriptionItems.findIndex(
        descriptionItem => descriptionItem === over.id
      )

      return {
        id: item.id,
        description_items: arrayMove(descriptionItems, oldIndex, newIndex),
        type: item.type
      }
    })

    form.change('highlights', {
      ...state,
      items
    })
  }

  return (
    <HighlightItemPreview
      title={highlightTitle}
      startDate={data.startDate}
      endDate={data.endDate}
    >
      <Container top='xsmall'>
        <SortableContext
          items={data.experienceItems}
          sensors={sensors}
          onDragEnd={(event: DragEndEvent) => handleItemDragEnd(event, data.id)}
        >
          {data.experienceItems.map(item => (
            <SortableItem key={item} disabled={!sortable} id={item}>
              <Container bottom='xsmall'>
                <Typography size='medium' color='dark-grey'>
                  {item}
                </Typography>
              </Container>
            </SortableItem>
          ))}
        </SortableContext>
      </Container>
    </HighlightItemPreview>
  )
}

export default EmploymentPreview
