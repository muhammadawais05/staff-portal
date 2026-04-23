import React, { ComponentProps } from 'react'
import { when } from 'jest-when'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { GetFeedbackReasonsDocument } from '@staff-portal/feedbacks'
import { useQuery } from '@staff-portal/data-layer-service'

import { ReasonModal } from '..'
import { useRejectEngagementTrial } from '../RejectEngagementTrialModal/data'

jest.mock('@staff-portal/data-layer-service')
const mockUseQuery = useQuery as jest.Mock

jest.mock('../../services', () => ({
  useNavigateToJobPage: () => jest.fn()
}))
jest.mock('../RejectEngagementTrialModal/data', () => ({
  useRejectEngagementTrial: jest.fn()
}))

const mockFeedbackReasons = () => {
  when(mockUseQuery)
    .calledWith(GetFeedbackReasonsDocument, expect.anything())
    .mockImplementation(() => ({
      data: {
        feedbackReasons: {
          nodes: [
            { id: '1', name: 'Reason 1' },
            { id: '2', name: 'Reason 2' }
          ]
        }
      },
      loading: false
    }))
}

const mockSuccessImplementation = () => {
  mockFeedbackReasons()
  const mockUseRejectEngagementTrial = useRejectEngagementTrial as jest.Mock

  mockUseRejectEngagementTrial.mockReturnValue([
    () => ({
      data: {
        rejectEngagementTrial: {
          success: true,
          errors: []
        }
      }
    }),
    { loading: false }
  ])
}

const mockErrorImplementation = () => {
  mockFeedbackReasons()
  const mockUseRejectEngagementTrial = useRejectEngagementTrial as jest.Mock

  mockUseRejectEngagementTrial.mockImplementation(
    ({ onError }: { onError: () => void }) => [onError, { loading: false }]
  )
}

const arrangeTest = (
  newProps?: Partial<ComponentProps<typeof ReasonModal>>
) => {
  const props: ComponentProps<typeof ReasonModal> = {
    hideModal: jest.fn(),
    engagementId: '123',
    title: 'Some Title',
    description: 'Some Description',
    submitLabel: 'Submit Label',
    errorMessage: 'Error Message',
    successNotificationMessage: 'Success Notification Message',
    mutationName: 'rejectEngagementTrial',
    ...newProps
  }

  return render(
    <TestWrapper>
      <ReasonModal {...props} />
    </TestWrapper>
  )
}

describe('ReasonModal', () => {
  it('displays success notification', async () => {
    mockSuccessImplementation()
    arrangeTest()

    expect(screen.queryByText('Some Title')).toBeInTheDocument()

    expect(screen.queryByText('Some Description')).toBeInTheDocument()

    userEvent.click(screen.getByLabelText(/Reason/))
    userEvent.click(await screen.findByText('Reason 2'))

    userEvent.type(screen.getByLabelText(/Details/), 'Some Details')

    userEvent.click(screen.getByText('Submit Label'))

    expect(
      await screen.findByText(/Success Notification Message/)
    ).toBeInTheDocument()
  })

  it('displays error notification', async () => {
    mockErrorImplementation()
    arrangeTest()

    userEvent.click(screen.getByLabelText(/Reason/))
    userEvent.click(await screen.findByText('Reason 2'))

    userEvent.type(screen.getByLabelText(/Details/), 'Some Details')

    userEvent.click(screen.getByText('Submit Label'))

    expect(await screen.findByText(/Error Message/)).toBeInTheDocument()
  })
})
