import React from 'react'
import { Typography } from '@toptal/picasso'
import { Form, useField } from '@toptal/picasso-forms'
import { GridItemField, WrapWithTooltip } from '@staff-portal/ui'

import { useGetVerticalSpecializations } from './data/use-get-vertical-specializations'
import { JobEditFormValues } from '../../../../types'
import { SPECIALIZATION_ID_FIELD, VERTICAL_ID_FIELD } from '../../../../config'

interface Props {
  originalJobVerticalId?: string
  originalSpecializationId?: string
  disabled?: boolean
}

const JobSpecializationSelect = ({
  originalJobVerticalId,
  originalSpecializationId,
  disabled = false
}: Props) => {
  const {
    input: { value: selectedVerticalId }
  } = useField<JobEditFormValues[typeof VERTICAL_ID_FIELD]>(VERTICAL_ID_FIELD, {
    subscription: { value: true }
  })

  const {
    input: { value: selectedSpecializationId }
  } = useField<JobEditFormValues[typeof SPECIALIZATION_ID_FIELD]>(
    SPECIALIZATION_ID_FIELD,
    { subscription: { value: true } }
  )

  const { data: options, loading } =
    useGetVerticalSpecializations(selectedVerticalId)

  const shouldShowNotification =
    selectedVerticalId === originalJobVerticalId &&
    selectedSpecializationId !== originalSpecializationId

  if (loading || options.length <= 1) {
    return null
  }

  return (
    <GridItemField
      label='Specialization'
      labelFor={SPECIALIZATION_ID_FIELD}
      required={!disabled}
      size='medium'
    >
      <WrapWithTooltip
        enableTooltip={disabled}
        content="You can't edit the job specialization after the job gets its first candidate."
        inline={false}
      >
        <Form.Select
          width='full'
          placeholder='Select specialization'
          id={SPECIALIZATION_ID_FIELD}
          name={SPECIALIZATION_ID_FIELD}
          options={options}
          disabled={disabled}
          required={!disabled}
          hint={
            shouldShowNotification && (
              <Typography as='span' color='yellow' size='inherit'>
                Changing the specialization will cause any candidate who has not
                been approved for the new specialization to be rejected and all
                pending availability requests to be cancelled automatically.
              </Typography>
            )
          }
        />
      </WrapWithTooltip>
    </GridItemField>
  )
}

export default JobSpecializationSelect
