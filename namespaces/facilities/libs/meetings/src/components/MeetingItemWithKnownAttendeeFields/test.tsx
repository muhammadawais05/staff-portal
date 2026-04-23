import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  MeetingScheduledVia,
  MeetingStatus,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { MockedProvider } from '@staff-portal/data-layer-service'

import {
  MeetingFragment,
  MeetingOperationFragment
} from '../../data/meeting-fragment'
import MeetingItemWithKnownAttendeeFields from './MeetingItemWithKnownAttendeeFields'

jest.mock('./components/MeetingScheduledViaField', () => () => (
  <>MeetingScheduledViaField</>
))

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

const ATTENDEE = {
  id: '123',
  webResource: { url: 'John The Attendee', text: 'John The Attendee' },
  __typename: 'Staff'
}

const ORGANIZER = {
  id: '321',
  fullName: 'Mary The Organizer',
  webResource: { url: 'http://x.com', text: 'Mary The Organizer' }
}

const ADD_INFO = 'Additional Information Copy'

const TEST_MEETING = {
  id: 'testId',
  subject: 'test meeting',
  attendee: ATTENDEE,
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

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const arrangeTest = (customParams: any = {}) =>
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <TestWrapper>
        <MeetingItemWithKnownAttendeeFields
          isOrganizer={false}
          meeting={TEST_MEETING}
          {...customParams}
        />
      </TestWrapper>
    </MockedProvider>
  )

describe('MeetingItemWithKnownAttendeeFields', () => {
  it('renders all basic fields if a data is presented', () => {
    const {
      container: { textContent }
    } = arrangeTest()

    expect(textContent).toContain('With')
    expect(textContent).toContain('John The Attendee')

    expect(textContent).toContain('Status')
    expect(textContent).toContain('Started')

    expect(textContent).toContain('Conference Link')
    expect(textContent).toContain(TEST_MEETING.conferenceLink?.text)
    expect(
      screen.getByText(TEST_MEETING.conferenceLink?.text ?? '')
    ).toHaveAttribute('href', TEST_MEETING.conferenceLink?.url)

    expect(textContent).toContain('Scheduled Via')
    expect(textContent).toContain('MeetingScheduledVia')
    expect(textContent).toContain('MeetingScheduleField')

    expect(textContent).toContain('Additional Information')
    expect(textContent).toContain('Additional Information Copy')
  })

  it('renders Organizer if the option is true', () => {
    const {
      container: { textContent }
    } = arrangeTest({ isOrganizer: true })

    expect(textContent).toContain('Mary The Organizer')
  })
})
