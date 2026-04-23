import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { useLazyQuery, useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import EngagementSurveyAnswers from './EngagementSurveyAnswers'
import { createLatestEngagementSurveyAnswersMock } from './data/get-latest-engagement-survey-answers/mocks'
import {
  createEngagementSurveyAnswerMock,
  createEngagementSurveyAnswersMock,
  createOtherEngagementSurveyAnswersMock
} from './data/get-other-engagement-survey-answers/mocks'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/ui/src/components/ContainerLoader')
jest.mock('./components/EngagementSurveyItem', () => ({
  __esModule: true,
  default: ({ 'data-testid': dataTestId }: { 'data-testid'?: string }) => (
    <div data-testid={dataTestId || 'EngagementSurveyItem'} />
  )
}))

const mockReturnValues = ({
  initialLoading = false,
  latestEngagementSurveyAnswersMock,
  otherEngagementSurveyAnswersMock
}: Partial<{
  initialLoading: boolean
  latestEngagementSurveyAnswersMock: Parameters<
    typeof createLatestEngagementSurveyAnswersMock
  >[0]
  otherEngagementSurveyAnswersMock: Parameters<
    typeof createOtherEngagementSurveyAnswersMock
  >[0]
}> = {}) => {
  const mockUseGetNode = useGetNode as jest.Mock
  const mockUseLazyQuery = useLazyQuery as jest.Mock

  const { node } = createLatestEngagementSurveyAnswersMock(
    latestEngagementSurveyAnswersMock
  )
  const data = createOtherEngagementSurveyAnswersMock(
    otherEngagementSurveyAnswersMock
  )

  mockUseGetNode.mockImplementation(() => () => ({
    data: node,
    initialLoading
  }))

  mockUseLazyQuery.mockReturnValue([
    jest.fn(),
    {
      loading: false,
      data
    }
  ])
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <EngagementSurveyAnswers engagementId='123' />
    </TestWrapper>
  )

describe('EngagementSurveyAnswers', () => {
  describe('when there are no engagement survey answers', () => {
    it('does not display content', () => {
      mockReturnValues()
      arrangeTest()

      expect(
        screen.queryByText('Feedback During Engagement')
      ).not.toBeInTheDocument()
      expect(screen.queryByTestId('ContainerLoader')).not.toBeInTheDocument()
    })
  })

  describe('when there "initialLoading" state is equals "true"', () => {
    it('displays skeleton loader', () => {
      mockReturnValues({
        initialLoading: true,
        latestEngagementSurveyAnswersMock: {
          talentSurveyTotalCount: 1,
          recentTalentSurveyAnswers: [
            createEngagementSurveyAnswersMock({
              answers: [
                createEngagementSurveyAnswerMock({
                  type: 'radio',
                  question: 'question',
                  decoratedAnswer: {
                    value: 'answer'
                  }
                })
              ]
            })
          ]
        }
      })
      arrangeTest()

      expect(screen.getByText('Feedback During Engagement')).toBeInTheDocument()
      expect(screen.queryByTestId('ContainerLoader-showSkeleton')).toBeTruthy()
    })
  })

  describe('when there is one talent & one client', () => {
    it('displays talent & client', () => {
      mockReturnValues({
        latestEngagementSurveyAnswersMock: {
          talentSurveyTotalCount: 1,
          clientSurveyTotalCount: 1,
          recentTalentSurveyAnswers: [
            createEngagementSurveyAnswersMock({
              answers: [
                createEngagementSurveyAnswerMock({
                  type: 'radio',
                  question: 'question',
                  decoratedAnswer: {
                    value: 'answer'
                  }
                })
              ]
            })
          ],
          recentClientSurveyAnswers: [
            createEngagementSurveyAnswersMock({
              answers: [
                createEngagementSurveyAnswerMock({
                  type: 'radio',
                  question: 'question',
                  decoratedAnswer: {
                    value: 'answer'
                  }
                })
              ]
            })
          ]
        }
      })
      arrangeTest()

      expect(
        screen.getByTestId('EngagementSurveyItem-talent')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('EngagementSurveyItem-client')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('EngagementSurveyAnswers-showMore')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('EngagementSurveyItem-other')
      ).not.toBeInTheDocument()
    })
  })

  describe('when there are more than one talent', () => {
    it('displays "Show More" button', () => {
      mockReturnValues({
        latestEngagementSurveyAnswersMock: {
          talentSurveyTotalCount: 2,
          recentTalentSurveyAnswers: [
            createEngagementSurveyAnswersMock({
              answers: [
                createEngagementSurveyAnswerMock({
                  type: 'radio',
                  question: 'question',
                  decoratedAnswer: {
                    value: 'answer'
                  }
                })
              ]
            })
          ]
        }
      })
      arrangeTest()

      expect(
        screen.getByTestId('EngagementSurveyItem-talent')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('EngagementSurveyItem-client')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('EngagementSurveyItem-other')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('EngagementSurveyAnswers-showMore')
      ).toBeInTheDocument()
    })
  })

  describe('when there is other engagement survey data', () => {
    it('displays other items', () => {
      mockReturnValues({
        latestEngagementSurveyAnswersMock: {
          talentSurveyTotalCount: 2,
          recentTalentSurveyAnswers: [
            createEngagementSurveyAnswersMock({
              answers: [
                createEngagementSurveyAnswerMock({
                  type: 'radio',
                  question: 'question',
                  decoratedAnswer: {
                    value: 'answer'
                  }
                })
              ]
            })
          ]
        },
        otherEngagementSurveyAnswersMock: {
          nodes: [
            createEngagementSurveyAnswersMock({
              id: 'talent-2',
              answers: [
                createEngagementSurveyAnswerMock({
                  type: 'radio',
                  question: 'question2',
                  decoratedAnswer: {
                    value: 'answer2'
                  }
                })
              ]
            })
          ]
        }
      })
      arrangeTest()

      expect(
        screen.getByTestId('EngagementSurveyItem-talent')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('EngagementSurveyItem-client')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('EngagementSurveyItem-other')
      ).toBeInTheDocument()
    })
  })
})
