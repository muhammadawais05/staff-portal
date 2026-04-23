import React, { useCallback } from 'react'
import { Form, useForm } from '@toptal/picasso-forms'
import { JOB_WORK_TYPE_TEXT_MAPPING } from '@staff-portal/jobs'
import { GridItemField } from '@staff-portal/ui'

import {
  WORK_TYPE_FIELD,
  LOCATION_COUNTRY_ID_FIELD,
  LOCATION_CITY_NAME_FIELD,
  TIME_LENGTH_ONSITE_FIELD
} from '../../../../config'
import { JobEditFormValues } from '../../../../types'

const mappedOptions = Object.entries(JOB_WORK_TYPE_TEXT_MAPPING).map(
  ([value, text]) => ({ value, text })
)

const JobWorkTypeSelect = () => {
  const { change } = useForm<JobEditFormValues>()

  const handleOnChange = useCallback(() => {
    change(LOCATION_COUNTRY_ID_FIELD as keyof JobEditFormValues, undefined)
    change(LOCATION_CITY_NAME_FIELD as keyof JobEditFormValues, undefined)
    change(TIME_LENGTH_ONSITE_FIELD, undefined)
  }, [change])

  return (
    <GridItemField
      label='Work Type'
      labelFor={WORK_TYPE_FIELD}
      required
      size='medium'
    >
      <Form.Select
        width='full'
        placeholder='Select work type'
        id={WORK_TYPE_FIELD}
        name={WORK_TYPE_FIELD}
        options={mappedOptions}
        onChange={handleOnChange}
        required
      />
    </GridItemField>
  )
}

export default JobWorkTypeSelect
