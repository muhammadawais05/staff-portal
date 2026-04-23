import { MakeLinksInteractive } from '@staff-portal/ui'
import React from 'react'

import { NoteSoftSkillRatingFragment } from '../../../../data/note-soft-skill-rating-fragment'
import { formatNoteSkillRating } from '../../utils/format-note-skill-rating'
import NoteField from '../NoteField'

export interface NoteSoftSkillRatingsProps {
  softSkillRatings: NoteSoftSkillRatingFragment[]
}

const NoteSoftSkillRatings = ({
  softSkillRatings
}: NoteSoftSkillRatingsProps) => {
  return (
    <>
      {softSkillRatings.map(
        ({ softSkill: { name }, value, comment: skillRatingComment }) => (
          <NoteField key={name} question={name}>
            <MakeLinksInteractive>
              {formatNoteSkillRating(value, skillRatingComment)}
            </MakeLinksInteractive>
          </NoteField>
        )
      )}
    </>
  )
}

export default NoteSoftSkillRatings
