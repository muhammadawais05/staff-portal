import { Form, useField, useForm } from '@toptal/picasso-forms'
import { Props as FormSelectProps } from '@toptal/picasso-forms/Select/Select'
import React, { useEffect, useMemo } from 'react'

import { FeedbackReasonFragment } from '../../containers/FormReasonSelect/data/get-feedback-reasons'
import { getSubReasonLabel } from './utils'

const DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT = 'No results'

type CustomFormSelectProps = Pick<
  FormSelectProps<string>,
  'name' | 'label' | 'width' | 'required' | 'autoFocus' | 'enableReset'
>

export type Props = CustomFormSelectProps & {
  reasons: FeedbackReasonFragment[]
  subReasonProps: Omit<CustomFormSelectProps, 'label'> & { label?: string }
}

const FormReasonSelectWithSubReason = ({
  reasons,
  subReasonProps,
  ...props
}: Props) => {
  const { change } = useForm()

  const {
    input: { value: reasonId },
    meta: { dirty: isReasonModified }
  } = useField(props.name)

  useEffect(() => {
    if (reasonId && isReasonModified) {
      change(subReasonProps.name, undefined)
    }
  }, [change, isReasonModified, reasonId, subReasonProps.name])

  const reasonsResult = useMemo(
    () =>
      reasons
        .filter(({ group }) => !group)
        .map(({ id, name }) => ({ text: name, value: id })) ?? [],
    [reasons]
  )

  const { subReasons, subReasonLabel } = useMemo(() => {
    const reason = reasons.find(({ id }) => id === reasonId)
    const label = reason ? getSubReasonLabel(reason.identifier) : ''

    const subReasonsResult =
      reasons
        .filter(({ group }) => group?.id === reasonId)
        .map(({ id, name }) => ({ text: name, value: id })) ?? []

    return { subReasons: subReasonsResult, subReasonLabel: label }
  }, [reasons, reasonId])

  return (
    <>
      <Form.Select
        {...props}
        options={reasonsResult}
        noOptionsText={DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT}
      />

      {Boolean(subReasons.length) && (
        <Form.Select
          {...subReasonProps}
          label={subReasonProps.label ?? subReasonLabel}
          options={subReasons}
          noOptionsText={DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT}
          data-testid='FormReasonSelectWithSubReason-subReasonId'
        />
      )}
    </>
  )
}

export default FormReasonSelectWithSubReason
