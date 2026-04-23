import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { when } from 'jest-when'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useMutation, useQuery } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { formatDate } from '@staff-portal/date-time-utils'
import {
  GetFeedbackReasonsDocument,
  FeedbackReasonFragment
} from '@staff-portal/feedbacks'

import { TerminateEngagementDocument } from '../../data'
import TerminateEngagementModalContent from './TerminateEngagementModalContent'
import { ENGAGEMENT_UPDATED } from '../../../../messages'

jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  __esModule: true,
  useMessageEmitter: jest.fn()
}))

jest.mock('@staff-portal/data-layer-service')
const mockUseQuery = useQuery as jest.Mock
const mockUseMutation = useMutation as jest.Mock

const REASONS: FeedbackReasonFragment[] = [
  { id: '1', identifier: 'dissatisfied_with_my_talent', name: 'Reason 1' },
  { id: '2', identifier: 'hiring_replacement', name: 'Reason 2' },
  { id: '3', identifier: 'others', name: 'Reason 3' }
]

const mockGetData = () => {
  when(mockUseQuery)
    .calledWith(GetFeedbackReasonsDocument, expect.anything())
    .mockImplementation(() => ({
      data: {
        feedbackReasons: {
          nodes: REASONS
        }
      },
      loading: false
    }))
}

const mockSuccessImplementation = () => {
  when(mockUseMutation)
    .calledWith(TerminateEngagementDocument, expect.anything())
    .mockImplementation(() => [
      () => ({
        data: {
          terminateEngagement: {
            success: true,
            errors: []
          }
        }
      }),
      { loading: false }
    ])
}

const mockErrorImplementation = () => {
  when(mockUseMutation)
    .calledWith(TerminateEngagementDocument, expect.anything())
    .mockImplementation((_, { onError }: { onError: () => void }) => [
      onError,
      { loading: false }
    ])
}

const arrangeTest = ({ endDate }: Partial<{ endDate: Date }> = {}) =>
  render(
    <TestWrapper>
      <TerminateEngagementModalContent
        engagementId='1'
        title='End Engagement'
        endDate={endDate}
        onClose={() => {}}
      />
    </TestWrapper>
  )

describe('TerminateEngagementModalContent', () => {
  it('shows the success message', async () => {
    window.Element.prototype.scrollIntoView = jest.fn()

    const emitMessage = jest.fn()
    const mockUseMessageEmitter = useMessageEmitter as jest.Mock

    mockUseMessageEmitter.mockReturnValue(emitMessage)

    const date = new Date(2021, 8, 26)

    const SUCCESS_MESSAGE = `The Job was successfully scheduled to end on ${formatDate(
      date
    )}.`

    mockGetData()
    mockSuccessImplementation()
    arrangeTest({ endDate: date })

    fireEvent.click(screen.getByLabelText(/Reason/))

    fireEvent.click(await screen.findByText('Reason 3'))

    fireEvent.change(
      screen.getByLabelText(/Please Provide Us With Brief Details/i),
      {
        target: { value: 'Some Comment' }
      }
    )

    fireEvent.click(
      screen.getByTestId('TerminateEngagementModal-submit-button')
    )

    expect(await screen.findByText(SUCCESS_MESSAGE)).toBeInTheDocument()

    expect(emitMessage).toHaveBeenCalledWith(ENGAGEMENT_UPDATED, {
      engagementId: '1'
    })
  })

  it('shows error message', async () => {
    mockGetData()
    mockErrorImplementation()
    arrangeTest()

    fireEvent.click(screen.getByLabelText(/Reason/))

    fireEvent.click(await screen.findByText('Reason 3'))

    fireEvent.change(
      screen.getByLabelText(/Please Provide Us With Brief Details/i),
      {
        target: { value: 'Some Comment' }
      }
    )

    fireEvent.click(
      screen.getByTestId('TerminateEngagementModal-submit-button')
    )

    expect(
      await screen.findByText(
        /An error occurred, unable to terminate engagement./
      )
    ).toBeInTheDocument()
  })
})
