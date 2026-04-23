import React, { useCallback } from 'react'
import { Form, useForm } from '@toptal/picasso-forms'
import { GridItemField } from '@staff-portal/ui'
import { JOB_WORK_TYPE_TEXT_MAPPING } from '@staff-portal/jobs'

import { TIME_LENGTH_ON_SITE, WORK_TYPE_FIELD } from '../../../../config'
import { JobCreateFormValues } from '../../../../types'

const JobWorkTypeSelect = () => {
  const { change } = useForm<JobCreateFormValues>()
  const handleOnChange = useCallback(
    () => change(TIME_LENGTH_ON_SITE, undefined),
    [change]
  )

  return (
    <GridItemField
      label='Work Type'
      size='medium'
      labelFor={WORK_TYPE_FIELD}
      required
    >
      <Form.RadioGroup
        id={WORK_TYPE_FIELD}
        name={WORK_TYPE_FIELD}
        onChange={handleOnChange}
        horizontal
        required
      >
        {Object.entries(JOB_WORK_TYPE_TEXT_MAPPING).map(([value, label]) => (
          <Form.Radio key={value} label={label} value={value} />
        ))}
      </Form.RadioGroup>
    </GridItemField>
  )
}

export default JobWorkTypeSelect
