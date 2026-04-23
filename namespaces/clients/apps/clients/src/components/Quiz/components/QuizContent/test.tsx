import { ClientCumulativeStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'
import React, { ComponentProps } from 'react'

import QuizContent from '.'
import { quizMock } from '../../data/get-quiz.mock'

jest.mock('../QuizSection')

const arrangeTest = (props: ComponentProps<typeof QuizContent>) =>
  render(
    <TestWrapper>
      <QuizContent {...props} />
    </TestWrapper>
  )

describe('QuizContent', () => {
  describe('when all data is passed', () => {
    beforeEach(() => {
      arrangeTest({
        quizItems: quizMock.quizItems.nodes,
        referralPage: quizMock.referralPage,
        remoteQuizUrl: quizMock.remoteQuizUrl,
        cumulativeStatus: ClientCumulativeStatus.ACTIVE
      })
    })

    it('renders section', () => {
      expect(screen.getByTestId('QuizSection')).toBeInTheDocument()
      expect(
        screen.getByTestId('QuizSection-defaultCollapsed')
      ).toHaveTextContent('true')
    })
  })
})
