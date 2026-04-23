import { Container, Exclamation16, Tooltip } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { Option } from '@toptal/picasso/Select'
import React from 'react'
import { UpdateFeedbackAnswerInput } from '@staff-portal/graphql/staff'
import { isOperationEnabled } from '@staff-portal/operations'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { FeedbackAnswerFragment } from '../../data'
import {
  getFeedbackQuestionOptionsHook,
  useUpdateFeedbackAnswer,
  getLazyFeedbackAnswerValueHook
} from './data'
import * as S from './styles'

export interface Props {
  answer: FeedbackAnswerFragment
}

type Input = UpdateFeedbackAnswerInput

const FeedbackAnswerValue = ({
  answer: {
    id: feedbackAnswerId,
    option,
    tooltip,
    operations: { updateFeedbackAnswer: updateFeedbackAnswerOperation }
  }
}: Props) => {
  const { handleMutationResult } = useHandleMutationResult()

  const queryOptions = getFeedbackQuestionOptionsHook(option?.question.id)
  const [updateFeedbackAnswer] = useUpdateFeedbackAnswer({})

  const handleChange = async (key: keyof Input, values: Partial<Input>) => {
    const newOptionId = values[key]

    if (!newOptionId || newOptionId === option?.id) {
      return
    }

    const { data: mutationData } = await updateFeedbackAnswer({
      variables: {
        input: { feedbackAnswerId, optionId: newOptionId }
      }
    })

    return handleMutationResult({
      mutationResult: mutationData?.updateFeedbackAnswer
    })
  }

  return (
    <EditableField<UpdateFeedbackAnswerInput, string, Option[]>
      width='small'
      name='optionId'
      flex
      value={option?.id}
      queryValue={getLazyFeedbackAnswerValueHook(feedbackAnswerId)}
      queryOptions={queryOptions}
      onChange={handleChange}
      viewer={option?.value || NO_VALUE}
      icon={
        tooltip ? (
          <Tooltip content={tooltip}>
            <Container
              inline
              data-testid='feedback-answer-tooltip'
              css={S.infoIcon}
            >
              <Exclamation16 color='dark-grey' />
            </Container>
          </Tooltip>
        ) : undefined
      }
      disabled={!isOperationEnabled(updateFeedbackAnswerOperation)}
      editor={({ options = [], ...props }) => (
        <Form.Select {...props} options={options} size='small' width='full' />
      )}
    />
  )
}

export default FeedbackAnswerValue
