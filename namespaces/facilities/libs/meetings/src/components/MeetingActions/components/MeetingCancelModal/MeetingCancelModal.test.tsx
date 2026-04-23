import { useMutation } from '@staff-portal/data-layer-service'
import { CancelMeetingPostActionName } from '@staff-portal/graphql/staff'
import { useSendEmailModal } from '@staff-portal/communication-send-email'
import { TestWrapper } from '@staff-portal/test-utils'
import { fireEvent, render, screen, waitFor } from '@toptal/picasso/test-utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useDependency } from '@staff-portal/dependency-injector'
import { when } from 'jest-when'
import React from 'react'

import { CancelMeetingDocument } from './data'
import MeetingCancelModal from './MeetingCancelModal'
import { MEETING_CANCELED } from '../../../../messages'

jest.mock('@staff-portal/operations', () => ({
  ...jest.requireActual('@staff-portal/operations'),
  useGetOperation: () => ({ enabled: true })
}))
jest.mock('@staff-portal/dependency-injector', () => ({
  ...jest.requireActual('@staff-portal/dependency-injector'),
  useDependency: jest.fn()
}))

jest.mock('@staff-portal/communication-send-email', () => ({
  ...jest.requireActual('@staff-portal/communication-send-email'),
  useSendEmailModal: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service')
jest.mock('@toptal/staff-portal-message-bus')

const mockUseMutation = useMutation as jest.Mock
const mockUseMessageEmitter = useMessageEmitter as jest.Mock
const mockedUseSendCancelMeetingEmailModal = useSendEmailModal as jest.Mock
const mockedUseDependency = useDependency as jest.Mock

const mockSuccessImplementation = (
  nextActionName?: CancelMeetingPostActionName
) => {
  when(mockUseMutation)
    .calledWith(CancelMeetingDocument, expect.anything())
    .mockImplementation(() => [
      () => ({
        data: {
          cancelMeeting: {
            nextActionName,
            success: true,
            errors: [],
            meeting: { id: '123', attendee: { id: 'talent_id_123' } }
          }
        }
      }),
      { loading: false }
    ])
}

const mockErrorImplementation = () => {
  when(mockUseMutation)
    .calledWith(CancelMeetingDocument, expect.anything())
    .mockImplementation((_, { onError }: { onError: () => void }) => [
      onError,
      { loading: false }
    ])
}

const mock = (options?: {
  emitMessage?: () => void
  showSendEmailModal?: () => {}
  showSendRescheduleScreeningEmailModal?: () => {}
  showSendRescheduleActivationEmailModal?: () => {}
}) => {
  const emitMessage = jest.fn()

  mockUseMessageEmitter.mockReturnValue(options?.emitMessage ?? emitMessage)

  mockedUseSendCancelMeetingEmailModal.mockReturnValue({
    showModal: options?.showSendEmailModal,
    renderModal: jest.fn()
  })
  mockedUseDependency.mockReturnValue({
    useSendRescheduleScreeningEmailModal: () => ({
      showModal: options?.showSendRescheduleScreeningEmailModal,
      renderModal: jest.fn()
    }),
    useSendRescheduleReviewCallEmailModal: () => ({
      showModal: options?.showSendRescheduleActivationEmailModal,
      renderModal: jest.fn()
    })
  })
}

const renderComponent = (options?: {
  emitMessage?: () => void
  showSendEmailModal?: () => {}
  showSendRescheduleScreeningEmailModal?: () => {}
  showSendRescheduleActivationEmailModal?: () => {}
}) => {
  mock(options)

  return render(
    <TestWrapper>
      <MeetingCancelModal meetingId='123' hideModal={() => {}} />
    </TestWrapper>
  )
}

describe('MeetingCancelModal', () => {
  describe('when cancel meeting was successfully', () => {
    it('shows the success notification message', async () => {
      const emitMessage = jest.fn()

      mockSuccessImplementation()
      renderComponent({ emitMessage })

      fireEvent.change(screen.getByLabelText(/Comment/), {
        target: { value: 'some comment' }
      })

      fireEvent.click(screen.getByText('Confirm Cancellation'))

      expect(
        await screen.findByText('Meeting was canceled.')
      ).toBeInTheDocument()

      expect(emitMessage).toHaveBeenCalledWith(
        MEETING_CANCELED,
        expect.objectContaining({
          meetingId: '123',
          attendeeId: 'talent_id_123'
        })
      )
    })
  })

  describe('when cancel meeting failed', () => {
    it('shows the error notification message', async () => {
      mockErrorImplementation()
      renderComponent()

      fireEvent.change(screen.getByLabelText(/Comment/), {
        target: { value: 'some comment' }
      })

      fireEvent.click(screen.getByText('Confirm Cancellation'))

      expect(
        await screen.findByText('An error occurred, meeting was not canceled.')
      ).toBeInTheDocument()
    })
  })

  describe('when next action is send email', () => {
    it('shows the send email modal', async () => {
      const showEmailEvent = jest.fn()

      mockSuccessImplementation(
        CancelMeetingPostActionName.SEND_TO_EMAIL_POST_ACTION
      )
      renderComponent({ showSendEmailModal: showEmailEvent })

      fireEvent.change(screen.getByLabelText(/Comment/), {
        target: { value: 'some comment' }
      })

      fireEvent.click(screen.getByText('Confirm Cancellation'))

      await waitFor(() => {
        expect(showEmailEvent).toHaveBeenCalled()
      })
    })
  })

  describe('when next action is send reschedule screening email', () => {
    it('shows the send reschedule screening email modal', async () => {
      const showEmailEvent = jest.fn()

      mockSuccessImplementation(
        CancelMeetingPostActionName.RESCHEDULE_POST_ACTION
      )
      renderComponent({ showSendRescheduleScreeningEmailModal: showEmailEvent })

      fireEvent.change(screen.getByLabelText(/Comment/), {
        target: { value: 'some comment' }
      })

      fireEvent.click(screen.getByText('Confirm Cancellation'))

      await waitFor(() => {
        expect(showEmailEvent).toHaveBeenCalled()
      })
    })
  })

  describe('when next action is send reschedule activation email', () => {
    it('shows the send reschedule activation email modal', async () => {
      const showEmailEvent = jest.fn()

      mockSuccessImplementation(
        CancelMeetingPostActionName.TALENT_ACTIVATION_RESCHEDULE_POST_ACTION
      )
      renderComponent({
        showSendRescheduleActivationEmailModal: showEmailEvent
      })

      fireEvent.change(screen.getByLabelText(/Comment/), {
        target: { value: 'some comment' }
      })

      fireEvent.click(screen.getByText('Confirm Cancellation'))

      await waitFor(() => {
        expect(showEmailEvent).toHaveBeenCalled()
      })
    })
  })
})
