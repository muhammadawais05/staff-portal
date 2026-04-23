import { Form, Grid, Typography } from '@toptal/picasso'
import React from 'react'
import { UnsafeAdvancedHtmlFormatter } from '@staff-portal/string'

import { NoteAnswerWithOptionsFragment } from '../../../../data/note-answer-fragment'
import NoteFormAnswerBuilder from '../NoteFormAnswerBuilder'

export interface Props {
  startIndex: number
  answers: NoteAnswerWithOptionsFragment[]
  verticalId?: string
  hideIndex?: boolean
  isEditingExisting?: boolean
}

const NoteFormAnswers = ({
  answers,
  startIndex,
  verticalId,
  hideIndex = false,
  isEditingExisting
}: Props) => {
  let answerCount = startIndex

  return (
    <>
      {answers.map(({ value, comment, questionEdge }) => {
        const labelPrefix = hideIndex ? '' : `${answerCount + 1}. `

        return (
          <Grid key={questionEdge.node.id} alignItems='baseline'>
            <Grid.Item small={4}>
              <Form.Label
                requiredDecoration={
                  questionEdge.node.required ? 'asterisk' : undefined
                }
              >
                <Typography size='medium' as='span'>
                  {labelPrefix}
                  {questionEdge.renderedLabel && (
                    <UnsafeAdvancedHtmlFormatter
                      as='span'
                      html={questionEdge.renderedLabel}
                    />
                  )}
                </Typography>
              </Form.Label>
            </Grid.Item>

            <Grid.Item small={8}>
              <NoteFormAnswerBuilder
                question={questionEdge.node}
                index={answerCount++}
                verticalId={verticalId}
                value={value}
                isEditingExisting={isEditingExisting}
                comment={comment}
              />
            </Grid.Item>
          </Grid>
        )
      })}
    </>
  )
}

export default NoteFormAnswers
