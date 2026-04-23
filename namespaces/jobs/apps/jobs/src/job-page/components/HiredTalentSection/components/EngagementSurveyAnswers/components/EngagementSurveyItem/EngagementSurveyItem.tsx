import React from 'react'
import { EngagementSurveyAnswerKind, Link } from '@staff-portal/graphql/staff'
import { DetailedList as DL, LinkWrapper } from '@staff-portal/ui'
import { useUserDateFormatter } from '@staff-portal/current-user'
import { TypographyOverflow } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'

import { EngagementSurveyAnswerFragment } from '../../data/engagement-survey-answer-fragment'
import { useGetSurveyAnswersItems } from '../../utils'
import * as S from './styles'
import { LABEL_COLUMN_EXPANDED_SECTION_WIDTH } from '../../../../../../config'

type Props = {
  userWebResource?: Link
  surveyAnswers: EngagementSurveyAnswerFragment
}

const EngagementSurveyItem = ({ userWebResource, surveyAnswers }: Props) => {
  const items = useGetSurveyAnswersItems(surveyAnswers.answers)
  const formatUserDate = useUserDateFormatter()

  return (
    <>
      <DL
        defaultValue={NO_VALUE}
        labelColumnWidth={LABEL_COLUMN_EXPANDED_SECTION_WIDTH}
      >
        <DL.Row css={S.row}>
          <DL.Item
            label={
              surveyAnswers.kind === EngagementSurveyAnswerKind.CLIENT
                ? 'Client'
                : 'Talent'
            }
          >
            {userWebResource && (
              <LinkWrapper
                wrapWhen={Boolean(userWebResource.url)}
                href={userWebResource.url as string}
              >
                <TypographyOverflow
                  as='span'
                  weight='inherit'
                  size='inherit'
                  color='inherit'
                >
                  {userWebResource.text}
                </TypographyOverflow>
              </LinkWrapper>
            )}
          </DL.Item>

          <DL.Item
            label='Feedback Date'
            value={formatUserDate(surveyAnswers.createdAt)}
          />
        </DL.Row>
      </DL>
      <DL
        defaultValue={NO_VALUE}
        labelColumnWidth={LABEL_COLUMN_EXPANDED_SECTION_WIDTH}
      >
        {items.map(
          ({ label, value, hasHalfWidthItems, isFullWidthLabel }, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <DL.Row key={index}>
              <DL.Item
                titleCaseLabels={false}
                label={label}
                value={value}
                hasHalfWidthItems={hasHalfWidthItems}
                isFullWidthLabel={isFullWidthLabel}
              />
            </DL.Row>
          )
        )}
      </DL>
    </>
  )
}

export default EngagementSurveyItem
