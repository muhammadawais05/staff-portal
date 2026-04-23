import { render, screen, within } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  OperationCallableTypes,
  Operation,
  FeedbackStatus
} from '@staff-portal/graphql/staff'

import { createFeedbackAnswerMock } from '../../data/feedback-answer-fragment/mock'
import FeedbackAnswers from './FeedbackAnswers'

jest.mock('../FeedbackAnswersSection')

const enabledOperation: Operation = {
  messages: [],
  callable: OperationCallableTypes.ENABLED
}

const hiddenOperation: Operation = {
  messages: [],
  callable: OperationCallableTypes.HIDDEN
}

const defaultProps: ComponentProps<typeof FeedbackAnswers> = {
  feedbackId: '123',
  feedbackStatus: FeedbackStatus.ACTIVE,
  clientAnswers: [],
  matcherAnswers: [],
  talentAnswers: [],
  createFeedbackClientAnswersOperation: enabledOperation,
  createFeedbackMatcherAnswersOperation: enabledOperation
}

const arrangeTest = (
  props: Partial<ComponentProps<typeof FeedbackAnswers>> = {}
) =>
  render(
    <TestWrapper>
      <FeedbackAnswers {...defaultProps} {...props} />
    </TestWrapper>
  )

describe('FeedbackAnswers', () => {
  it('shows the Client feedback answers', () => {
    const clientAnswers = [
      createFeedbackAnswerMock(
        { id: 'answer-1' },
        { id: 'performer-1', __typename: 'CompanyRepresentative' }
      )
    ]

    arrangeTest({ clientAnswers })

    const container = screen.getByTestId('feedback-answers-client')

    expect(within(container).queryByText('Client Feedback')).toBeInTheDocument()
    expect(
      within(container).queryByTestId('feedback-answers-client-answers')
    ).toHaveTextContent(
      '[{"id":"answer-1","option":{"id":"feedback-answer-option-id","question":{"id":"feedback-question-id","label":"Feedback Question"}},"operations":{"updateFeedbackAnswer":{"callable":"ENABLED","messages":[]}},"performer":{"id":"performer-1","__typename":"CompanyRepresentative"}}]'
    )
    expect(
      within(container).queryByTestId('feedback-answers-client-actionButton')
    ).toBeEmptyDOMElement()
  })

  it('shows the Talent & Matcher feedback answers', () => {
    const matcherAnswers = [
      createFeedbackAnswerMock(
        { id: 'answer-1' },
        { id: 'performer-1', __typename: 'Staff' }
      )
    ]
    const talentAnswers = [
      createFeedbackAnswerMock(
        { id: 'answer-2' },
        { id: 'performer-2', __typename: 'Talent' }
      )
    ]

    arrangeTest({ matcherAnswers, talentAnswers })

    const matcherContainer = screen.getByTestId('feedback-answers-matcher')
    const talentContainer = screen.getByTestId('feedback-answers-talent')

    expect(
      within(matcherContainer).queryByText('Matcher Feedback')
    ).toBeInTheDocument()
    expect(
      within(matcherContainer).queryByTestId('feedback-answers-matcher-answers')
    ).toHaveTextContent('[]')
    expect(
      within(matcherContainer).queryByTestId(
        'feedback-answers-matcher-actionButton'
      )
    ).toBeEmptyDOMElement()

    expect(
      within(talentContainer).queryByText('Talent Feedback')
    ).toBeInTheDocument()
    expect(
      within(talentContainer).queryByTestId('feedback-answers-talent-answers')
    ).toHaveTextContent(
      '[{"id":"answer-2","option":{"id":"feedback-answer-option-id","question":{"id":"feedback-question-id","label":"Feedback Question"}},"operations":{"updateFeedbackAnswer":{"callable":"ENABLED","messages":[]}},"performer":{"id":"performer-2","__typename":"Talent"}}]'
    )
  })

  it('shows the Client leave feedback button', () => {
    const matcherAnswers = [
      createFeedbackAnswerMock(
        { id: 'answer-1' },
        { id: 'performer-1', __typename: 'Staff' }
      )
    ]

    arrangeTest({ matcherAnswers })

    const container = screen.getByTestId('feedback-answers-client')

    expect(
      within(container).queryByTestId('feedback-answers-client-actionButton')
    ).not.toBeEmptyDOMElement()
    expect(
      within(container).queryByTestId('feedback-answers-client-answers')
    ).toHaveTextContent('[]')
  })

  it('shows the Matcher leave feedback button', () => {
    const talentAnswers = [
      createFeedbackAnswerMock(
        { id: 'answer-1' },
        { id: 'performer-1', __typename: 'Talent' }
      )
    ]

    arrangeTest({ talentAnswers })

    const container = screen.getByTestId('feedback-answers-matcher')

    expect(
      within(container).queryByTestId('feedback-answers-matcher-actionButton')
    ).not.toBeEmptyDOMElement()
    expect(
      within(container).queryByTestId('feedback-answers-matcher-answers')
    ).toHaveTextContent('[]')
  })

  it('hides the Matcher & Client feedback section', () => {
    const talentAnswers = [
      createFeedbackAnswerMock(
        { id: 'answer-1' },
        { id: 'performer-1', __typename: 'Talent' }
      )
    ]

    arrangeTest({
      talentAnswers,
      createFeedbackMatcherAnswersOperation: hiddenOperation,
      createFeedbackClientAnswersOperation: hiddenOperation
    })

    expect(
      screen.queryByTestId('feedback-answers-matcher')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('feedback-answers-client')
    ).not.toBeInTheDocument()
  })

  it('hides the Client leave feedback button', () => {
    const matcherAnswers = [
      createFeedbackAnswerMock(
        { id: 'answer-1' },
        { id: 'performer-1', __typename: 'Staff' }
      )
    ]

    arrangeTest({ feedbackStatus: FeedbackStatus.OUTDATED, matcherAnswers })

    const container = screen.getByTestId('feedback-answers-client')

    expect(
      within(container).queryByTestId('CreateFeedbackClientAnswersButton')
    ).not.toBeInTheDocument()
  })

  it('hides the Matcher leave feedback button', () => {
    const talentAnswers = [
      createFeedbackAnswerMock(
        { id: 'answer-1' },
        { id: 'performer-1', __typename: 'Talent' }
      )
    ]

    arrangeTest({ feedbackStatus: FeedbackStatus.OUTDATED, talentAnswers })

    const container = screen.getByTestId('feedback-answers-matcher')

    expect(
      within(container).queryByTestId('CreateFeedbackMatcherAnswersButton')
    ).not.toBeInTheDocument()
  })
})
