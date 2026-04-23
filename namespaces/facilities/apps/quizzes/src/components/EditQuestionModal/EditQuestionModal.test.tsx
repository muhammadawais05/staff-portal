import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import QuizQuestionForm from '../QuizQuestionForm'
import { crateTalentQuizQuestionMock } from '../../data/get-talent-quiz-questions-list/mocks'
import useEditQuestion from './use-edit-question'
import EditQuestionModal from './EditQuestionModal'

jest.mock('../QuizQuestionForm')
jest.mock('./use-edit-question')

const mockHideModal = jest.fn()
const mockHandleSubmit = jest.fn()

const MockQuizQuestionForm = QuizQuestionForm as jest.Mock
const mockUseEditQuestion = useEditQuestion as jest.Mock

const mockQuestion = crateTalentQuizQuestionMock()

const arrangeTest = async () => {
  MockQuizQuestionForm.mockImplementation(() => (
    <span>Mocked Quiz Question Form</span>
  ))
  mockUseEditQuestion.mockImplementation(() => ({
    handleSubmit: mockHandleSubmit
  }))

  return render(
    <TestWrapper>
      <EditQuestionModal hideModal={mockHideModal} question={mockQuestion} />
    </TestWrapper>
  )
}

describe('EditQuestionModal', () => {
  it('renders content', () => {
    arrangeTest()

    expect(screen.getByText('Edit Question')).toBeInTheDocument()
    expect(screen.getByText('Mocked Quiz Question Form')).toBeInTheDocument()
  })

  it('passes properties', () => {
    const context = {}

    arrangeTest()

    expect(mockUseEditQuestion).toHaveBeenCalledWith({
      onSuccess: mockHideModal,
      questionId: mockQuestion.id
    })
    expect(MockQuizQuestionForm).toHaveBeenCalledWith(
      {
        submitButtonText: 'Update Question',
        question: mockQuestion,
        onCancel: mockHideModal,
        onSubmit: mockHandleSubmit
      },
      context
    )
  })
})
