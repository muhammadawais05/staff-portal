import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { TalentQuizQuestion } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { crateTalentQuizQuestionMock } from '../../data/get-talent-quiz-questions-list/mocks'
import useQuizQuestionForm, { quizTypeOptions } from './use-quiz-question-form'
import QuizQuestionForm from './QuizQuestionForm'

jest.mock('./use-quiz-question-form', () => ({
  __esModule: true,
  ...jest.requireActual('./use-quiz-question-form'),
  default: jest.fn()
}))

const mockUseQuizQuestionForm = useQuizQuestionForm as jest.Mock

const mockVerticalOptions = [
  { text: 'Designer', value: 'Designer' },
  { text: 'Developer', value: 'Developer' },
  { text: 'Finance Expert', value: 'Finance Expert' },
  { text: 'Product Manager', value: 'Product Manager' },
  { text: 'Project Manager', value: 'Project Manager' }
]

const mockFormInput = {
  body: 'Mocked text',
  wrongAnswer: 'Mocked text',
  correctAnswer: 'Mocked text',
  feedback: 'Mocked text',
  verticalId: mockVerticalOptions[0].value,
  kind: quizTypeOptions[0].value
}

const mockHandleCancel = jest.fn()
const mockHandleSubmit = jest.fn()

const arrangeTest = ({
  question,
  loading
}: { question?: TalentQuizQuestion; loading?: boolean } = {}) => {
  mockUseQuizQuestionForm.mockImplementation(questionProp => ({
    loading,
    verticalOptions: mockVerticalOptions,
    quizTypeOptions,
    initialValues: questionProp ? mockFormInput : undefined
  }))

  return render(
    <TestWrapper>
      <QuizQuestionForm
        submitButtonText='Mocked Submit Button Text'
        question={question}
        onCancel={mockHandleCancel}
        onSubmit={mockHandleSubmit}
      />
    </TestWrapper>
  )
}

describe('QuizQuestionForm', () => {
  describe('when question is passed', () => {
    const mockQuestion = crateTalentQuizQuestionMock()

    beforeEach(() => {
      arrangeTest({ question: mockQuestion })
    })

    it('initiates form hook with correct props', () => {
      expect(mockUseQuizQuestionForm).toHaveBeenCalledWith(mockQuestion)
    })

    it('renders form with initial values', () => {
      const kindText = quizTypeOptions.find(
        option => option.value === mockFormInput.kind
      )?.text

      expect(screen.getByLabelText(/Question/i)).toHaveValue(mockFormInput.body)
      expect(screen.getByLabelText(/Wrong Answer/i)).toHaveValue(
        mockFormInput.wrongAnswer
      )
      expect(screen.getByLabelText(/Correct answer/i)).toHaveValue(
        mockFormInput.correctAnswer
      )
      expect(screen.getByLabelText(/Feedback/i)).toHaveValue(
        mockFormInput.feedback
      )
      expect(screen.getByLabelText(/Vertical/i)).toHaveValue(
        mockFormInput.verticalId
      )

      // for non-native selects value is used under the hood for finding options
      // but the value in actual input is taken from text option
      // text needs to be extracted from the option for correct comparison
      expect(screen.getByLabelText(/Type of Quiz/i)).toHaveValue(kindText)
    })
  })

  it('renders preloader', () => {
    arrangeTest({ loading: true })

    expect(screen.getByTestId('QuizQuestionFormLoader')).toBeInTheDocument()
  })

  it('handles form submit', async () => {
    arrangeTest()

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Question/i), {
        target: { value: mockFormInput.body }
      })
      fireEvent.change(screen.getByLabelText(/Wrong Answer/i), {
        target: { value: mockFormInput.wrongAnswer }
      })
      fireEvent.change(screen.getByLabelText(/Correct answer/i), {
        target: { value: mockFormInput.correctAnswer }
      })
      fireEvent.change(screen.getByLabelText(/Feedback/i), {
        target: { value: mockFormInput.feedback }
      })
      fireEvent.change(screen.getByLabelText(/Vertical/i), {
        target: { value: mockFormInput.verticalId }
      })
      fireEvent.change(screen.getByLabelText(/Type of Quiz/i), {
        target: { value: mockFormInput.kind }
      })

      await fireEvent.click(
        screen.getByRole('button', { name: 'Mocked Submit Button Text' })
      )
    })

    expect(mockHandleSubmit).toHaveBeenCalledWith(
      mockFormInput,
      expect.anything(),
      expect.anything()
    )
  })

  it('handles cancel click', () => {
    arrangeTest()

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(mockHandleCancel).toHaveBeenCalled()
  })
})
