import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { NO_VALUE } from '@staff-portal/config'

import type { Props } from './ClientQuizContent'
import ClientQuizContent from './ClientQuizContent'

const quizMock = {
  remoteQuizUrl:
    'https://www.readinesschecker.com/remote/questionnaire/fkjapqrgRkCKmHIM/report?extended_for_staff=1',
  quizItems: {
    nodes: [
      {
        questionLabel: 'How many product managers do you need?',
        readableValue: ['One product manager']
      }
    ]
  },
  referralPage: {
    text: 'Qing (Joanna) Xia',
    url: 'https://www.toptal.com/product-managers/resume/qing-xia'
  }
}

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <ClientQuizContent {...props} />
    </TestWrapper>
  )

describe('ClientQuizContent', () => {
  describe('when all data is passed', () => {
    beforeEach(() => {
      arrangeTest({
        quizItems: quizMock.quizItems.nodes,
        referralPage: quizMock.referralPage,
        remoteQuizUrl: quizMock.remoteQuizUrl
      })
    })

    it('renders quiz items labels', () => {
      const quizLabels = screen.getAllByTestId('quiz-item-label')

      ;[
        'How many product managers do you need?',
        'Landing page',
        'Remote Quiz URL'
      ].forEach((label, labelIndex) => {
        expect(quizLabels[labelIndex]).toHaveTextContent(label)
      })
    })

    it('renders quiz items answers', () => {
      const quizAnswers = screen.getAllByTestId('quiz-content-answer')

      ;['One product manager'].forEach((answer, answerIndex) => {
        expect(quizAnswers[answerIndex]).toHaveTextContent(answer)
      })

      const landingPage = screen.getByTestId('quiz-content-landing-page-link')

      expect(landingPage).toHaveTextContent('Qing (Joanna) Xia')
      expect(landingPage).toHaveAttribute(
        'href',
        'https://www.toptal.com/product-managers/resume/qing-xia'
      )

      const remoteQuizUrl = screen.getByTestId('quiz-content-remote-quiz-url')

      expect(remoteQuizUrl).toHaveTextContent(
        'https://www.readinesschecker.com/remote/questionnaire/fkjapqrgRkCKmHIM/report?extended_for_staff=1'
      )
      expect(remoteQuizUrl).toHaveAttribute(
        'href',
        'https://www.readinesschecker.com/remote/questionnaire/fkjapqrgRkCKmHIM/report?extended_for_staff=1'
      )
    })
  })

  describe('when quiz item has no answer', () => {
    it('does not display an empty answer', () => {
      arrangeTest({
        quizItems: [
          {
            questionLabel: 'How many product managers do you need?',
            readableValue: []
          }
        ],
        referralPage: quizMock.referralPage,
        remoteQuizUrl: quizMock.remoteQuizUrl
      })

      expect(
        screen.getByTestId('quiz-content-answer-no-value')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('quiz-content-answer')
      ).not.toBeInTheDocument()
    })
  })

  describe('when there are no quiz items', () => {
    it('does not display them', () => {
      arrangeTest({
        quizItems: [],
        referralPage: quizMock.referralPage,
        remoteQuizUrl: quizMock.remoteQuizUrl
      })

      expect(screen.getAllByTestId('quiz-item')).toHaveLength(2)
    })
  })

  describe('when there is no referralPage', () => {
    it('displays a dash', () => {
      arrangeTest({
        quizItems: [],
        remoteQuizUrl: quizMock.remoteQuizUrl
      })

      expect(
        screen.getByTestId('quiz-content-landing-page-answer')
      ).toHaveTextContent(NO_VALUE)
    })
  })

  describe('when there is no remoteQuizUrl', () => {
    it('displays a dash', () => {
      arrangeTest({
        quizItems: [],
        referralPage: quizMock.referralPage
      })

      expect(
        screen.queryByTestId('quiz-content-remote-quiz-url')
      ).not.toBeInTheDocument()
    })
  })
})
