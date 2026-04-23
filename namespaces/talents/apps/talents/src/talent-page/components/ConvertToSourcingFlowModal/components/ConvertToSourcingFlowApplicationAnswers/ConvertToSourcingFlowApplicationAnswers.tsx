import { Container } from '@toptal/picasso'
import { Form, useForm } from '@toptal/picasso-forms'
import React from 'react'

import { DefaultApplicationAnswersFragment } from '../../data/get-convert-to-sourcing-flow'
import { AnswerFormValue } from '../../types'

interface Props {
  answers: DefaultApplicationAnswersFragment[]
  initialAnswerValues: AnswerFormValue
}

const transformOptions = (
  options: DefaultApplicationAnswersFragment['question']['options']['nodes']
) =>
  options.map(option => ({
    text: option.content,
    value: option.content
  }))

const ConvertToSourcingFlowApplicationAnswers = ({
  answers,
  initialAnswerValues
}: Props) => {
  const form = useForm()
  const onChange = (answerId: string, questionId: string) => {
    form.change(`answer.${questionId}`, answerId)
  }

  const mapAnswer = (answer: DefaultApplicationAnswersFragment) => {
    const sharedProps = {
      key: answer.question.id,
      name: `answers.${answer.question.id}`,
      required: true,
      titleCase: false,
      label: answer.question.label,
      'data-testid': `convert-to-sourcing-flow-answer-${answer.question.id}`,
      defaultValue: initialAnswerValues[answer.question.id]
    }

    if (answer.question.kind == 'NUMERIC') {
      return <Form.NumberInput {...sharedProps} width='full' />
    }

    return (
      <Form.Select
        {...sharedProps}
        width='full'
        options={transformOptions(answer.question.options.nodes)}
        onChange={({ target }) => onChange(target.value, answer.question.id)}
      />
    )
  }

  return (
    <Container
      top='small'
      data-testid='convert-to-sourcing-flow-answer-container'
    >
      {answers.map(mapAnswer)}
    </Container>
  )
}

export default ConvertToSourcingFlowApplicationAnswers
