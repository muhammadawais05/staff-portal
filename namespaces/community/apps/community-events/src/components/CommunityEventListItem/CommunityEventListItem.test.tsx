import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  CommunityEventCategory,
  CommunityEventRsvp,
  CommunityEventStatus
} from '@staff-portal/graphql/staff'

import CommunityEventListItem from './CommunityEventListItem'
import { CommunityEvent } from '../../types'

const EVENT_DATA: CommunityEvent = {
  id: '1',
  name: 'Event Long Name',
  shortName: 'Event Short Name',
  description: 'Event Description',
  attendees: { totalCount: 4 },
  categories: [CommunityEventCategory.TOPTAL_ORGANIZED],
  eventLocation: {
    id: 'eventLocationId',
    city: 'Rio de Janeiro',
    address: 'Ayrton Senna Avenue, 4000',
    country: {
      id: 'countryId',
      name: 'Brazil'
    }
  },
  status: CommunityEventStatus.APPROVED,
  leader: {
    id: 'leaderId',
    name: 'John Doe',
    photoUrl: 'http://leader-image-url'
  },
  rsvp: CommunityEventRsvp.INTERNAL_RSVP,
  scheduledTime: {
    startDate: '2022-03-25',
    startTime: '11:00:00',
    endDate: '2022-03-25',
    endTime: '13:00:00',
    id: 'scheduledTimeId',
    timeZone: {
      name: '(UTC+12:00) Pacific - Auckland',
      value: 'Pacific/Auckland'
    }
  }
}

describe('CommunityEventListItem', () => {
  it('renders community event data', () => {
    render(
      <TestWrapper>
        <CommunityEventListItem communityEvent={EVENT_DATA} />
      </TestWrapper>
    )

    expect(screen.getByText(/Toptal/)).toBeInTheDocument()
    expect(screen.getByText(/Internal/)).toBeInTheDocument()
    expect(screen.getByText(/Event Short Name/)).toHaveAttribute(
      'href',
      `/community_events/1`
    )
    expect(screen.getByText(/Rio de Janeiro/)).toBeInTheDocument()
    expect(screen.getByText(/Brazil/)).toBeInTheDocument()
    expect(screen.getByText(/Ayrton Senna Avenue, 4000/)).toBeInTheDocument()
    expect(screen.getByText(/Approved/)).toBeInTheDocument()
    expect(screen.getByText(/John Doe/)).toBeInTheDocument()
    expect(screen.getByText(/4$/)).toBeInTheDocument()
    expect(screen.getByText(/Event Description/)).toBeInTheDocument()
    expect(screen.getByAltText(/Host John Doe/)).toHaveAttribute(
      'src',
      'http://leader-image-url'
    )
  })

  it('renders community event without link', () => {
    render(
      <TestWrapper>
        <CommunityEventListItem communityEvent={EVENT_DATA} hideLink />
      </TestWrapper>
    )

    expect(screen.getByText(/Event Short Name/)).not.toHaveAttribute('href')
  })
})
