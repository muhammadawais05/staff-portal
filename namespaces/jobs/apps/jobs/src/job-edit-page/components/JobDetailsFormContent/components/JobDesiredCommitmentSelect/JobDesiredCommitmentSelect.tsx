import React, { useCallback } from 'react'
import { Form, useForm } from '@toptal/picasso-forms'
import { COMMITMENT_FOR_REHIRE } from '@staff-portal/jobs'
import { GridItemField } from '@staff-portal/ui'

import {
  COMMITMENT_FIELD,
  COMMITMENT_MINIMUM_HOURS_FIELD,
  COMMITMENT_COMMENT_FIELD,
  EXPECTED_WEEKLY_HOURS_FIELD
} from '../../../../config'
import { JobEditFormValues } from '../../../../types'

export interface Props {
  disabled: boolean
}

const commitmentOptions = Object.entries(COMMITMENT_FOR_REHIRE).map(
  ([value, text]) => ({ value, text })
)

const JobDesiredCommitmentSelect = ({ disabled }: Props) => {
  const { change } = useForm<JobEditFormValues>()

  const handleOnChange = useCallback(() => {
    change(EXPECTED_WEEKLY_HOURS_FIELD, undefined)
    change(COMMITMENT_MINIMUM_HOURS_FIELD, undefined)
    change(COMMITMENT_COMMENT_FIELD, undefined)
  }, [change])

  return (
    <GridItemField
      label='Desired Commitment'
      labelFor='commitment'
      required={!disabled}
      size='medium'
    >
      <Form.Select
        width='full'
        placeholder='Select desired commitment'
        id={COMMITMENT_FIELD}
        name={COMMITMENT_FIELD}
        options={commitmentOptions}
        onChange={handleOnChange}
        disabled={disabled}
        required={!disabled}
      />
    </GridItemField>
  )
}

export default JobDesiredCommitmentSelect
