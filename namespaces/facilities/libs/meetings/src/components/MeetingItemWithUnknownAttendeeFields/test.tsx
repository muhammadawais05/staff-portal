import React from 'react'
import { render } from '@testing-library/react'
import {
  MeetingScheduledVia,
  MeetingStatus,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import {
  MeetingFragment,
  MeetingOperationFragment
} from '../../data/meeting-fragment'
import MeetingItemWithUnknownAttendeeFields from './MeetingItemWithUnknownAttendeeFields'

jest.mock('../MeetingScheduleField', () => () => <>MeetingScheduleField</>)

const OPERATION = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
} as MeetingOperationFragment

const TEST_OPERATIONS = {
  failMeeting: OPERATION,
  completeMeeting: OPERATION,
  cancelMeeting: OPERATION,
  removeMeeting: OPERATION
} as MeetingFragment['operations']

const ORGANIZER = {
  id: '321',
  fullName: 'Mary The Organizer',
  webResource: { url: 'http://x.com', text: 'xcom' }
}

const ADD_INFO = 'Additional Information Copy'

const TEST_MEETING = {
  id: 'testId',
  subject: 'test meeting',
  attendeeName: 'Victor The Great',
  attendeeEmail: 'victor@the.great',
  organizer: ORGANIZER,
  status: MeetingStatus.STARTED,
  operations: TEST_OPERATIONS,
  scheduledVia: MeetingScheduledVia.BOOKING_PAGE,
  additionalInformation: ADD_INFO,
  scheduledAt: '2020-12-20T00:00:00+00:00',
  durationMinutes: 30,
  comment: 'A comment',
  conferenceLink: {
    url: 'https://topt.al/VgckNv',
    text: 'http://bluejeans.test/19730933/7347'
  }
} as MeetingFragment

const arrangeTest = () =>
  render(
    <TestWrapper>
      <MeetingItemWithUnknownAttendeeFields meeting={TEST_MEETING} />
    </TestWrapper>
  )

describe('MeetingItemWithUnknownAttendeeFields', () => {
  it('renders all basic fields if a data is presented', () => {
    const {
      container: { textContent }
    } = arrangeTest()

    expect(textContent).toContain('Name')
    expect(textContent).toContain('Victor The Great')

    expect(textContent).toContain('Email')
    expect(textContent).toContain('victor@the.great')

    expect(textContent).toContain('Status')
    expect(textContent).toContain('Started')

    expect(textContent).toContain('MeetingScheduleField')

    expect(textContent).toContain('Additional Information')
    expect(textContent).toContain('Additional Information Copy')
  })
})
