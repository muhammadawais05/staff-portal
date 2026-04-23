import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import ApplicationQuestions from './ApplicationQuestions'
import { useGetVerticalApplicationQuestions } from './data/get-vertical-application-questions/get-vertical-application-questions.staff.gql'

jest.mock(
  './data/get-vertical-application-questions/get-vertical-application-questions.staff.gql'
)

jest.mock('../ApplicationQuestionItem', () => ({
  __esModule: true,
  default: () => <div data-testid='application-question-item' />
}))

const mockUseGetVerticalApplicationQuestions =
  useGetVerticalApplicationQuestions as jest.Mock

const arrangeTest = () => {
  mockUseGetVerticalApplicationQuestions.mockReturnValue({
    applicationQuestions: [
      {
        id: 'test-id-1',
        question: {
          id: 'test-question-id-1',
          kind: 'STRING',
          label: 'Current company',
          options: {
            nodes: [],
            totalCount: 0
          },
          requiredForStaff: false
        }
      },
      {
        id: 'test-id-2',
        question: {
          id: 'test-question-id-2',
          kind: 'STRING',
          label: 'Current job title',
          options: {
            nodes: [],
            totalCount: 0
          },
          requiredForStaff: false
        }
      }
    ],
    loading: false
  })

  return render(
    <TestWrapper>
      <ApplicationQuestions verticalId='123' />
    </TestWrapper>
  )
}

describe('ApplicationQuestions', () => {
  it('renders questions', () => {
    arrangeTest()

    expect(screen.getAllByTestId('application-question-item')).toHaveLength(2)
  })
})
