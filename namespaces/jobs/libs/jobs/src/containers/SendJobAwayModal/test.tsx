import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { useQuery } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import SendJobAwayModal from './SendJobAwayModal'
import { GetSendJobAwayQuery } from './data/get-send-job-away.staff.gql.types'
import { matchingCallsMock } from './data/mocks'
import useSendJobAwayMutation from './hooks/use-send-job-away-mutation'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/engagements')
jest.mock('./hooks/use-send-job-away-mutation')

const useQueryMock = useQuery as jest.Mock
const useSendJobAwayMutationMock = useSendJobAwayMutation as jest.Mock

const jobMock = (jobPartial: Partial<GetSendJobAwayQuery> = {}) => ({
  feedbackReasons: {
    nodes: []
  },
  node: {
    id: 'job-1',
    totalCount: 0,
    possiblyRelatedMeetings: []
  },
  ...jobPartial
})

const arrangeTest = () =>
  render(
    <TestWrapper>
      <SendJobAwayModal jobId='test-job-id' hideModal={() => {}} />
    </TestWrapper>
  )

describe('SendJobAwayModal', () => {
  const handleSubmitMock = jest.fn()

  beforeEach(() => {
    useSendJobAwayMutationMock.mockReturnValue({
      handleSubmit: handleSubmitMock,
      mutationLoading: false
    })
  })

  it('renders a basic state of the form', async () => {
    useQueryMock.mockReturnValue({
      data: jobMock(),
      initialLoading: false
    })

    arrangeTest()

    expect(screen.getByTestId('SendJobAwayModal-reason')).toBeInTheDocument()
    expect(
      screen.queryByTestId('SendJobAwayModal-first-meeting')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('SendJobAwayModal-matching-call')
    ).not.toBeInTheDocument()
    expect(
      screen.getByTestId('SendJobAwayModal-submit-button')
    ).toBeInTheDocument()
  })

  it('renders the only meeting ID in the hidden field', async () => {
    useQueryMock.mockReturnValue({
      data: jobMock({
        node: {
          id: 'node-id-1',
          possiblyRelatedMeetings: {
            totalCount: 1,
            nodes: [matchingCallsMock[0]]
          }
        }
      }),
      initialLoading: false
    })

    arrangeTest()

    expect(
      screen.queryByTestId('SendJobAwayModal-first-meeting')
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId('SendJobAwayModal-matching-call')
    ).not.toBeInTheDocument()
  })

  it('renders the matching calls selector', async () => {
    useQueryMock.mockReturnValue({
      data: jobMock({
        node: {
          id: 'node-id-1',
          possiblyRelatedMeetings: {
            totalCount: matchingCallsMock.length,
            nodes: matchingCallsMock
          }
        }
      }),
      initialLoading: false
    })

    arrangeTest()

    expect(
      screen.queryByTestId('SendJobAwayModal-first-meeting')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('SendJobAwayModal-matching-call')
    ).toBeInTheDocument()
  })

  it('sends the form with the only meeting ID', async () => {
    useQueryMock.mockReturnValue({
      data: jobMock({
        node: {
          id: 'node-id-1',
          possiblyRelatedMeetings: {
            totalCount: 1,
            nodes: [matchingCallsMock[0]]
          }
        }
      }),
      initialLoading: false
    })

    arrangeTest()

    fireEvent.change(screen.getByLabelText(/Reason/), {
      target: { value: 'feedbackReasons-1' }
    })

    fireEvent.change(screen.getByLabelText(/Details/), {
      target: { value: 'Comment' }
    })

    await act(async () => {
      fireEvent.click(screen.getByTestId('SendJobAwayModal-submit-button'))
    })

    expect(handleSubmitMock).toHaveBeenCalledTimes(1)
    expect(handleSubmitMock).toHaveBeenCalledWith(
      {
        comment: 'Comment',
        meetingId: 'meeting-1',
        reasonId: 'feedbackReasons-1'
      },
      expect.anything(),
      expect.anything()
    )
  })
})
