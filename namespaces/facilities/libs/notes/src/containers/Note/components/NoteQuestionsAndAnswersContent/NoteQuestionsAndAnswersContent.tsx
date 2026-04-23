import { DescriptionFormatter } from '@staff-portal/ui'
import React from 'react'
import { NO_VALUE } from '@staff-portal/config'

import { NoteContentType } from '../../types'
import { formatNoteAnswer } from '../../utils/format-note-answer'
import NoteComment from '../NoteComment'
import NoteField from '../NoteField'
import NoteSoftSkillRatings from '../NoteSoftSkillRatings'

export interface NoteQuestionsAndAnswersContentProps {
  note: NoteContentType
}

const NoteQuestionsAndAnswersContent = ({
  note: {
    comment,
    answers: { nodes: answers },
    softSkillRatings: { nodes: softSkillRatings }
  }
}: NoteQuestionsAndAnswersContentProps) => (
  <>
    {answers.map(answer => (
      <NoteField
        key={answer.questionEdge.node.label}
        question={answer.questionEdge.node.label}
      >
        <DescriptionFormatter text={formatNoteAnswer(answer) || NO_VALUE} />
      </NoteField>
    ))}

    <NoteSoftSkillRatings softSkillRatings={softSkillRatings} />

    {comment && <NoteComment comment={comment} />}
  </>
)

export default NoteQuestionsAndAnswersContent
