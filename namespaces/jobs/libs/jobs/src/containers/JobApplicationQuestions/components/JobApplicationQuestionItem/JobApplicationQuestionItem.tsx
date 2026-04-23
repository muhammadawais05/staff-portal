import React, { useCallback, useState } from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { Trash16 } from '@toptal/picasso/Icon'
import { Form, useFieldArray } from '@toptal/picasso-forms'

import * as S from './styles'
import { Question } from '../../../../types'

export interface Props {
  index: number
  rowNumber: number
  name: string
  isTemplateQuestion: boolean
  isSticky: boolean
}

const JobApplicationQuestionItem = ({
  index,
  rowNumber,
  name,
  isTemplateQuestion,
  isSticky
}: Props) => {
  const { fields: questions } = useFieldArray<Question>('jobPositionQuestions')
  const [hasContext, setHasContext] = useState(!!questions.value[index].comment)

  const handleQuestionDelete = useCallback(() => {
    const question = questions.value[index]

    return question.id
      ? questions.update(index, {
          ...question,
          destroy: true
        })
      : questions.remove(index)
  }, [index, questions])
  const handleContextDelete = useCallback(() => {
    const question = questions.value[index]

    questions.update(index, { ...question, comment: undefined })

    setHasContext(false)
  }, [index, questions])

  return (
    <Container flex css={S.questionWrapper}>
      <Typography size='medium'>{rowNumber + 1}.</Typography>

      <Container left='small' css={S.inputWrapper}>
        <Container flex>
          <Container right='small' css={S.inputWrapper}>
            <Form.Input
              name={`${name}.label`}
              width='full'
              multiline
              rows={isTemplateQuestion ? undefined : 2}
              limit={isTemplateQuestion ? undefined : 250}
              placeholder='e.g., When can you start working?'
              disabled={isTemplateQuestion}
              required
            />
          </Container>

          <Button.Circular
            variant='flat'
            icon={<Trash16 color='red' />}
            onClick={handleQuestionDelete}
          />
        </Container>

        {!hasContext && isTemplateQuestion && (
          <Container top='xsmall'>
            <Button.Action onClick={() => setHasContext(true)}>
              Add Context
            </Button.Action>
          </Container>
        )}

        {hasContext && (
          <Container flex top='xsmall'>
            <Container right='small' css={S.inputWrapper}>
              <Form.Input
                name={`${name}.comment`}
                width='full'
                multiline
                rows={2}
                max={20}
                limit={250}
                placeholder='Share more context to help the talent understand the need for this question.'
                hint='This text will appear next to the question in the job application'
              />
            </Container>

            <Button.Circular
              variant='flat'
              icon={<Trash16 color='red' />}
              onClick={handleContextDelete}
            />
          </Container>
        )}

        {!isSticky && (
          <Container top='xsmall'>
            <Form.Checkbox
              name={`${name}.required`}
              label='This question is required.'
              titleCase={false}
            />
          </Container>
        )}
      </Container>
    </Container>
  )
}

export default JobApplicationQuestionItem
