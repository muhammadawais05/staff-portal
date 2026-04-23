import React from 'react'
import {
  Container,
  Typography,
  Tooltip,
  QuestionMark16,
  ColorType
} from '@toptal/picasso'
import { TalentPreviousInterviewsResult } from '@staff-portal/graphql/staff'

type InterviewContent = {
  color: ColorType
  content: string
  tooltip: (clientName: string) => string
}

export const INTERVIEW_RESULTS_CONTENT: Record<
  TalentPreviousInterviewsResult,
  InterviewContent
> = {
  [TalentPreviousInterviewsResult.WAS_HIRED]: {
    color: 'green' as ColorType,
    content: 'Talent was hired',
    tooltip: clientName => `This talent was hired in the past by ${clientName}.`
  },
  [TalentPreviousInterviewsResult.FAILED_INTERVIEW]: {
    color: 'red' as ColorType,
    content: 'Talent failed interview',
    tooltip: clientName =>
      `This talent previously failed an interview with ${clientName}.`
  }
}

export interface Props {
  previousInterviewsResult: TalentPreviousInterviewsResult
  clientName: string
}

const InterviewedBeforeField = ({
  previousInterviewsResult,
  clientName
}: Props) => {
  const { content, tooltip, color } =
    INTERVIEW_RESULTS_CONTENT[previousInterviewsResult]

  return (
    <Container
      as='span'
      flex
      alignItems='center'
      data-testid='best-match-field'
    >
      <Typography as='span' weight='semibold' color={color}>
        {content}
      </Typography>
      <Tooltip
        content={<Typography>{tooltip(clientName)}</Typography>}
        interactive
      >
        <Container
          as='span'
          left='xsmall'
          flex
          alignItems='center'
          data-testid='best-match-tooltip'
        >
          <QuestionMark16 color='dark-grey' />
        </Container>
      </Tooltip>
    </Container>
  )
}

export default InterviewedBeforeField
