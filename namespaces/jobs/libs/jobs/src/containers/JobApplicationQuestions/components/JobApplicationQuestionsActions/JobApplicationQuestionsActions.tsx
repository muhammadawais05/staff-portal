import React, { useCallback } from 'react'
import { Container, Button, Dropdown, Menu, Typography } from '@toptal/picasso'
import { Chevron16, Plus16 } from '@toptal/picasso/Icon'
import { useFieldArray } from '@toptal/picasso-forms'

import { useActiveJobPositionQuestionTemplates } from './data'
import { Question } from '../../../../types'
import * as S from './styles'

export interface JobApplicationQuestionsActionsProps {
  skipStickyQuestions?: boolean
}

const JobApplicationQuestionsActions = ({
  skipStickyQuestions
}: JobApplicationQuestionsActionsProps) => {
  const { data: questionTemplatesOptions, loading } =
    useActiveJobPositionQuestionTemplates(skipStickyQuestions)
  const { fields: questions } = useFieldArray<Question>('jobPositionQuestions')
  const handleAddNewQuestion = useCallback(
    ({
      jobPositionQuestionTemplateId,
      label,
      sticky
    }: Pick<Question, 'jobPositionQuestionTemplateId' | 'label' | 'sticky'>) =>
      questions.push({
        label,
        sticky,
        jobPositionQuestionTemplateId,
        required: true
      }),
    [questions]
  )

  return (
    <Container flex alignItems='center'>
      <Dropdown
        placement='top-start'
        contentOverflow='visible'
        content={
          <Menu css={S.dropdownMenu}>
            {questionTemplatesOptions?.map(({ id, question, sticky }) => (
              <Menu.Item
                key={id}
                onClick={() =>
                  handleAddNewQuestion({
                    jobPositionQuestionTemplateId: id,
                    label: question,
                    sticky
                  })
                }
              >
                <Container right='xsmall'>
                  <Plus16 />
                </Container>
                <Typography size='medium'>{question}</Typography>
              </Menu.Item>
            ))}
          </Menu>
        }
      >
        <Button
          variant='primary'
          size='small'
          loading={loading}
          icon={<Chevron16 />}
          iconPosition='right'
          disabled={!questionTemplatesOptions?.length}
        >
          Add Template Question
        </Button>
      </Dropdown>

      <Container left='xsmall'>
        <Button
          variant='secondary'
          size='small'
          onClick={() => handleAddNewQuestion({ label: '' })}
        >
          Add Custom Question
        </Button>
      </Container>
    </Container>
  )
}

export default JobApplicationQuestionsActions
