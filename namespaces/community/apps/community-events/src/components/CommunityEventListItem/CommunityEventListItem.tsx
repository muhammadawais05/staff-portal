import React from 'react'
import { Section, Tag, Container, Avatar, Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { DetailedList } from '@staff-portal/ui'
import Markdown from 'react-markdown'

import { getCommunityEventFullDate } from '../../services/get-community-event-date'
import { getCommunityEventCategoriesMapped } from '../../services/get-community-event-categories-mapped'
import { getCommunityEventStatusMapped } from '../../services/get-community-event-status-mapped'
import { getCommunityEventRSVP } from '../../services/get-community-event-rsvp'
import { CommunityEvent } from '../../types'
import * as S from './styles'

interface Props {
  communityEvent: CommunityEvent
  hideLink?: boolean
}

// eslint-disable-next-line complexity
const CommunityEventListItem = ({ communityEvent, hideLink }: Props) => {
  const { endDate, endTime, startDate, startTime } =
    communityEvent.scheduledTime ?? {}

  const { address, city, country } = communityEvent.eventLocation ?? {}

  const { name, photoUrl } = communityEvent.leader ?? {}

  const categories = getCommunityEventCategoriesMapped(
    communityEvent.categories ?? []
  )

  const status = communityEvent.status
    ? getCommunityEventStatusMapped(communityEvent.status)
    : null

  return (
    <Section
      variant='withHeaderBar'
      data-testid='communityEventListItem'
      title={
        hideLink ? (
          communityEvent.shortName
        ) : (
          <Link href={`/community_events/${communityEvent.id}`}>
            {communityEvent.shortName}
          </Link>
        )
      }
      css={S.whiteBg}
    >
      <Container flex gap={1.5}>
        <Avatar
          size='small'
          alt={`Host ${name}`}
          name={name}
          src={photoUrl ?? undefined}
        />
        {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
        <DetailedList
          defaultValue='—'
          labelColumnWidth={8}
          items={[
            {
              label: 'Categories',
              value: categories.map((category, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Tag.Rectangular variant='green' key={index}>
                  {category}
                </Tag.Rectangular>
              ))
            },
            {
              label: 'RSVP',
              value: communityEvent.rsvp
                ? getCommunityEventRSVP(communityEvent.rsvp)
                : null
            },
            [
              {
                label: 'Country',
                value: country?.name
              },
              { label: 'City', value: city }
            ],
            { label: 'Address', value: address },
            [
              {
                label: 'Start Date',
                value: startDate
                  ? getCommunityEventFullDate(startDate, startTime)
                  : null
              },
              {
                label: 'End Date',
                value: endDate
                  ? getCommunityEventFullDate(endDate, endTime)
                  : null
              }
            ],
            {
              label: 'Status',
              value: status ? (
                <Typography color={status.color}>{status.label}</Typography>
              ) : null
            },
            [
              {
                label: 'Host',
                value: communityEvent.leader?.name
              },
              {
                label: 'Attendees',
                value: communityEvent.attendees?.totalCount
              }
            ],
            {
              label: 'Description',
              value: communityEvent.description && (
                <Markdown allowDangerousHtml css={S.markdownText}>
                  {communityEvent.description}
                </Markdown>
              )
            }
          ]}
        />
      </Container>
    </Section>
  )
}

export default CommunityEventListItem
