import { renderHook } from '@testing-library/react-hooks'
import { TalentQuizQuestion } from '@staff-portal/graphql/staff'

import { useGetVerticals } from '../../data/get-verticals'
import { createVerticalsMock } from '../../data/get-verticals/mocks'
import { crateTalentQuizQuestionMock } from '../../data/get-talent-quiz-questions-list/mocks'
import useQuizQuestionForm, { quizTypeOptions } from './use-quiz-question-form'

jest.mock('../../data/get-verticals')

const mockUseGetVerticals = useGetVerticals as jest.Mock

const mockVerticals = createVerticalsMock()

const mockVerticalOptions = [
  { text: 'Designer', value: mockVerticals[0].id },
  { text: 'Developer', value: mockVerticals[1].id },
  { text: 'Finance Expert', value: mockVerticals[2].id },
  { text: 'Product Manager', value: mockVerticals[3].id },
  { text: 'Project Manager', value: mockVerticals[4].id },
  { text: 'TopScreen', value: mockVerticals[5].id }
]

const arrangeTest = (question?: TalentQuizQuestion) => {
  mockUseGetVerticals.mockImplementation(() => ({
    data: mockVerticals,
    loading: false
  }))

  return renderHook(() => useQuizQuestionForm(question))
}

describe('useQuizQuestionForm', () => {
  describe('when question is not passed', () => {
    it('returns initial values', () => {
      const { result } = arrangeTest()

      expect(result.current).toEqual({
        verticalOptions: mockVerticalOptions,
        quizTypeOptions,
        loading: false
      })
    })
  })

  describe('when question is passed', () => {
    it('returns initial values', () => {
      const mockTalentQuizQuestion = crateTalentQuizQuestionMock()

      const { body, wrongAnswer, correctAnswer, feedback, kind } =
        mockTalentQuizQuestion

      const initialValues = {
        body,
        wrongAnswer,
        correctAnswer,
        feedback,
        kind,
        verticalId: mockVerticalOptions[1].value
      }

      const { result } = arrangeTest(mockTalentQuizQuestion)

      expect(result.current).toEqual({
        verticalOptions: mockVerticalOptions,
        quizTypeOptions,
        initialValues,
        loading: false
      })
    })
  })

  it('memorizes vertical options values', () => {
    const { result, rerender } = arrangeTest(crateTalentQuizQuestionMock())

    const {
      verticalOptions: prevVerticalOptions,
      initialValues: prevInitialValues
    } = result.current

    rerender()

    expect(result.current.verticalOptions).toBe(prevVerticalOptions)
    expect(result.current.initialValues).toBe(prevInitialValues)
  })

  describe('when vertical is updated', () => {
    it('updates vertical options values', () => {
      const { result, rerender } = arrangeTest(crateTalentQuizQuestionMock())

      const {
        verticalOptions: prevVerticalOptions,
        initialValues: prevInitialValues
      } = result.current

      mockUseGetVerticals.mockImplementation(() => ({
        data: [],
        loading: false
      }))

      rerender()

      expect(result.current.verticalOptions).not.toBe(prevVerticalOptions)
      expect(result.current.initialValues).not.toBe(prevInitialValues)
    })
  })
})
