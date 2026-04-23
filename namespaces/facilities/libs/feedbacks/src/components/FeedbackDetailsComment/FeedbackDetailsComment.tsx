import React from 'react'
import { UpdateFeedbackCommentInput } from '@staff-portal/graphql/staff'
import { EditableTextarea, EditableField } from '@staff-portal/editable'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NO_VALUE } from '@staff-portal/config'

import { useUpdateFeedbackComment, getLazyFeedbackCommentHook } from './data'

export interface Props {
  feedbackId: string
  comment: string
  disabled: boolean
}

type Input = UpdateFeedbackCommentInput

const FeedbackDetailsComment = ({ feedbackId, comment, disabled }: Props) => {
  const { handleMutationResult } = useHandleMutationResult()

  const [updateFeedbackComment] = useUpdateFeedbackComment({})

  const handleOnChange = async (key: keyof Input, values: Partial<Input>) => {
    const { data } = await updateFeedbackComment({
      variables: { input: { feedbackId, comment: values.comment || '' } }
    })

    return handleMutationResult({
      mutationResult: data?.updateFeedbackComment
    })
  }

  return (
    <EditableField<Input>
      queryValue={getLazyFeedbackCommentHook(feedbackId)}
      onChange={handleOnChange}
      value={comment}
      name='comment'
      disabled={disabled}
      multiline
      fullWidthEditor
      viewer={comment || NO_VALUE}
      editor={props => <EditableTextarea {...props} required />}
    />
  )
}

export default FeedbackDetailsComment
