import React from 'react'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { Container } from '@toptal/picasso'

import AddNewEventTag from '../../components/AddNewEventTag/AddNewEventTag'
import EventTagListItem from '../../components/EventTagListItem/EventTagListItem'
import EventTagsListLoader from '../../components/EventTagsListLoader/EventTagsListLoader'
import { useGetEventTags } from '../../data/get-event-tags/get-event-tags.staff.gql'
import * as S from './styles'

const EventTags = () => {
  const { data: eventTags, loading } = useGetEventTags()

  return (
    <ContentWrapper
      title='Community Event Tags'
      itemsCount={eventTags ? eventTags.length : 0}
    >
      <AddNewEventTag />
      <Container top='large' bottom='large'>
        {loading && <EventTagsListLoader />}
        {!loading &&
          eventTags?.map(eventTag => (
            <Container
              padded='small'
              bottom='small'
              rounded
              bordered
              css={S.whiteBg}
              key={eventTag.id}
            >
              <EventTagListItem eventTag={eventTag} />
            </Container>
          ))}
      </Container>
    </ContentWrapper>
  )
}

export default EventTags
