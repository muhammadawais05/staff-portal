import React, { useEffect } from 'react'
import { Container, Checkbox, Form } from '@toptal/picasso'
import { useFieldArray, useField } from '@toptal/picasso-forms'

import { SurveyEngagementFragment } from '../../../../data/survey-engagement-fragment'
import EngagementItemContent from '../EngagementItemContent'
import { NEGATIVE_VALUE } from '../LeaveFeedbackForm'

interface Props {
  scoreIndex: number
  engagements: NonNullable<SurveyEngagementFragment['engagements']>
}

const NegativeField = ({ scoreIndex, engagements }: Props) => {
  const {
    fields: { push, remove, value: values },
    meta: { error, touched }
  } = useFieldArray('negative')
  const {
    input: { value: scores }
  } = useField('scores')

  useEffect(() => {
    if (scores[scoreIndex] != NEGATIVE_VALUE) {
      values.forEach((value, index) => {
        if (value.index === scoreIndex) {
          remove(index)
        }
      })
    }
  }, [scores, scoreIndex, remove, values])

  if (scores[scoreIndex] != NEGATIVE_VALUE) {
    return null
  }

  return (
    <Container bottom='small'>
      <Container bottom='xsmall'>
        <Form.Hint>
          Please specify which engagements received a "no" response:
        </Form.Hint>
      </Container>
      {engagements.nodes.map(({ id, talent, job }) => (
        <Container key={id} bottom='xsmall'>
          <Checkbox
            data-testid='leave-feedback-modal-negative-checkbox'
            label={
              <EngagementItemContent
                jobLink={job?.webResource}
                talentLink={talent?.webResource}
                verticalName={job?.vertical?.name}
              />
            }
            onChange={e => {
              if (e.target.checked) {
                push({
                  index: scoreIndex,
                  engagementId: id,
                  score: 1
                })
              } else {
                remove(
                  values.findIndex(
                    value =>
                      value.engagementId === id && value.index === scoreIndex
                  )
                )
              }
            }}
          />
        </Container>
      ))}
      {touched && error && error[scoreIndex] && (
        <Form.Error>{error[scoreIndex]}</Form.Error>
      )}
    </Container>
  )
}

export default NegativeField
