import { FormState } from '@toptal/picasso-forms'
import { useEffect } from 'react'

import { NoteFormType } from '../../types'
import {
  getIsGradingAnswerActive,
  getCalculatedGradeAnswer,
  GradingWeightAnswers
} from '../../utils'

type ChangeCalculatedGrade = {
  formState: FormState<NoteFormType, Partial<NoteFormType>>
  gradingWeightAnswers?: GradingWeightAnswers
  change: (name: string, value?: unknown) => void
}

export const useChangeCalculatedGrade = ({
  formState,
  gradingWeightAnswers,
  change
}: ChangeCalculatedGrade) => {
  useEffect(() => {
    const isGradingAnswerActive = getIsGradingAnswerActive({
      activeField: formState.active?.toString(),
      formAnswers: formState.values.answers,
      gradingWeightAnswers: gradingWeightAnswers
    })

    if (isGradingAnswerActive) {
      const calculatedGrade = getCalculatedGradeAnswer({
        formAnswers: formState.values.answers,
        gradingWeightAnswers: gradingWeightAnswers
      })

      if (calculatedGrade) {
        change(calculatedGrade.name, calculatedGrade.value)
      }
    }
  }, [formState, gradingWeightAnswers, change])
}
