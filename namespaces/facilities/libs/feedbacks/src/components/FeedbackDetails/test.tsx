import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { FeedbackStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { FeedbackDetailsFragment } from '../../data/feedback-details-fragment'
import { createFeedbackMock } from '../../data/feedback-details-fragment/mock'
import FeedbackDetails from './FeedbackDetails'

jest.mock('./utils', () => ({
  __esModule: true,
  getFeedbackDetailsContentItems: () => []
}))

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useMutation: () => [jest.fn(), { data: {} }]
}))

const arrangeTest = (feedback: Partial<FeedbackDetailsFragment> = {}) => {
  const mock = createFeedbackMock(feedback)

  return render(
    <TestWrapper>
      <FeedbackDetails feedback={mock} onMarkOutdated={() => {}} />
    </TestWrapper>
  )
}

describe('FeedbackDetails', () => {
  it('shows the mark outdated feedback message', () => {
    const OUTDATED_MESSAGE = 'Some Outdated Message'

    arrangeTest({
      outdatedComment: OUTDATED_MESSAGE,
      status: FeedbackStatus.OUTDATED
    })

    expect(screen.getByText(OUTDATED_MESSAGE)).toBeInTheDocument()
  })

  it('hides the mark outdated feedback message', () => {
    const OUTDATED_MESSAGE = 'Some Outdated Message'

    arrangeTest({
      outdatedComment: OUTDATED_MESSAGE,
      status: FeedbackStatus.ACTIVE
    })

    expect(screen.queryByText(OUTDATED_MESSAGE)).not.toBeInTheDocument()
  })
})
