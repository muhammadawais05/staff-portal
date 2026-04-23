import React from 'react'
import { Form, useField } from '@toptal/picasso-forms'
import { JobWorkType } from '@staff-portal/graphql/staff'
import { GridItemField } from '@staff-portal/ui'
import { getOnsiteTimeOptions } from '@staff-portal/jobs'

import { JobEditFormValues } from '../../../../types'
import { WORK_TYPE_FIELD, TIME_LENGTH_ONSITE_FIELD } from '../../../../config'

const timeLengthOnsiteOptions = getOnsiteTimeOptions({
  maxOnsiteTimePercentage: 80
})

const TimeLengthOnsiteSelect = () => {
  const {
    input: { value: workType }
  } = useField<JobEditFormValues[typeof WORK_TYPE_FIELD]>(WORK_TYPE_FIELD)

  if (workType !== JobWorkType.MIXED) {
    return null
  }

  return (
    <GridItemField
      label='Time Length Onsite'
      labelFor={TIME_LENGTH_ONSITE_FIELD}
      required
    >
      <Form.Select
        name={TIME_LENGTH_ONSITE_FIELD}
        options={timeLengthOnsiteOptions}
        width='auto'
        required
      />
    </GridItemField>
  )
}

export default TimeLengthOnsiteSelect
