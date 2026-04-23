import { Container, Typography } from '@toptal/picasso'
import React, { useMemo } from 'react'
import { isNotNullish } from '@staff-portal/utils'
import { NO_VALUE } from '@staff-portal/config'

import { EngagementSurveyAnswerFragment } from '../data/engagement-survey-answer-fragment'
import { SurveryAnswerType } from '../types'
import EngagementSurveyItemAnswer from '../components/EngagementSurveyItemAnswer'

const useGetSurveyAnswersItems = (
  answers: EngagementSurveyAnswerFragment['answers']
) =>
  useMemo(
    () =>
      answers
        .map(item => {
          const { question, decoratedAnswer } = item
          const { alerted, value } = decoratedAnswer || {}
          const type = item.type as SurveryAnswerType

          if (!type || !question) {
            return null
          }

          const formattedValue = value ?? NO_VALUE

          if (type === 'textarea') {
            return {
              isFullWidthLabel: true,
              label: (
                <Container top='small'>
                  <Typography weight='semibold'>{question}</Typography>
                </Container>
              ),
              value: (
                <Container bottom='small'>
                  <EngagementSurveyItemAnswer
                    alerted={alerted}
                    weight='regular'
                  >
                    {formattedValue}
                  </EngagementSurveyItemAnswer>
                </Container>
              )
            }
          }

          return {
            hasHalfWidthItems: true,
            label: question,
            value: (
              <EngagementSurveyItemAnswer alerted={alerted} weight='semibold'>
                {formattedValue}
              </EngagementSurveyItemAnswer>
            )
          }
        })
        .filter(isNotNullish),
    [answers]
  )

export default useGetSurveyAnswersItems
