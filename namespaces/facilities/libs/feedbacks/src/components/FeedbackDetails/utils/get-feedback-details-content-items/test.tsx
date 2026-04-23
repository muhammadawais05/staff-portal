import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { FeedbackStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { DetailedListItems, DetailedList } from '@staff-portal/ui'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import { FeedbackDetailsFragment } from '../../../../data/feedback-details-fragment'
import { getFeedbackDetailsContentItems } from './get-feedback-details-content-items'

jest.mock('../../../FeedbackDetailsComment', () => ({
  __esModule: true,
  default: () => <div data-testid='feedback-details-comment' />
}))

jest.mock('../../../FeedbackDetailsFollowupTask', () => ({
  __esModule: true,
  default: () => <div data-testid='feedback-details-followup-task' />
}))

jest.mock('../../../FeedbackDetailsReason', () => ({
  __esModule: true,
  default: () => <div data-testid='feedback-details-reason' />
}))

jest.mock('../get-feedback-details-period', () => ({
  getFeedbackDetailsPeriod: () => '-'
}))

const mockGetFeedbackDetailsContentItems = ({
  status = FeedbackStatus.ACTIVE,
  operations = {
    updateFeedbackComment: createOperationMock(),
    updateFeedbackReason: createOperationMock(),
    markOutdatedFeedback: createOperationMock(),
    createFeedbackClientAnswers: createOperationMock(),
    createFeedbackMatcherAnswers: createOperationMock()
  },
  performer = { id: '1', webResource: { text: '', url: '' } },
  reason = {
    id: '1',
    name: '',
    action: {
      id: '1',
      shortName: 'Cancelled',
      name: 'Cancelled',
      identifier: 'cancelled'
    }
  },
  task = { id: '1', status: 'pending' },
  ...rest
}: Partial<FeedbackDetailsFragment> = {}) =>
  getFeedbackDetailsContentItems({
    feedback: {
      id: '123',
      createdAt: '',
      comment: 'my comment',
      status,
      operations,
      performer,
      reason,
      task,
      ...rest
    },
    userDateFormatter: jest.fn()
  })

const arrangeTest = (items: DetailedListItems) =>
  render(
    <TestWrapper>
      {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
      <DetailedList labelColumnWidth={10} items={items} />
    </TestWrapper>
  )

describe('getFeedbackDetailsContentItems', () => {
  it('contains all fields', () => {
    const items = mockGetFeedbackDetailsContentItems({
      targetPeriodStartDate: '2021-08-19T00:00:00+00:00',
      targetPeriodEndDate: '2021-08-20T00:00:00+00:00'
    })

    arrangeTest(items)

    expect(screen.getByText('Performer')).toBeInTheDocument()
    expect(screen.getByText('Cancelled')).toBeInTheDocument()
    expect(screen.getByText('Period')).toBeInTheDocument()
    expect(screen.getByTestId('feedback-details-comment')).toBeInTheDocument()
    expect(
      screen.getByTestId('feedback-details-followup-task')
    ).toBeInTheDocument()
    expect(screen.getByTestId('feedback-details-reason')).toBeInTheDocument()
  })

  it('hides tasks', () => {
    const items = mockGetFeedbackDetailsContentItems({
      status: FeedbackStatus.OUTDATED
    })

    arrangeTest(items)

    expect(
      screen.queryByTestId('feedback-details-followup-task')
    ).not.toBeInTheDocument()
  })

  it('shows action name instead of short name', () => {
    const items = mockGetFeedbackDetailsContentItems({
      reason: {
        id: '',
        name: 'Reason Name',
        action: {
          id: '1',
          identifier: 'identifier',
          name: 'Action Name'
        }
      }
    })

    arrangeTest(items)

    expect(screen.getByText('Action Name')).toBeInTheDocument()
  })

  describe('when all target fields are `null`', () => {
    it('hides period row', () => {
      const items = mockGetFeedbackDetailsContentItems({
        targetPeriodSingleDay: null,
        targetPeriodStartDate: null,
        targetPeriodEndDate: null
      })

      arrangeTest(items)

      expect(screen.queryByText('Period')).not.toBeInTheDocument()
    })
  })
})
