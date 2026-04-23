import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useQuery } from '@staff-portal/data-layer-service'
import { when } from 'jest-when'

import { MeetingFragment } from '../../../../data/meeting-fragment'
import { GetMeetingAttendeesCountDocument } from '../ViewAttendeeLogButton/data'
import MeetingWithField from './MeetingWithField'

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useQuery: jest.fn()
}))

const mockUseQuery = useQuery as jest.Mock

const arrangeTest = (
  meetingWith: MeetingFragment['attendee' | 'organizer'],
  conferenceLink?: MeetingFragment['conferenceLink']
) =>
  render(
    <TestWrapper>
      <MeetingWithField
        meetingWith={meetingWith}
        conferenceLink={conferenceLink}
      />
    </TestWrapper>
  )

describe('MeetingWithField', () => {
  it("doesn't renders when attendee is null", () => {
    const { container } = arrangeTest(null)

    expect(container.firstChild).toBeEmptyDOMElement()
  })

  it('renders attendee name and url', () => {
    const NAME = 'test'
    const URL = 'test url'

    const attendee = {
      webResource: { url: URL, text: NAME }
    } as MeetingFragment['attendee']

    arrangeTest(attendee)

    const attendeeLink = screen.getByText(NAME)

    expect(attendeeLink).toBeInTheDocument()
    expect(attendeeLink).toHaveAttribute('href', URL)
  })

  it('renders attendee company name and url when present', () => {
    const NAME = 'test client name'
    const URL = 'test client url'

    const attendee = {
      client: { webResource: { url: URL, text: NAME } },
      webResource: { text: 'test name', url: 'test url' }
    } as MeetingFragment['attendee']

    arrangeTest(attendee)

    const clientLink = screen.getByText(NAME)

    expect(clientLink).toBeInTheDocument()
    expect(clientLink).toHaveAttribute('href', URL)
  })

  it('renders attendees log button', () => {
    const NAME = 'test client name'
    const URL = 'test client url'

    const conferenceLink = {
      url: 'https://topt.al/VgckNv',
      text: 'http://bluejeans.test/19730933/7347'
    }

    when(mockUseQuery)
      .calledWith(GetMeetingAttendeesCountDocument, {
        variables: { meetingUrl: conferenceLink.url }
      })
      .mockReturnValue({
        data: { meetingEndpoints: { totalCount: 1 } },
        loading: false
      })

    const attendee = {
      client: { webResource: { url: URL, text: NAME } },
      webResource: { text: 'test name', url: 'test url' }
    } as MeetingFragment['attendee']

    arrangeTest(attendee, conferenceLink)

    expect(screen.getByText('View Attendee Log')).toBeInTheDocument()
  })
})
