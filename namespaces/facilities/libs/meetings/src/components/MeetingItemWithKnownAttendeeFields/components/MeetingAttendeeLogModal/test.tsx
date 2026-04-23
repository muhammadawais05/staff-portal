import React, { ComponentProps } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import MeetingAttendeeLogModal from '.'
import { MeetingFragment } from '../../../../data/meeting-fragment'

jest.mock('../MeetingAttendeesContent/data', () => ({
  __esModule: true,
  useGetMeetingAttendees: () => ({
    data: {
      meetingEndpoints: {
        nodes: []
      }
    },
    loading: false
  })
}))

const arrangeTest = (props: ComponentProps<typeof MeetingAttendeeLogModal>) =>
  render(
    <TestWrapper>
      <MeetingAttendeeLogModal {...props} />
    </TestWrapper>
  )

describe('MeetingAttendeeLogModal', () => {
  const conferenceLink: MeetingFragment['conferenceLink'] = {
    url: 'https://topt.al/VgckNv',
    text: 'http://bluejeans.test/19730933/7347'
  }

  it('renders', () => {
    arrangeTest({
      hideModal: () => {},
      conferenceLink
    })

    expect(screen.getByText('Attendee Log')).toBeInTheDocument()
  })

  it('calls hideModal', () => {
    const hideModal = jest.fn()

    arrangeTest({
      hideModal,
      conferenceLink
    })

    fireEvent.click(screen.getByTestId('attendees-cancel-button'))

    expect(hideModal).toHaveBeenCalledTimes(1)
  })
})
