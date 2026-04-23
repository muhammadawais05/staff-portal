import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import Quiz from '.'
import { quizMock } from './data/get-quiz.mock'

jest.mock('@staff-portal/data-layer-service')
jest.mock('./components/QuizContent')
jest.mock('./components/QuizSkeleton')

const arrangeTest = (props: ComponentProps<typeof Quiz>) =>
  render(
    <TestWrapper>
      <Quiz {...props} />
    </TestWrapper>
  )

const mockUseGetCode = useGetNode as jest.Mock

describe('Quiz', () => {
  describe('when all necessary data to display a section is returned', () => {
    it('displays content', () => {
      mockUseGetCode.mockImplementation(() => () => ({
        data: quizMock,
        loading: false,
        fetchMore: jest.fn(),
        initialLoading: false
      }))

      arrangeTest({ companyId: 'companyId' })

      expect(screen.getByTestId('QuizContent')).toBeInTheDocument()
      expect(screen.getByTestId('QuizContent-quizItems')).toHaveTextContent(
        JSON.stringify(quizMock.quizItems.nodes)
      )
      expect(screen.getByTestId('QuizContent-referralPage')).toHaveTextContent(
        JSON.stringify(quizMock.referralPage)
      )
      expect(screen.getByTestId('QuizContent-remoteQuizUrl')).toHaveTextContent(
        quizMock.remoteQuizUrl
      )
      expect(
        screen.getByTestId('QuizContent-cumulativeStatus')
      ).toHaveTextContent(quizMock.cumulativeStatus)
      expect(screen.queryByTestId('QuizSkeleton')).not.toBeInTheDocument()
    })
  })

  describe('when all necessary data to display a section is not returned', () => {
    it('displays nothing', () => {
      mockUseGetCode.mockImplementation(() => () => ({
        data: {
          ...quizMock,
          quizItems: { nodes: [] },
          referralPage: undefined,
          remoteQuizUrl: undefined
        },
        loading: false,
        fetchMore: jest.fn(),
        initialLoading: false
      }))

      arrangeTest({ companyId: 'companyId' })

      expect(screen.queryByTestId('QuizContent')).not.toBeInTheDocument()
      expect(screen.queryByTestId('QuizSkeleton')).not.toBeInTheDocument()
    })
  })

  describe('when data is loading', () => {
    it('renders skeleton', () => {
      mockUseGetCode.mockImplementation(() => () => ({
        data: undefined,
        loading: true,
        fetchMore: jest.fn(),
        initialLoading: true
      }))

      arrangeTest({ companyId: 'companyId' })

      expect(screen.getByTestId('QuizSkeleton')).toBeInTheDocument()
      expect(screen.queryByTestId('QuizContent')).not.toBeInTheDocument()
    })
  })
})
