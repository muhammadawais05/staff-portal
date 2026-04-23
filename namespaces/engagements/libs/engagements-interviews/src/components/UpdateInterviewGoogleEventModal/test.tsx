import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { when } from 'jest-when'
import React from 'react'
import { useMutation } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import { createScheduleEngagementFragmentMock } from '../../data/fragments/schedule-engagement-fragment/mock'
import { createScheduleInterviewFragmentMock } from '../../data/fragments/schedule-interview-fragment/mock'
import { UpdateInterviewGoogleCalendarEventDocument } from './data'
import UpdateInterviewGoogleEventModal from './UpdateInterviewGoogleEventModal'

jest.mock('@staff-portal/data-layer-service')
const mockUseMutation = useMutation as jest.Mock

const mockSuccessImplementation = () => {
  when(mockUseMutation)
    .calledWith(UpdateInterviewGoogleCalendarEventDocument, expect.anything())
    .mockImplementation(() => [
      () => ({
        data: {
          updateInterviewGoogleCalendarEvent: {
            success: true,
            errors: []
          }
        }
      })
    ])
}

const mockErrorImplementation = () => {
  when(mockUseMutation)
    .calledWith(UpdateInterviewGoogleCalendarEventDocument, expect.anything())
    .mockImplementation((_, { onError }: { onError: () => void }) => [onError])
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <UpdateInterviewGoogleEventModal
        interviewId='1'
        scheduleEngagement={createScheduleEngagementFragmentMock()}
        scheduleInterview={createScheduleInterviewFragmentMock()}
        hideModal={() => {}}
      />
    </TestWrapper>
  )

describe('UpdateInterviewGoogleEventModal', () => {
  it('shows success message', async () => {
    mockSuccessImplementation()

    arrangeTest()

    fireEvent.click(screen.getByText('Update Interview'))

    expect(
      await screen.findByText('The Interview was successfully updated.')
    ).toBeInTheDocument()
  })

  it('shows error message', async () => {
    mockErrorImplementation()

    arrangeTest()

    fireEvent.click(screen.getByText('Update Interview'))

    expect(
      await screen.findByText(
        'An error occurred, the Interview was not updated.'
      )
    ).toBeInTheDocument()
  })
})
