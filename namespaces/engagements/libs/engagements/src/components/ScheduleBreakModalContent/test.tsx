import userEvent from '@testing-library/user-event'
import { render, screen } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import {
  FeedbackReasonActions,
  RescheduleEngagementBreakInput,
  ScheduleEngagementBreakInput
} from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { createGetFeedbackReasonsMock } from '@staff-portal/feedbacks/src/mocks'

import { createRescheduleBreakFailedMock } from '../ScheduleBreakModal/data/reschedule-break/mocks'
import { createScheduleBreakFailedMock } from '../ScheduleBreakModal/data/schedule-break/mocks'
import { BreakType, ScheduleType } from '../ScheduleBreakModal/types'
import ScheduleBreakModal from '../ScheduleBreakModal'
import { ScheduleBreakModalContent } from '../ScheduleBreakModalContent'

// TODO avoid using real DatePicker in tests https://toptal-core.atlassian.net/browse/SPB-2311
jest.mock('@toptal/picasso/DatePicker', () =>
  jest.requireActual('@toptal/picasso/DatePicker')
)

const arrangeTest = (
  props?: Partial<ComponentProps<typeof ScheduleBreakModal>>,
  mocks?: MockedResponse[]
) => {
  window.Element.prototype.scrollIntoView = jest.fn()
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <ScheduleBreakModalContent
        onClose={onClose}
        breakType={BreakType.MULTI}
        engagementId={ENGAGEMENT_ID}
        scheduleType={ScheduleType.CREATE}
        status={null}
        {...props}
      />
    </TestWrapperWithMocks>
  )
}

const onSuccess = jest.fn()
const onClose = jest.fn()

const EDITED_DATA = {
  startDate: '2020-11-11',
  endDate: '2021-10-10',
  reasonId: '1',
  comment: 'I am a comment',
  messageToClient: 'I am a message to the client'
}
const ENGAGEMENT_ID = '1'

const submitForm = async (scheduleType: ScheduleType) => {
  userEvent.type(
    screen.getByLabelText(/First Day of Break/i),
    EDITED_DATA.startDate
  )
  userEvent.type(
    screen.getByLabelText(/Last Day of Break/i),
    EDITED_DATA.endDate
  )
  if (scheduleType === ScheduleType.CREATE) {
    userEvent.type(screen.getByLabelText(/Details/), EDITED_DATA.comment)
    userEvent.click(screen.getByLabelText(/Reason/))
    userEvent.click(await screen.findByText('Reason 1'))
  }
  userEvent.type(
    screen.getByLabelText(/Message to the Client/i),
    EDITED_DATA.messageToClient
  )
  const submitBtnName =
    scheduleType === ScheduleType.CREATE ? 'Schedule Break' : 'Reschedule Break'

  userEvent.click(screen.getByRole('button', { name: submitBtnName }))
}

const scheduleBreakMutationInput: ScheduleEngagementBreakInput = {
  engagementId: ENGAGEMENT_ID,
  singleDay: false,
  startDate: '2020-11-11',
  endDate: '2021-10-10',
  reasonId: '1',
  comment: 'I am a comment',
  messageToClient: 'I am a message to the client'
}

const rescheduleBreakMutationInput: RescheduleEngagementBreakInput = {
  engagementBreakId: 'test',
  startDate: '2020-11-11',
  endDate: '2021-10-10',
  singleDay: false,
  messageToClient: 'I am a message to the client'
}

describe('ScheduleBreakModal', () => {
  beforeEach(() => {
    onSuccess.mockClear()
    onClose.mockClear()
  })

  it('default render', () => {
    arrangeTest()
    expect(screen.getByLabelText(/Details/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Reason/)).toBeInTheDocument()
  })

  describe('CREATE schedule type', () => {
    it('renders error message', async () => {
      arrangeTest({ scheduleType: ScheduleType.CREATE }, [
        createScheduleBreakFailedMock(scheduleBreakMutationInput),
        createGetFeedbackReasonsMock({
          action: FeedbackReasonActions.ENGAGEMENT_PAUSED,
          length: 3
        })
      ])
      await submitForm(ScheduleType.CREATE)
      expect(
        await screen.findByText('Unable to schedule the Engagement Break.')
      ).toBeInTheDocument()
      expect(onSuccess).not.toHaveBeenCalled()
      expect(onClose).not.toHaveBeenCalled()
    })
  })

  describe('EDIT schedule type', () => {
    it('renders error message', async () => {
      arrangeTest({ scheduleType: ScheduleType.EDIT }, [
        createRescheduleBreakFailedMock(rescheduleBreakMutationInput),
        createGetFeedbackReasonsMock({
          action: FeedbackReasonActions.ENGAGEMENT_PAUSED,
          length: 3
        })
      ])
      await submitForm(ScheduleType.EDIT)
      expect(
        await screen.findByText('Unable to update the Engagement Break.')
      ).toBeInTheDocument()
      expect(onSuccess).not.toHaveBeenCalled()
      expect(onClose).not.toHaveBeenCalled()
    })
  })
})
