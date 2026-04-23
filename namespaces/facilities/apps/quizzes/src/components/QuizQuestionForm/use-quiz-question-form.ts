import { useMemo } from 'react'
import {
  TalentQuizQuestion,
  TalentQuizQuestionKind
} from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'

import { useGetVerticals } from '../../data/get-verticals'

export interface FormData {
  body: string
  wrongAnswer: string
  correctAnswer: string
  feedback: string
  verticalId: string
  kind: TalentQuizQuestionKind
}

export const quizTypeOptions = [
  TalentQuizQuestionKind.ACTIVATION,
  TalentQuizQuestionKind.ENGAGEMENT
].map(kind => ({
  text: titleize(kind),
  value: kind
}))

const useQuizQuestionForm = (question?: TalentQuizQuestion) => {
  const { data: verticals, loading } = useGetVerticals()

  const verticalOptions = useMemo(
    () => verticals.map(({ name, id }) => ({ text: name, value: id })),
    [verticals]
  )

  const initialValues = useMemo(() => {
    if (verticalOptions.length && question) {
      const { body, wrongAnswer, correctAnswer, feedback, kind, talentType } =
        question

      return {
        body,
        wrongAnswer,
        correctAnswer,
        feedback,
        kind,
        // There is an inconsistency between Vertical and TalentQuizQuestion
        // Vertical's talentType property is in snake case
        // TalentQuizQuestion's talentType property is in pascal case
        verticalId: verticals.find(
          vertical =>
            titleize(vertical.talentType, { separator: '' }) === talentType
        )?.id as string
      } as FormData
    }

    return undefined
  }, [question, verticalOptions, verticals])

  return { verticalOptions, quizTypeOptions, initialValues, loading }
}

export default useQuizQuestionForm
