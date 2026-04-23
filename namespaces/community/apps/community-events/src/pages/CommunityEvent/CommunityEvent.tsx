import React from 'react'
import { useParams } from '@staff-portal/navigation'
import { NoSearchResultsMessage } from '@staff-portal/ui'
import { Container } from '@toptal/picasso'
import { ContentWrapper } from '@staff-portal/page-wrapper'

import CommunityEventListLoader from '../../components/CommunityEventListLoader/CommunityEventListLoader'
import CommunityEventListItem from '../../components/CommunityEventListItem/CommunityEventListItem'
import CommunityEventAttendeesButton from '../../components/CommunityEventAttendeesButton/CommunityEventAttendeesButton'
import { useGetCommunityEvent } from '../../data/get-community-event/get-community-event.staff.gql'

const CommunityEvent = () => {
  const { id } = useParams<{ id: string }>()

  const { data: communityEvent, loading } = useGetCommunityEvent({
    variables: {
      id
    }
  })

  if (loading) {
    return (
      <Container top='large'>
        <CommunityEventListLoader itemsCount={1} />
      </Container>
    )
  }

  if (!communityEvent) {
    return (
      <ContentWrapper title='Community Event Not Found'>
        <NoSearchResultsMessage message='Could not get event data' />
      </ContentWrapper>
    )
  }

  return (
    <ContentWrapper
      title={communityEvent.shortName}
      actions={
        <CommunityEventAttendeesButton
          communityEventId={communityEvent.id}
          totalAttendees={communityEvent.attendees?.totalCount}
        />
      }
    >
      <Container top='large' bottom='large'>
        <CommunityEventListItem communityEvent={communityEvent} hideLink />
      </Container>
    </ContentWrapper>
  )
}

export default CommunityEvent
