import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React from 'react'
import { NoteQuestionKind } from '@staff-portal/graphql/staff'

import { NoteQuestionWithOptionsFragment } from '../../../../data/note-answer-fragment'

export interface Props {
  question: NoteQuestionWithOptionsFragment
  index: number
  value?: string | null
  disabled?: boolean
}

const NoteFormAnswerComment = ({ question, index, value, disabled }: Props) => {
  const { kind, commentType, additionalCommentsHint } = question

  if (!commentType || kind === NoteQuestionKind.RADIO_BUTTONS_WITH_SKILL) {
    return null
  }

  return (
    <Container top='xsmall'>
      <Form.Input
        multiline
        rowsMin={1}
        placeholder={additionalCommentsHint ?? undefined}
        width='full'
        initialValue={value}
        name={`answers[${index}].comment`}
        disabled={disabled}
      />
    </Container>
  )
}

export default NoteFormAnswerComment
