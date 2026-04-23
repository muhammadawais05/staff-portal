import React from 'react'
import { Form, useField } from '@toptal/picasso-forms'
import { JobWorkType } from '@staff-portal/graphql/staff'
import { GridItemField } from '@staff-portal/ui'
import { getOnsiteTimeOptions } from '@staff-portal/jobs'

import { JobCreateFormValues } from '../../../../types'
import { TIME_LENGTH_ON_SITE, WORK_TYPE_FIELD } from '../../../../config'

const timeLengthOnsiteOptions = getOnsiteTimeOptions({
  maxOnsiteTimePercentage: 80
})

const TimeLengthOnsiteSelect = () => {
  const {
    input: { value: workType }
  } = useField<JobCreateFormValues[typeof WORK_TYPE_FIELD]>(WORK_TYPE_FIELD)

  if (workType !== JobWorkType.MIXED) {
    return null
  }

  return (
    <GridItemField
      label='Time Length Onsite'
      labelFor={TIME_LENGTH_ON_SITE}
      required
      size='medium'
    >
      <Form.Select
        id={TIME_LENGTH_ON_SITE}
        name={TIME_LENGTH_ON_SITE}
        options={timeLengthOnsiteOptions}
        width='full'
        required
      />
    </GridItemField>
  )
}

export default TimeLengthOnsiteSelect
