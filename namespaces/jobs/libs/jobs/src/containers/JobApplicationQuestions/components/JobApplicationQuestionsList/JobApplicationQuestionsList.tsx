import React, { useMemo } from 'react'
import { useFieldArray } from '@toptal/picasso-forms'

import JobApplicationQuestionItem from '../JobApplicationQuestionItem'
import { Question } from '../../../../types'

const JobApplicationQuestionsList = () => {
  const { fields: questions } = useFieldArray<Question>('jobPositionQuestions')
  const visibleQuestions = useMemo(
    () =>
      questions.value
        .map((value, index) => ({ ...value, index }))
        .filter(({ destroy }) => !destroy),
    [questions?.value]
  )

  return (
    <>
      {visibleQuestions.map(({ index, ...field }, rowNumber) => (
        <JobApplicationQuestionItem
          key={index}
          index={index}
          name={`jobPositionQuestions[${index}]`}
          rowNumber={rowNumber}
          isSticky={!!field.sticky}
          isTemplateQuestion={!!field.jobPositionQuestionTemplateId}
        />
      ))}
    </>
  )
}

export default JobApplicationQuestionsList
