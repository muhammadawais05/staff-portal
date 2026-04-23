import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { useUserDateTimeFormatter } from '@staff-portal/current-user'
import { NoteCard } from '@staff-portal/ui'

import ViewTalentScheduleButton from '../ViewTalentScheduleButton'
import * as S from './styles'

export interface JobPositionAnswer {
  id: string
  value: string
  jobPositionQuestionFullRender: string
  updatedAt: string
  jobPositionQuestion: {
    id: string
    updatedAt: string
    template?: {
      id: string
      slug?: string | null
    } | null
  }
  talent: {
    id: string
    mainBookingPage?: {
      id: string
      slug: string
    } | null
  }
}

export interface Props {
  jobPositionAnswers?: JobPositionAnswer[]
}

const JobPositionAnswers = ({ jobPositionAnswers }: Props) => {
  const userDateTimeFormatter = useUserDateTimeFormatter()

  if (!jobPositionAnswers?.length) {
    return null
  }

  return (
    <NoteCard data-testid='job-position-answers-note-card'>
      {jobPositionAnswers.map(
        ({
          jobPositionQuestionFullRender,
          jobPositionQuestion: { updatedAt, template },
          value,
          talent,
          id
        }) => (
          <Container
            key={id}
            css={S.singleQuestionContainer}
            data-testid='matcher-question'
          >
            <Typography size='xsmall' weight='semibold'>
              {jobPositionQuestionFullRender}
            </Typography>
            <Typography size='xsmall'>
              Added on {userDateTimeFormatter(updatedAt)}
            </Typography>

            <Container top='small'>
              <Typography color='black' size='medium' css={S.questionAnswer}>
                {value}
              </Typography>
            </Container>

            <ViewTalentScheduleButton
              bookingPageSlug={talent.mainBookingPage?.slug}
              templateSlug={template?.slug}
            />
          </Container>
        )
      )}

      <Container top='small'>
        <Typography size='xsmall'>
          Answers submitted at:{' '}
          {userDateTimeFormatter(jobPositionAnswers[0].updatedAt)}
        </Typography>
      </Container>
    </NoteCard>
  )
}

export default JobPositionAnswers
