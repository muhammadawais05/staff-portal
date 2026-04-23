import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import {
  FeedbackReasonActions,
  FeedbackStatus
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { when } from 'jest-when'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetFeedbackReasonsDocument } from '../../containers/FormReasonSelect/data'
import FeedbackDetailsReason from './FeedbackDetailsReason'

jest.mock('@staff-portal/data-layer-service')

jest.unmock('@staff-portal/editable')

jest.mock('./data', () => ({
  useUpdateFeedbackReason: () => [jest.fn(), { loading: false }],
  getLazyFeedbackReasonHook: () => () => ({
    request: () => {},
    data: undefined,
    loading: false
  })
}))

const mockFeedbackReasons = () => {
  const useLazyQueryMock = useLazyQuery as jest.Mock

  when(useLazyQueryMock)
    .calledWith(GetFeedbackReasonsDocument, expect.anything())
    .mockImplementation(() => {
      return [
        () => {},
        {
          data: {
            feedbackReasons: {
              nodes: [{ id: '1', name: 'Option 1' }]
            }
          },
          loading: false
        }
      ]
    })
}

const arrangeTest = (
  feedbackStatus: FeedbackStatus = FeedbackStatus.ACTIVE
) => {
  mockFeedbackReasons()

  return render(
    <TestWrapper>
      <FeedbackDetailsReason
        feedbackId='1'
        reasonId='1'
        reasonLabel='Reason Label'
        actionIdentifier={FeedbackReasonActions.ENGAGEMENT_PAUSED}
        feedbackStatus={feedbackStatus}
      />
    </TestWrapper>
  )
}

describe('FeedbackDetailsReason', () => {
  it('shows reason label without outdated', () => {
    arrangeTest()

    expect(screen.getByText('Reason Label')).toBeInTheDocument()
    expect(screen.queryByText('Outdated')).not.toBeInTheDocument()
  })

  it('shows reason label with outdated', () => {
    arrangeTest(FeedbackStatus.OUTDATED)

    expect(screen.getByText('Reason Label')).toBeInTheDocument()
    expect(screen.getByText('(outdated)')).toBeInTheDocument()
  })

  it('shows reason options', async () => {
    arrangeTest()

    fireEvent.click(screen.getByTestId('EditableField-toggle-button-reasonId'))
    expect(
      screen.getByTestId('FeedbackDetailsReason-options-select')
    ).toBeInTheDocument()
  })
})
