import { FormState, useForm } from '@toptal/picasso-forms'
import { renderHook } from '@testing-library/react-hooks'
import {
  NoteQuestionCommentType,
  NoteQuestionKind
} from '@staff-portal/graphql/staff'

import { useChangeCalculatedGrade } from './use-change-calculated-grade'
import { NoteFormType } from '../../types'
import { getIsGradingAnswerActive, getCalculatedGradeAnswer } from '../../utils'

const useFormMock = useForm as jest.Mock

const getIsGradingAnswerActiveMock = getIsGradingAnswerActive as jest.Mock
const getCalculatedGradeAnswerMock = getCalculatedGradeAnswer as jest.Mock

jest.mock('@toptal/picasso-forms')
jest.mock('../../utils')

const arrangeTest = (activeField?: string, changeFn = jest.fn()) => {
  const formState = {
    active: activeField,
    values: {
      answers: [
        {
          id: 'VjEtTm90ZUFuc3dlci0',
          comment: null,
          questionId: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzMx',
          kind: NoteQuestionKind.RADIO_BUTTONS,
          value: ['3'],
          optionId: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxOTIz'
        },
        {
          id: 'VjEtTm90ZUFuc3dlci0',
          comment: null,
          questionId: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzMy',
          kind: NoteQuestionKind.RADIO_BUTTONS,
          value: ['4'],
          optionId: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxOTI5'
        },
        {
          id: 'VjEtTm90ZUFuc3dlci0',
          comment: null,
          questionId: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzM3',
          kind: NoteQuestionKind.STRING,
          value: null
        }
      ]
    }
  }

  const gradingWeightAnswers = {
    nodes: {
      VjEtTm90ZVF1ZXN0aW9uLTMxMzMx: {
        activeOptions: {
          nodes: [
            {
              id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxOTIx',
              label: 'Talent showed inadequate performance',
              value: '1'
            }
          ]
        },
        additionalCommentsHint: 'Add comment',
        commentType: NoteQuestionCommentType.SHORT,
        gradingWeight: 10,
        group: {
          label: 'Vertical Expertise'
        },
        hint: '',
        id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzMx',
        kind: NoteQuestionKind.RADIO_BUTTONS,
        label: 'Task Execution',
        required: true
      },
      VjEtTm90ZVF1ZXN0aW9uLTMxMzMy: {
        activeOptions: {
          nodes: [
            {
              id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxOTI2',
              label: 'Talent does not have any relevant experience',
              value: '1'
            }
          ]
        },
        additionalCommentsHint: 'Add comment',
        commentType: NoteQuestionCommentType.SHORT,
        gradingWeight: 4,
        group: {
          label: 'Vertical Expertise'
        },
        hint: '',
        id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzMy',
        kind: NoteQuestionKind.RADIO_BUTTONS,
        label: 'Domain / technical experience',
        required: true
      }
    },
    calculatedGradeNode: {
      activeOptions: {
        nodes: []
      },
      additionalCommentsHint: null,
      commentType: null,
      gradingWeight: null,
      group: {
        label: 'Grading'
      },
      hint: '',
      id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzM3',
      kind: NoteQuestionKind.STRING,
      label: 'Calculated Grade',
      required: true
    },
    gradingWeightTotal: 14
  }

  return renderHook(() =>
    useChangeCalculatedGrade({
      formState: formState as unknown as FormState<
        NoteFormType,
        Partial<NoteFormType>
      >,
      gradingWeightAnswers,
      change: changeFn
    })
  )
}

describe('useChangeCalculatedGrade', () => {
  describe('when grading answer is not active', () => {
    it('does nothing', () => {
      const mockFn = getIsGradingAnswerActiveMock.mockImplementationOnce(
        jest.requireActual('../../utils').getIsGradingAnswerActive
      )

      arrangeTest()

      expect(mockFn).toHaveReturnedWith(false)
    })
  })

  describe('when grading answer is active', () => {
    it('calls getIsGradingAnswerActive function', () => {
      const mockFn = getIsGradingAnswerActiveMock.mockImplementationOnce(
        jest.fn()
      )

      arrangeTest('answers[0].optionId')

      expect(mockFn).toHaveBeenCalled()
    })

    it('calls getCalculatedGradeAnswer function', () => {
      getIsGradingAnswerActiveMock.mockImplementationOnce(
        jest.requireActual('../../utils').getIsGradingAnswerActive
      )

      const mockFn = getCalculatedGradeAnswerMock.mockImplementationOnce(
        jest.fn()
      )

      arrangeTest('answers[0].optionId')

      expect(mockFn).toHaveBeenCalled()
    })

    describe('when calculatedGrade is invalid', () => {
      it('does nothing', () => {
        const mockFn = jest.fn()

        useFormMock.mockImplementationOnce(() => ({
          useForm: () => ({
            change: mockFn
          })
        }))

        getIsGradingAnswerActiveMock.mockImplementationOnce(() => true)
        getCalculatedGradeAnswerMock.mockImplementationOnce(() => null)

        arrangeTest()

        expect(mockFn).not.toHaveBeenCalled()
      })
    })

    describe('when calculatedGrade is valid', () => {
      it('calls useForm change function', () => {
        getIsGradingAnswerActiveMock.mockImplementationOnce(
          jest.requireActual('../../utils').getIsGradingAnswerActive
        )

        getCalculatedGradeAnswerMock.mockImplementationOnce(
          jest.requireActual('../../utils').getCalculatedGradeAnswer
        )

        const mockFn = jest.fn()

        useFormMock.mockImplementationOnce(() => ({
          useForm: () => ({
            change: mockFn
          })
        }))

        arrangeTest('answers[0].optionId', mockFn)

        expect(mockFn).toHaveBeenCalled()
      })
    })
  })
})
