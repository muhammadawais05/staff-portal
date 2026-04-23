import React from 'react'
import {
  DetailedList as DL,
  DetailedListValueViewOptions,
  LinkWrapper
} from '@staff-portal/ui'
import { Rating, Typography, TypographyOverflow } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'

import * as S from './styles'
import {
  InterviewFeedbackSubmitterFragment,
  SurveyAnswerFragment
} from '../../data/get-talent-interview-feedback'
import { isTalentInterviewFeedbackHidden } from '../../utils'
import TalentInterviewFeedbackSection from '../TalentInterviewFeedbackSection'
import SubmittedField from '../SubmittedField'

interface Props {
  labelColumnWidth: number
  surveyAnswer: SurveyAnswerFragment
  talent: InterviewFeedbackSubmitterFragment
}

const TalentInterviewFeedbackContent = ({
  surveyAnswer,
  talent,
  labelColumnWidth
}: Props) => {
  const submitterLinkTarget = !talent.webResource.url ? '_blank' : undefined
  const submitterLink = talent.webResource.url ?? talent.resumeUrl

  if (isTalentInterviewFeedbackHidden(surveyAnswer)) {
    return null
  }

  return (
    <TalentInterviewFeedbackSection>
      <DL labelColumnWidth={labelColumnWidth} defaultValue={NO_VALUE}>
        <DL.Row>
          <DL.Item label='Submitter'>
            <LinkWrapper
              wrapWhen={Boolean(submitterLink)}
              href={submitterLink}
              target={submitterLinkTarget}
              data-testid='TalentInterviewFeedbackItems-submitter'
            >
              <TypographyOverflow as='span' weight='inherit' color='inherit'>
                {talent.webResource.text}
              </TypographyOverflow>
            </LinkWrapper>
          </DL.Item>

          <DL.Item label='Rating'>
            <Rating.Stars
              css={S.noWrap}
              name='rating'
              value={Number(surveyAnswer.rating)}
              interactive={false}
            />
          </DL.Item>
        </DL.Row>

        {surveyAnswer.answeredAt && (
          <DL.Row>
            <DL.Item label='Submitted'>
              <SubmittedField answeredAt={surveyAnswer.answeredAt} />
            </DL.Item>
          </DL.Row>
        )}

        <DL.Row>
          <DL.Item label='Rating Comment'>
            {surveyAnswer.comment
              ? ({ size, weight, color }: DetailedListValueViewOptions) => (
                  <Typography color={color} size={size} weight={weight}>
                    {surveyAnswer.comment}
                  </Typography>
                )
              : null}
          </DL.Item>
        </DL.Row>
      </DL>
    </TalentInterviewFeedbackSection>
  )
}

export default TalentInterviewFeedbackContent
