import React, { memo } from 'react'
import { Container, EmptyState, Typography } from '@toptal/picasso'
import { ItemsList, NoSearchResultsMessage } from '@staff-portal/ui'

import { useGetCommunityLeaderEvents } from '../../data/get-community-leader-events/get-community-leader-events.staff.gql'
import { Event } from './Event'
import { EventLoadingSkeleton } from './EventLoadingSkeleton'
import { EventFragment } from '../../data/fragments/event-fragment.staff.gql.types'

interface Props {
  communityLeaderId: string
}

const CommunityLeaderEvents = ({ communityLeaderId }: Props) => {
  const {
    data: events,
    loading,
    error
  } = useGetCommunityLeaderEvents({ id: communityLeaderId })

  if (loading && !events) {
    return <EventLoadingSkeleton />
  }

  if (error) {
    return (
      <Container>
        <Typography>
          Oops... something went wrong while loading events!
        </Typography>
      </Container>
    )
  }

  const hasEvents = events?.length !== 0

  if (!hasEvents) {
    return (
      <EmptyState.Collection>
        This Community Leader does not have any events to display.
      </EmptyState.Collection>
    )
  }

  return (
    <ItemsList<EventFragment>
      data={events}
      renderItem={event => <Event event={event} />}
      getItemKey={event => event.id}
      notFoundMessage={
        <NoSearchResultsMessage message='This Community Leader does not have any events to display.' />
      }
      itemWithoutSection
    />
  )
}

export default memo(CommunityLeaderEvents)
