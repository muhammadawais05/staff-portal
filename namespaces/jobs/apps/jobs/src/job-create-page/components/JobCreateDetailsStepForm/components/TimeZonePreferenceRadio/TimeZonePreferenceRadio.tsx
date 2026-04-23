import React, { useCallback } from 'react'
import { Form, useForm } from '@toptal/picasso-forms'
import { GridItemField } from '@staff-portal/ui'

import {
  TIMEZONE_PREFERENCE_FIELD,
  WORKING_TIME_FROM_FIELD,
  WORKING_TIME_TO_FIELD,
  HOURS_OVERLAP_FIELD
} from '../../../../config'
import { JobCreateFormValues } from '../../../../types'

const TimeZonePreferenceRadio = () => {
  const { change } = useForm<JobCreateFormValues>()

  const handleOnChange = useCallback(() => {
    change(WORKING_TIME_FROM_FIELD, undefined)
    change(WORKING_TIME_TO_FIELD, undefined)
    change(HOURS_OVERLAP_FIELD, undefined)
  }, [change])

  return (
    <GridItemField
      label='Time Zone Preference'
      labelFor={TIMEZONE_PREFERENCE_FIELD}
      required
      size='medium'
    >
      <Form.RadioGroup
        id={TIMEZONE_PREFERENCE_FIELD}
        name={TIMEZONE_PREFERENCE_FIELD}
        onChange={handleOnChange}
        horizontal
        required
      >
        <Form.Radio label='Yes' value='YES' />
        <Form.Radio label='No' value='NO' />
      </Form.RadioGroup>
    </GridItemField>
  )
}

export default TimeZonePreferenceRadio
