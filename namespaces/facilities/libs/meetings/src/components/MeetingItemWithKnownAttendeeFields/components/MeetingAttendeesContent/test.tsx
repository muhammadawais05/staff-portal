import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useGetMeetingAttendees } from './data'
import MeetingAttendeesContent from '.'
import { MeetingFragment } from '../../../../data/meeting-fragment'

jest.mock('./data', () => ({
  __esModule: true,
  useGetMeetingAttendees: jest.fn()
}))

const arrangeTest = (props: ComponentProps<typeof MeetingAttendeesContent>) =>
  render(
    <TestWrapper>
      <MeetingAttendeesContent {...props} />
    </TestWrapper>
  )

describe('MeetingAttendeesContent', () => {
  const conferenceLink: MeetingFragment['conferenceLink'] = {
    url: 'https://topt.al/VgckNv',
    text: 'http://bluejeans.test/19730933/7347'
  }

  it('renders loader', () => {
    const mockuseGetMeetingAttendees = useGetMeetingAttendees as jest.Mock

    mockuseGetMeetingAttendees.mockReturnValue({ data: [], loading: true })

    arrangeTest({
      conferenceLink
    })

    expect(screen.getByTestId('attendees-table-loader')).toBeInTheDocument()
  })

  it('renders no attendees', () => {
    const mockuseGetMeetingAttendees = useGetMeetingAttendees as jest.Mock

    mockuseGetMeetingAttendees.mockReturnValue({
      data: {
        meetingEndpoints: {
          totalCount: 0,
          nodes: []
        }
      },
      loading: false
    })

    arrangeTest({
      conferenceLink
    })

    expect(screen.getByText('No Attendees')).toBeInTheDocument()
  })

  it('renders attendees list', () => {
    const mockuseGetMeetingAttendees = useGetMeetingAttendees as jest.Mock

    mockuseGetMeetingAttendees.mockReturnValue({
      data: {
        meetingEndpoints: {
          totalCount: 1,
          nodes: []
        }
      },
      loading: false
    })

    arrangeTest({
      conferenceLink
    })

    expect(screen.getByTestId('attendees-log-table')).toBeInTheDocument()
  })
})
