import React from 'react'
import { Container, Typography, ColorType } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'
import { StaffUnit } from '@staff-portal/graphql/staff'
import { SimpleHtmlFormatter } from '@staff-portal/string'
import { useUserTimeZone } from '@staff-portal/current-user'
import { NoteCard } from '@staff-portal/ui'

import * as S from './styles'
import { Rating } from '../../../../types'
import { TalentSoftSkillsNoteFragment } from '../../../../data/get-talent-soft-skills/get-talent-soft-skills.staff.gql.types'
import RemoveTalentSoftSkillRatingButton from '../RemoveTalentSoftSkillRatingButton/RemoveTalentSoftSkillRatingButton'
import { getRatingNumberValue } from '../../../../services'

enum NoteTypeStep {
  ENGLISH_CALL = 'english_call',
  TECHNICAL_1_CALL = 'technical_one_call',
  TECHNICAL_2_CALL = 'technical_two_call'
}

interface Props {
  rating: Rating
  talentId: string
  talentName: string
  softSkillName: string
}

const getPerformerHint = (
  performerUnits: StaffUnit[],
  note?: TalentSoftSkillsNoteFragment | null
) => {
  if (note == null) {
    return performerUnits.map(({ name }) => name).join(', ')
  }

  switch (note?.type) {
    case NoteTypeStep.ENGLISH_CALL: {
      return 'English Call'
    }
    case NoteTypeStep.TECHNICAL_1_CALL: {
      return 'Technical 1 Screening'
    }
    case NoteTypeStep.TECHNICAL_2_CALL: {
      return 'Technical 2 Screening'
    }
    default: {
      return ''
    }
  }
}

export const getRatingColor = (rating: number): ColorType => {
  if (rating < 3) {
    return 'red'
  } else if (rating < 4) {
    return 'yellow'
  }

  return 'green'
}

type RatingNodeOptions = { semibold: boolean; as: 'span' | 'p' }

export const getRatingNode = (
  rating?: number | null,
  options: RatingNodeOptions = { semibold: true, as: 'p' }
) => {
  if (!rating) {
    return NO_VALUE
  }

  const color = getRatingColor(rating)

  return (
    <Typography
      as={options.as}
      weight={options.semibold ? 'semibold' : undefined}
      color={color}
    >
      {Number(rating.toFixed(2))}
    </Typography>
  )
}

const TalentSoftSkillRating = ({
  rating: {
    id,
    performer: { webResource },
    performerUnits,
    note,
    createdAt,
    value,
    comment,
    operations: { removeSoftSkillRating: removeSoftSkillRatingOperation }
  },
  talentId,
  talentName,
  softSkillName
}: Props) => {
  const timeZone = useUserTimeZone()
  const performerHint = getPerformerHint(performerUnits.nodes, note)

  return (
    <NoteCard data-testid='soft-skill-rating' css={S.noteCard}>
      <NoteCard.Header>
        <NoteCard.Title title={performerHint} />
        <NoteCard.Actions>
          <RemoveTalentSoftSkillRatingButton
            ratingId={id}
            talentId={talentId}
            talentName={talentName}
            softSkillName={softSkillName}
            operation={removeSoftSkillRatingOperation}
          />
        </NoteCard.Actions>
      </NoteCard.Header>
      <NoteCard.Info
        author={{ webResource }}
        timeZone={timeZone}
        createdAt={createdAt}
        updatedAt={createdAt}
      />
      <NoteCard.Body>
        <Container flex>
          <Container right='xsmall'>
            <Typography color='black'>Rating: </Typography>
            {comment && <Typography color='black'>Comment: </Typography>}
          </Container>
          <Container>
            {getRatingNode(getRatingNumberValue(value))}
            {comment && (
              <Typography color='black' forwardedAs='div' css={S.comment}>
                <SimpleHtmlFormatter text={comment} />
              </Typography>
            )}
          </Container>
        </Container>
      </NoteCard.Body>
    </NoteCard>
  )
}

export default TalentSoftSkillRating
