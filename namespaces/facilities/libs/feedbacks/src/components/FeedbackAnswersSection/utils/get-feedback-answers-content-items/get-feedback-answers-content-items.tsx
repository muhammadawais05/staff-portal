import { isString } from '@toptal/picasso/utils'
import React from 'react'
import { DetailedListItem } from '@staff-portal/ui'

import { FeedbackAnswerFragment } from '../../../../data'
import FeedbackAnswerValue from '../../../FeedbackAnswerValue'

export const getFeedbackAnswersContentItem = ({
  answers
}: {
  answers: FeedbackAnswerFragment[]
}): DetailedListItem[] => {
  const result = answers.map(answer => ({
    label: answer.option?.question.label,
    value: <FeedbackAnswerValue answer={answer} />
  }))

  const leftItems = result.filter((_, index) => index % 2 === 0)
  const rightItems = result.filter((_, index) => index % 2 !== 0)

  return [...leftItems, ...rightItems].filter(item =>
    isString(item.label)
  ) as DetailedListItem[]
}
