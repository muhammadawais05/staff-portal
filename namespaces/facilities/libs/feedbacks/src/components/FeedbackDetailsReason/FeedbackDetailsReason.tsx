import React, { useMemo } from 'react'
import { Typography, TypographyOverflow } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { Option, OptionGroups } from '@toptal/picasso/Select'
import {
  FeedbackReasonActions,
  FeedbackStatus,
  UpdateFeedbackReasonInput
} from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { getFeedbackReasonOptionsHook } from '../../containers/FormReasonSelect/data'
import { useUpdateFeedbackReason, getLazyFeedbackReasonHook } from './data'

export interface Props {
  feedbackId: string
  reasonId: string
  reasonLabel: string
  disabled?: boolean
  actionIdentifier: FeedbackReasonActions
  feedbackStatus: FeedbackStatus
}

type Input = UpdateFeedbackReasonInput

const FeedbackDetailsReason = ({
  feedbackId,
  disabled = false,
  reasonId,
  reasonLabel,
  feedbackStatus,
  actionIdentifier
}: Props) => {
  const { handleMutationResult } = useHandleMutationResult()
  const useQueryOptions = getFeedbackReasonOptionsHook(actionIdentifier, true)
  const [updateFeedbackReason] = useUpdateFeedbackReason({})

  const handleChange = async (key: keyof Input, values: Partial<Input>) => {
    const { data } = await updateFeedbackReason({
      variables: { input: { feedbackId, reasonId: values.reasonId || '' } }
    })

    return handleMutationResult({
      mutationResult: data?.updateFeedbackReason
    })
  }

  const viewer = useMemo(() => {
    const isOutdated = feedbackStatus === FeedbackStatus.OUTDATED

    return (
      <TypographyOverflow
        size='medium'
        weight='semibold'
        data-testid='FeedbackDetailsReason-field'
      >
        <Typography
          as='span'
          size='inherit'
          weight='inherit'
          color='inherit'
          lineThrough={isOutdated}
        >
          {reasonLabel}
        </Typography>{' '}
        {isOutdated && (
          <Typography as='span' size='inherit' weight='inherit' color='red'>
            (outdated)
          </Typography>
        )}
      </TypographyOverflow>
    )
  }, [feedbackStatus, reasonLabel])

  return (
    <EditableField<Input, string, Option[] | OptionGroups>
      name='reasonId'
      disabled={disabled}
      onChange={handleChange}
      queryValue={getLazyFeedbackReasonHook(feedbackId)}
      queryOptions={useQueryOptions}
      value={reasonId}
      viewer={viewer || NO_VALUE}
      editor={({ options = [], ...props }) => (
        <Form.Select
          {...props}
          data-testid='FeedbackDetailsReason-options-select'
          options={options}
          menuWidth='200px'
        />
      )}
    />
  )
}

export default FeedbackDetailsReason
