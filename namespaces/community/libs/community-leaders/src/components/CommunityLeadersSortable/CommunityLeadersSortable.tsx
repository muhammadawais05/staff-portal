import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  DragOverlay
} from '@staff-portal/sortable'
import { useNotifications } from '@toptal/picasso/utils'
import { Container, Drag16 } from '@toptal/picasso'

import { SortableItem } from './SortableItem'
import { Heading } from './Heading'
import { useReorderFeaturedCommunityLeaders } from '../../data/feature-community-leaders/feature-community-leaders.staff.gql'
import { FeaturedCommunityLeaders } from '../../types'
import { GET_FEATURED_COMMUNITY_LEADERS } from '../../data/get-featured-community-leaders/get-featured-community-leaders.staff.gql'
import { PresentationalSortableItem } from './PresentationalSortableItem'

interface Props {
  communityLeaders: FeaturedCommunityLeaders
}

const CommunityLeadersSortable = ({ communityLeaders }: Props) => {
  const [items, setItems] = useState(communityLeaders ?? [])
  const [activeId, setActiveId] = useState('')
  const firstMount = useRef(true)

  const activeCl = useMemo(() => {
    if (items && items.length > 0) {
      return items.find(item => item.id === activeId)
    }

    return null
  }, [activeId, items])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )
  const { showError, showSuccess } = useNotifications()
  const [featureCommunityLeaders, { loading }] =
    useReorderFeaturedCommunityLeaders({
      onError() {
        showError('Could not update featured community leaders')
      }
    })

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!active && !over) {
      return
    }

    if (active.id !== over?.id) {
      setItems(prevItems => {
        const oldIndex = prevItems.findIndex(cl => cl.id === active.id)
        const newIndex = prevItems.findIndex(cl => cl.id === over?.id)

        return arrayMove(prevItems, oldIndex, newIndex)
      })
    }
    setActiveId('')
  }

  const removeCl = (id: string) => () => {
    setItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const saveOrder = useCallback(
    async (leaders: FeaturedCommunityLeaders) => {
      if (!leaders) {
        return
      }

      const leaderIds = leaders.map(leader => leader.node?.id as string)

      await featureCommunityLeaders({
        variables: { leaderIds },
        refetchQueries: [{ query: GET_FEATURED_COMMUNITY_LEADERS }]
      })

      showSuccess('Community Leaders order has been updated!')
    },
    [featureCommunityLeaders, showSuccess]
  )

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false

      return
    }
    saveOrder(items)
  }, [items, saveOrder])

  return (
    <>
      <Heading />

      <SortableContext
        items={items}
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        overlay={
          <DragOverlay>
            {activeId && activeCl ? (
              <PresentationalSortableItem
                dragHandler={
                  <Container>
                    <Drag16 />
                  </Container>
                }
                floating
                communityLeader={activeCl}
              />
            ) : null}
          </DragOverlay>
        }
      >
        {items.map(communityLeader => (
          <SortableItem
            key={communityLeader.id}
            communityLeader={communityLeader}
            removeCl={removeCl(communityLeader.id)}
            disabled={loading}
          />
        ))}
      </SortableContext>
    </>
  )
}

export default CommunityLeadersSortable
