import React, { useCallback } from 'react'
import { Typography } from '@toptal/picasso'
import { Form, useField, useForm } from '@toptal/picasso-forms'
import { GridItemField, WrapWithTooltip } from '@staff-portal/ui'

import { useGetVerticals } from './data/get-verticals'
import { JobEditFormValues } from '../../../../types'
import {
  COMMITMENT_COMMENT_FIELD,
  COMMITMENT_MINIMUM_HOURS_FIELD,
  SPECIALIZATION_ID_FIELD,
  VERTICAL_ID_FIELD
} from '../../../../config'

interface Props {
  originalJobVerticalId?: string
  disabled?: boolean
}

const JobTypeSelect = ({ originalJobVerticalId, disabled = false }: Props) => {
  const { change } = useForm<JobEditFormValues>()
  const {
    input: { value: selectedVerticalId }
  } = useField<JobEditFormValues[typeof VERTICAL_ID_FIELD]>(VERTICAL_ID_FIELD, {
    subscription: { value: true }
  })
  const { data: options, loading } = useGetVerticals()

  const shouldShowNotification = selectedVerticalId !== originalJobVerticalId
  const handleOnChange = useCallback(() => {
    change(SPECIALIZATION_ID_FIELD, undefined)
    change(COMMITMENT_MINIMUM_HOURS_FIELD, undefined)
    change(COMMITMENT_COMMENT_FIELD, undefined)
  }, [change])

  return (
    <GridItemField
      label='Job Type'
      labelFor={VERTICAL_ID_FIELD}
      required={!disabled}
      size='medium'
    >
      <WrapWithTooltip
        enableTooltip={disabled}
        content="You can't edit the job type after the job gets its first candidate."
        inline={false}
      >
        <Form.Select
          width='full'
          placeholder='Select job type'
          id={VERTICAL_ID_FIELD}
          name={VERTICAL_ID_FIELD}
          options={options}
          onChange={handleOnChange}
          loading={loading}
          disabled={disabled}
          required={!disabled}
          hint={
            shouldShowNotification && (
              <Typography as='span' color='yellow' size='inherit'>
                Changing the job type will cause all candidates who applied
                under the original job type to be rejected and all pending
                availability requests to be cancelled automatically.
              </Typography>
            )
          }
        />
      </WrapWithTooltip>
    </GridItemField>
  )
}

export default JobTypeSelect
