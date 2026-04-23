import { renderHook, act } from '@testing-library/react-hooks'
import { useNotifications } from '@toptal/picasso/utils'
import {
  TalentQuizQuestionKind,
  UpdateTalentQuizQuestionInput
} from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useUpdateTalentQuizQuestion } from './data/update-talent-quiz-question'
import useEditQuestion from './use-edit-question'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')
jest.mock(
  './data/update-talent-quiz-question/update-talent-quiz-question.staff.gql'
)

const mockUseNotifications = useNotifications as jest.Mock
const mockUseHandleMutationResult = useHandleMutationResult as jest.Mock
const mockUseUpdateTalentQuizQuestion = useUpdateTalentQuizQuestion as jest.Mock

const mockOnSuccess = jest.fn()
const mockHandleMutationResult = jest.fn()
const mockCreateTalentQuizQuestion = jest.fn()

const talentQuizQuestionId = '123'

const mockInput: UpdateTalentQuizQuestionInput = {
  body: 'Mocked body',
  correctAnswer: 'Mocked correct answer',
  feedback: 'Mocked feedback',
  kind: TalentQuizQuestionKind.ACTIVATION,
  verticalId: '1',
  wrongAnswer: 'Mocked wrong answer',
  talentQuizQuestionId
}

const mockMutationResult = {
  data: { createTalentQuizQuestion: 'Mocked Mutation Result' }
}

const arrangeTest = () => {
  mockUseNotifications.mockImplementation(() => ({
    showError: jest.fn()
  }))
  mockCreateTalentQuizQuestion.mockImplementation(
    () =>
      new Promise(resolve => {
        resolve(mockMutationResult)
      })
  )
  mockUseUpdateTalentQuizQuestion.mockImplementation(() => [
    mockCreateTalentQuizQuestion
  ])
  mockUseHandleMutationResult.mockImplementation(() => ({
    handleMutationResult: mockHandleMutationResult
  }))

  return renderHook(() =>
    useEditQuestion({
      onSuccess: mockOnSuccess,
      questionId: talentQuizQuestionId
    })
  )
}

describe('useAddNewQuestion', () => {
  it('returns initial values', () => {
    const { result } = arrangeTest()

    expect(mockUseUpdateTalentQuizQuestion).toHaveBeenCalledWith({
      onError: expect.any(Function)
    })
    expect(result.current).toEqual({
      handleSubmit: expect.any(Function)
    })
  })

  it('handles handleSubmit', () => {
    const { result, waitFor } = arrangeTest()

    act(() => {
      result.current.handleSubmit(mockInput)
    })

    expect(mockCreateTalentQuizQuestion).toHaveBeenCalledWith({
      variables: {
        input: mockInput
      }
    })

    waitFor(() => {
      expect(mockHandleMutationResult).toHaveBeenCalledWith({
        mutationResult: mockMutationResult.data.createTalentQuizQuestion,
        successNotificationMessage: 'The question was successfully added.',
        onSuccessAction: mockOnSuccess
      })
    })
  })
})
