import { Container, Typography } from '@toptal/picasso'
import React from 'react'
import { DescriptionFormatter } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'

import { NoteContentType } from '../../types'
import { formatNoteAnswer } from '../../utils/format-note-answer'
import { getGroupedAnswers } from '../../../../utils/get-grouped-answers'
import NoteComment from '../NoteComment'
import * as S from './styles'
import NoteField from '../NoteField'

export interface NoteNewSalesCallContentProps {
  note: NoteContentType
}

const NoteNewSalesCallContent = ({
  note: {
    comment,
    answers: { nodes: answers }
  }
}: NoteNewSalesCallContentProps) => {
  const groupedAnswers = getGroupedAnswers(answers)

  return (
    <Container css={S.noteContent}>
      {Boolean(answers.length) &&
        groupedAnswers.map(({ groupName, groupAnswers }) => (
          <Container key={groupName} css={S.groupedAnswer}>
            {groupName && (
              <Container bottom='small'>
                <Typography weight='semibold' size='large' color='inherit'>
                  {groupName}
                </Typography>
              </Container>
            )}

            {groupAnswers.map(answer => (
              <NoteField
                key={answer.questionEdge.node.label}
                question={answer.questionEdge.node.label}
              >
                <DescriptionFormatter
                  text={formatNoteAnswer(answer) || NO_VALUE}
                />
              </NoteField>
            ))}
          </Container>
        ))}

      <NoteField question='Additional Details'>
        {comment && <NoteComment comment={comment} />}
      </NoteField>
    </Container>
  )
}

export default NoteNewSalesCallContent
