import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React, { useState } from 'react'
import { WrapWithTooltip } from '@staff-portal/ui'

import { FeedbackQuestionEdgeFragment } from '../../data'

const MATCH_AGAIN_IDENTIFIER = 'match_again'
const WHY_IDENTIFIER = 'why'

export interface Props {
  questions: FeedbackQuestionEdgeFragment[]
  interactive?: boolean
}

const CreateFeedbackAnswersForm = ({
  questions,
  interactive = false
}: Props) => {
  const [isWhyQuestionVisible, setIsWhyQuestionVisible] = useState(false)

  const handleChange = (identifier: string, value?: string | null) => {
    if (interactive && identifier === MATCH_AGAIN_IDENTIFIER) {
      setIsWhyQuestionVisible(value === 'No')
    }
  }

  return (
    <>
      {questions.map(
        ({ text, node: { id: questionId, options, identifier } }, index) => {
          if (
            interactive &&
            identifier === WHY_IDENTIFIER &&
            !isWhyQuestionVisible
          ) {
            return null
          }

          return (
            <Form.RadioGroup
              key={questionId}
              horizontal
              required
              name={`answers[${index}].optionId`}
              label={text}
              titleCase={false}
              data-testid={`create-feedback-answers-form-option-${index}`}
            >
              {options?.nodes.map(({ id: optionId, value, tooltip }) => (
                <WrapWithTooltip
                  key={optionId}
                  enableTooltip={Boolean(tooltip)}
                  content={tooltip}
                >
                  <Container>
                    <Form.Radio
                      label={value}
                      titleCase={false}
                      value={optionId}
                      onChange={() => handleChange(identifier, value)}
                    />
                  </Container>
                </WrapWithTooltip>
              ))}
            </Form.RadioGroup>
          )
        }
      )}
    </>
  )
}

export default CreateFeedbackAnswersForm
