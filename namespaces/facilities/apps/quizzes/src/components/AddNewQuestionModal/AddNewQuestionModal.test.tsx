import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import QuizQuestionForm from '../QuizQuestionForm'
import useAddNewQuestion from './use-add-new-question'
import AddNewQuestionModal from './AddNewQuestionModal'

jest.mock('../QuizQuestionForm')
jest.mock('./use-add-new-question')

const mockHideModal = jest.fn()
const mockHandleSubmit = jest.fn()

const MockQuizQuestionForm = QuizQuestionForm as jest.Mock
const mockUseAddNewQuestion = useAddNewQuestion as jest.Mock

const arrangeTest = async () => {
  MockQuizQuestionForm.mockImplementation(() => (
    <span>Mocked Quiz Question Form</span>
  ))
  mockUseAddNewQuestion.mockImplementation(() => ({
    handleSubmit: mockHandleSubmit
  }))

  return render(
    <TestWrapper>
      <AddNewQuestionModal hideModal={mockHideModal} />
    </TestWrapper>
  )
}

describe('AddNewQuestionModal', () => {
  it('renders content', () => {
    arrangeTest()

    expect(screen.getByText('Add New Question')).toBeInTheDocument()
    expect(screen.getByText('Mocked Quiz Question Form')).toBeInTheDocument()
  })

  it('passes properties', () => {
    const context = {}

    arrangeTest()

    expect(mockUseAddNewQuestion).toHaveBeenCalledWith({
      onSuccess: mockHideModal
    })
    expect(MockQuizQuestionForm).toHaveBeenCalledWith(
      {
        submitButtonText: 'Add Question',
        onCancel: mockHideModal,
        onSubmit: mockHandleSubmit
      },
      context
    )
  })
})
