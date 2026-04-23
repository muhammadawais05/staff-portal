import React, { useMemo } from 'react'
import { Form, useField } from '@toptal/picasso-forms'
import { Props as FormSelectProps } from '@toptal/picasso-forms/Select/Select'
import { DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT } from '@staff-portal/config'
import { FeedbackReasonActions } from '@staff-portal/graphql/staff'

import { useFeedbackReasonsOptions } from './hooks/use-feedback-reasons-options'
import { useGetFeedbackReasons } from './data'

type Props = Pick<
  FormSelectProps<string>,
  'name' | 'label' | 'width' | 'required' | 'autoFocus' | 'enableReset'
> & {
  grouped?: boolean
  action: FeedbackReasonActions
  onChange?: (identifier?: string) => void
  showReasonDescription?: boolean
}

const FormReasonSelect = ({
  action,
  grouped,
  onChange,
  name,
  showReasonDescription,
  ...props
}: Props) => {
  const {
    input: { value: selectedReasonId }
  } = useField(name)
  const { data, loading } = useGetFeedbackReasons(action)
  const reasons = useFeedbackReasonsOptions(data, grouped)
  const reasonDescription = useMemo(
    () => data?.find(({ id }) => id === selectedReasonId)?.description,
    [data, selectedReasonId]
  )

  return (
    <Form.Select
      {...props}
      hint={showReasonDescription ? reasonDescription : undefined}
      name={name}
      loading={loading}
      options={reasons}
      noOptionsText={DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT}
      onChange={({ target: { value: id } }) => {
        if (Array.isArray(reasons)) {
          const reason = reasons.find(({ value }) => value === id)

          onChange?.(reason?.identifier)
        }
      }}
    />
  )
}

export default FormReasonSelect
