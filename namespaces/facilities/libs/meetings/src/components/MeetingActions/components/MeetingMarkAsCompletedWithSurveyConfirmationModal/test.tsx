import React from 'react'
import { useModal } from '@staff-portal/modals-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { fireEvent, render, screen, waitFor } from '@toptal/picasso/test-utils'

import { createSuccessfulCompleteMeetingMock } from '../../data/complete-meeting/mocks'
import MeetingMarkAsCompletedWithSurveyConfirmationModal from './MeetingMarkAsCompletedWithSurveyConfirmationModal'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const mockedUseModal = useModal as jest.Mock
const showSurveyModal = jest.fn()
const hideModal = jest.fn()
const MEETING_ID = '123'

const arrangeTest = (mocks?: MockedResponse[]) => {
  return render(
    <TestWrapperWithMocks mocks={mocks}>
      <MeetingMarkAsCompletedWithSurveyConfirmationModal
        meetingId={MEETING_ID}
        hideModal={hideModal}
      />
    </TestWrapperWithMocks>
  )
}

describe('MeetingMarkAsCompletedWithSurveyConfirmationModal', () => {
  beforeEach(() => {
    mockedUseModal.mockReturnValue({ showModal: showSurveyModal })
  })

  it('renders the modal', () => {
    arrangeTest()

    expect(
      screen.getByRole('button', { name: 'Skip Survey' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Submit Survey' })
    ).toBeInTheDocument()
  })

  it('completes the meeting', async () => {
    arrangeTest([
      createSuccessfulCompleteMeetingMock({ meetingId: MEETING_ID })
    ])

    fireEvent.click(screen.getByRole('button', { name: 'Skip Survey' }))

    expect(
      await screen.findByText('Meeting was marked as "Completed"')
    ).toBeInTheDocument()
  })

  it('shows the survey modal', async () => {
    arrangeTest()

    fireEvent.click(screen.getByRole('button', { name: 'Submit Survey' }))

    await waitFor(() => {
      expect(hideModal).toHaveBeenCalled()
      expect(showSurveyModal).toHaveBeenCalled()
    })
  })
})
