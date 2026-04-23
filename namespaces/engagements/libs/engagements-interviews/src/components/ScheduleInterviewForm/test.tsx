import { arrayMutators, Form, useForm } from '@toptal/picasso-forms'
import { render, screen, fireEvent } from '@toptal/picasso/test-utils'
import React from 'react'
import {
  InterviewCommunicationType,
  InterviewInitiator,
  InterviewKind
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { COMMENT_FIELD_NAME } from '../../config'
import { useGetInterviewTimeSlotsForTimeZone } from '../../data'
import { createScheduleEngagementFragmentMock } from '../../data/fragments/schedule-engagement-fragment/mock'
import { createScheduleInterviewFragmentMock } from '../../data/fragments/schedule-interview-fragment/mock'
import { ScheduleInterviewFormValues } from '../../types'
import { ZOOM_PLACEHOLDER } from '../ScheduleGenericInterviewModalContent/utils/adjust-comment/adjust-comment'
import ScheduleInterviewForm, {
  GOOGLE_INVITATION_DESCRIPTION_FIELD_NAME,
  Props,
  TIME_SLOT_DATE_FIELD_NAME,
  TIME_SLOT_TIME_FIELD_NAME
} from './ScheduleInterviewForm'

jest.mock('../../data')
jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useForm: jest.fn()
}))
jest.mock('../../utils/get-schedule-interview-event-description', () => ({
  getScheduleInterviewEventDescription: ({
    communicationType,
    initiator
  }: {
    communicationType?: InterviewCommunicationType
    initiator: InterviewInitiator
  }) => {
    if (communicationType) {
      return `communicationType-${communicationType}`
    }

    if (initiator) {
      return `initiator-${initiator}`
    }
  }
}))

const useFormMock = useForm as jest.Mock

const TIMEZONES = [
  {
    name: '(UTC+03:00) Asia - Kuwait',
    value: 'Asia/Kuwait'
  },
  {
    name: '(UTC-04:00) America - New York',
    value: 'America/New_York'
  }
]

const mockReturnValues = () => {
  const mockUseGetInterviewTimeSlotsForTimeZone =
    useGetInterviewTimeSlotsForTimeZone as jest.Mock

  mockUseGetInterviewTimeSlotsForTimeZone.mockReturnValue({
    timeSlots: [
      {
        date: '2021-10-26',
        hours: ['06:30 PM', '06:45 PM']
      },
      {
        date: '2021-10-27',
        hours: ['12:00 AM', '12:15 AM']
      }
    ],
    timeSlotsLoading: false
  })
}

const arrangeTest = ({
  isClassic = false,
  isNew = false,
  scheduleEngagement,
  scheduleInterview,
  initialValues
}: Partial<
  Props & { initialValues: Partial<ScheduleInterviewFormValues> }
> = {}) =>
  render(
    <TestWrapper>
      <Form
        initialValues={{ ...initialValues, interviewContacts: [] }}
        onSubmit={() => {}}
        mutators={{ ...arrayMutators }}
      >
        <ScheduleInterviewForm
          isClassic={isClassic}
          isNew={isNew}
          scheduleEngagement={createScheduleEngagementFragmentMock(
            scheduleEngagement
          )}
          scheduleInterview={createScheduleInterviewFragmentMock(
            scheduleInterview
          )}
          timezones={TIMEZONES}
          zoomExperimentEnabled={false}
        />
      </Form>
    </TestWrapper>
  )

describe('ScheduleInterviewForm', () => {
  const changeMock = jest.fn()

  beforeEach(() => {
    useFormMock.mockImplementation(() => ({ change: changeMock }))
  })

  it('hides classic fields', () => {
    mockReturnValues()
    arrangeTest()

    expect(screen.getByLabelText(/Date/)).toBeInTheDocument()
    expect(
      screen.queryByLabelText('Accept Interview for Talent')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByLabelText('Disable Company Notifications')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByLabelText('Send Google Calendar Invitation')
    ).not.toBeInTheDocument()
  })

  it('shows classic fields', () => {
    mockReturnValues()
    arrangeTest({ isClassic: true })

    expect(
      screen.getByLabelText('Accept Interview for Talent')
    ).toBeInTheDocument()
    expect(screen.queryByLabelText(/Date/)).not.toBeInTheDocument()
    expect(
      screen.queryByLabelText('Disable Company Notifications')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByLabelText('Send Google Calendar Invitation')
    ).not.toBeInTheDocument()
  })

  it('shows external fields', async () => {
    mockReturnValues()
    arrangeTest({
      scheduleInterview: createScheduleInterviewFragmentMock({
        kind: InterviewKind.EXTERNAL
      })
    })

    expect(
      screen.getByLabelText('Disable Company Notifications')
    ).toBeInTheDocument()
    expect(
      await screen.findByLabelText(/Send Google Calendar Invitation/)
    ).toBeInTheDocument()
  })

  it('shows internal fields', async () => {
    mockReturnValues()
    arrangeTest({
      scheduleInterview: createScheduleInterviewFragmentMock({
        kind: InterviewKind.INTERNAL
      })
    })

    expect(screen.getByLabelText('Event Description')).toBeInTheDocument()
  })

  it('hides the disable company notification checkbox when is not enterprise', async () => {
    mockReturnValues()
    arrangeTest({
      scheduleEngagement: createScheduleEngagementFragmentMock({
        client: {
          id: '1',
          fullName: 'Client Full Name',
          enterprise: false,
          contact: {
            id: 'contact-id',
            phoneNumber: 'client-123456'
          }
        }
      }),
      scheduleInterview: createScheduleInterviewFragmentMock({
        kind: InterviewKind.EXTERNAL
      })
    })

    expect(
      screen.queryByLabelText('Disable Company Notifications')
    ).not.toBeInTheDocument()
  })

  it('shows comment and communication hints', () => {
    mockReturnValues()
    arrangeTest({
      isClassic: true,
      isNew: true,
      scheduleInterview: createScheduleInterviewFragmentMock({
        kind: InterviewKind.EXTERNAL
      })
    })

    expect(
      screen.getByText(
        "Share anything else you'd like the candidate to know before the interview. For example, the candidate may need a specific environment set up beforehand or be prepared to discuss a specific technical aspect of your project."
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Once the interview time is confirmed, you will receive all needed contact information.'
      )
    ).toBeInTheDocument()
  })

  it('shows communication and initiator labels for schedule interview', () => {
    mockReturnValues()
    arrangeTest({
      isNew: true,
      scheduleInterview: createScheduleInterviewFragmentMock({
        kind: InterviewKind.EXTERNAL
      })
    })

    expect(screen.getByText('Method of Communication')).toBeInTheDocument()
    expect(screen.getByText('Call Initiator')).toBeInTheDocument()
  })

  describe('when timezone is changed for TopScheduler', () => {
    it('clears date and time field', async () => {
      mockReturnValues()
      arrangeTest()

      fireEvent.click(screen.getByLabelText(/Time Zone/))
      fireEvent.click(await screen.findByText('(UTC+03:00) Asia - Kuwait'))

      fireEvent.click(screen.getByLabelText(/Date/))
      fireEvent.click(await screen.findByText('2021-10-27'))

      fireEvent.click(screen.getByLabelText(/Time$/))
      fireEvent.click(await screen.findByText('12:00 AM'))

      expect(screen.getByLabelText(/Date/)).toHaveValue('2021-10-27')
      expect(screen.getByLabelText(/Time$/)).toHaveValue('12:00 AM')

      fireEvent.click(screen.getByLabelText(/Time Zone/))
      fireEvent.click(await screen.findByText('(UTC-04:00) America - New York'))

      expect(changeMock).toHaveBeenCalledWith(TIME_SLOT_DATE_FIELD_NAME)
      expect(changeMock).toHaveBeenCalledWith(TIME_SLOT_TIME_FIELD_NAME)
    })
  })

  describe('when preferredDuration is changed for TopScheduler', () => {
    it('clears date and time field', async () => {
      mockReturnValues()
      arrangeTest()

      fireEvent.click(screen.getByLabelText(/Interview Length/))
      fireEvent.click(await screen.findByText('15 minutes'))

      fireEvent.click(screen.getByLabelText(/Date/))
      fireEvent.click(await screen.findByText('2021-10-27'))

      fireEvent.click(screen.getByLabelText(/Time$/))
      fireEvent.click(await screen.findByText('12:00 AM'))

      expect(screen.getByLabelText(/Date/)).toHaveValue('2021-10-27')
      expect(screen.getByLabelText(/Time$/)).toHaveValue('12:00 AM')

      fireEvent.click(screen.getByLabelText(/Interview Length/))
      fireEvent.click(await screen.findByText('30 minutes'))

      expect(changeMock).toHaveBeenCalledWith(TIME_SLOT_DATE_FIELD_NAME)
      expect(changeMock).toHaveBeenCalledWith(TIME_SLOT_TIME_FIELD_NAME)
    })
  })

  describe('when field values changes', () => {
    describe('when changes on `SKYPE`', () => {
      it('should update comment & gcDescription fields', async () => {
        mockReturnValues()
        arrangeTest({
          scheduleInterview: createScheduleInterviewFragmentMock({
            communication: InterviewCommunicationType.PHONE,
            schedulingComment: 'foo'
          }),
          initialValues: {
            comment: 'foo'
          }
        })

        fireEvent.click(screen.getByLabelText(/Method of Communication/))
        fireEvent.click(await screen.findByText(/Skype/))

        expect(changeMock).toHaveBeenCalledWith(COMMENT_FIELD_NAME, 'foo')
        expect(changeMock).toHaveBeenCalledWith(
          GOOGLE_INVITATION_DESCRIPTION_FIELD_NAME,
          `communicationType-${InterviewCommunicationType.SKYPE}`
        )
      })
    })

    describe('when changes on `CUSTOM_WEB_CONFERENCE`', () => {
      it('should update comment & gcDescription fields', async () => {
        mockReturnValues()
        arrangeTest({
          scheduleInterview: createScheduleInterviewFragmentMock({
            communication: InterviewCommunicationType.PHONE,
            schedulingComment: 'foo'
          }),
          initialValues: {
            comment: 'foo'
          }
        })

        fireEvent.click(screen.getByLabelText(/Method of Communication/))
        fireEvent.click(await screen.findByText('Web Conference (Other)'))

        expect(changeMock).toHaveBeenCalledWith(
          COMMENT_FIELD_NAME,
          `foo\n${ZOOM_PLACEHOLDER}`
        )
        expect(changeMock).toHaveBeenCalledWith(
          GOOGLE_INVITATION_DESCRIPTION_FIELD_NAME,
          `communicationType-${InterviewCommunicationType.CUSTOM_WEB_CONFERENCE}`
        )
      })
    })

    describe('when changes from `CUSTOM_WEB_CONFERENCE`', () => {
      it('should update comment & gcDescription fields', async () => {
        mockReturnValues()
        arrangeTest({
          scheduleInterview: createScheduleInterviewFragmentMock({
            communication: InterviewCommunicationType.CUSTOM_WEB_CONFERENCE,
            schedulingComment: `foo\n${ZOOM_PLACEHOLDER}`
          }),
          initialValues: {
            comment: `foo\n${ZOOM_PLACEHOLDER}`
          }
        })

        fireEvent.click(screen.getByLabelText(/Method of Communication/))
        fireEvent.click(await screen.findByText(/Phone/))

        expect(changeMock).toHaveBeenCalledWith(
          COMMENT_FIELD_NAME,
          `foo\n${ZOOM_PLACEHOLDER}`
        )
        expect(changeMock).toHaveBeenCalledWith(
          GOOGLE_INVITATION_DESCRIPTION_FIELD_NAME,
          `communicationType-${InterviewCommunicationType.PHONE}`
        )
      })
    })

    describe('when Initiator changes', () => {
      it('updates gcDescription', async () => {
        mockReturnValues()
        arrangeTest({
          scheduleInterview: createScheduleInterviewFragmentMock({
            kind: InterviewKind.EXTERNAL
          })
        })

        fireEvent.click(screen.getByLabelText(/Call Initiator/))
        fireEvent.click(
          await screen.findByText(/The company will initiate the interview/)
        )

        expect(changeMock).toHaveBeenCalledWith(
          GOOGLE_INVITATION_DESCRIPTION_FIELD_NAME,
          `initiator-${InterviewInitiator.INTERVIEWER}`
        )
      })
    })
  })
})
