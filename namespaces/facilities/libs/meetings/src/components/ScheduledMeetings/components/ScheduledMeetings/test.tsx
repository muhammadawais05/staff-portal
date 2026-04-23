import { render, screen } from '@testing-library/react'
import React from 'react'
import { MeetingScheduledVia, MeetingStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { MeetingFragment } from '../../../../data/meeting-fragment'
import ScheduledMeetings, { Props } from './ScheduledMeetings'

jest.mock('../ScheduledMeetingItem', () => ({
  __esModule: true,
  default: () => <div data-testid='meeting-item' />
}))

jest.mock('../ScheduleMeetingOnBehalfButton', () => ({
  __esModule: true,
  default: () => <div data-testid='schedule-meeting-on-behalf-button' />
}))

const arrangeTest = (props: Props<{}>) => {
  return render(
    <TestWrapper>
      <ScheduledMeetings {...props} />
    </TestWrapper>
  )
}

describe('ScheduledMeetings', () => {
  it('lists meetings', async () => {
    arrangeTest(defaultProps)

    const items = await screen.findAllByTestId('meeting-item')

    expect(items).toHaveLength(1)
  })

  it('shows no meetings message', async () => {
    const fullName = 'Testing name'
    const props = {
      ...defaultProps,
      fullName,
      scheduledMeetings: []
    }

    arrangeTest(props)

    expect(
      await screen.findByText(`There are no meetings with ${fullName}.`)
    ).toBeInTheDocument()
  })

  it('shows link to schedule meeting on behalf of role', async () => {
    arrangeTest(defaultProps)

    expect(
      await screen.findByTestId('schedule-meeting-on-behalf-button')
    ).toBeInTheDocument()
  })
})

const defaultProps = {
  type: 'Developer',
  roleTitle: 'Developer',
  fullName: 'John Doe',
  scheduleMeetingUrl: '',
  loading: false,
  refetch: jest.fn(),
  scheduledMeetings: [
    {
      id: 'VjEtTWVldGluZy03NDM0NTQ',
      subject: 'Obfuscated subject for meeting 743454',
      currentScheduler: {
        id: 'VjEtTWVldGluZ1NjaGVkdWxlci00MDM0',
        code: 'LuisaB-dev-high-priority',
        role: {
          id: 'VjEtU3RhZmYtMTYzNDIzMA',
          type: 'Staff',
          roleTitle: 'Staff',
          fullName: 'Luisa Bernard',
          email: 'luis-2c8ba9ff55e8f628@toptal.io'
        }
      },
      attendeeName: 'Vickie Thompson',
      attendeeEmail: 'hell-491283d42877035e@toptal.io',
      attendee: {
        id: 'VjEtVGFsZW50LTE5NzE4OTc',
        webResource: {
          url: 'https://staging.toptal.net/platform/staff/talents/1971897',
          text: 'Jacquelin Oberbrunner'
        },
        __typename: 'Talent'
      },
      callbackRequest: null,
      masterBookingPage: {
        id: '1',
        title: 'Developer Initial Toptal Interview'
      },
      scheduledAt: '2020-07-17T15:20:00+02:00',
      scheduledVia: MeetingScheduledVia.BOOKING_PAGE,
      durationMinutes: 10,
      status: MeetingStatus.COMPLETED,
      outcome: null,
      comment: null,
      organizer: {
        id: 'VjEtU3RhZmYtMTYzNDIzMA',
        fullName: 'Luisa Bernard',
        webResource: {
          url: 'https://staging.toptal.net/platform/staff/talents/1971897',
          text: 'Jacquelin Oberbrunner'
        }
      },
      additionalInformation: null,
      conferenceLink: {
        url: 'https://topt.al/VgckNv',
        text: 'http://bluejeans.test/19730933/7347'
      },
      moderationUrl: null,
      relatedToRoleStep: {
        id: 'test-id',
        title: 'English'
      },
      operations: {
        cancelMeeting: {
          callable: 'HIDDEN',
          messages: []
        },
        becomeMeetingOrganizer: {
          callable: 'HIDDEN',
          messages: []
        },
        completeMeeting: {
          callable: 'HIDDEN',
          messages: []
        },
        completeMeetingWithSurvey: {
          callable: 'HIDDEN',
          messages: []
        },
        failMeeting: {
          callable: 'HIDDEN',
          messages: []
        },
        transferMeeting: {
          callable: 'HIDDEN',
          messages: []
        },
        assignMeetingAttendee: {
          callable: 'HIDDEN',
          messages: []
        },
        removeMeeting: {
          callable: 'HIDDEN',
          messages: []
        }
      }
    }
  ] as MeetingFragment[]
}
