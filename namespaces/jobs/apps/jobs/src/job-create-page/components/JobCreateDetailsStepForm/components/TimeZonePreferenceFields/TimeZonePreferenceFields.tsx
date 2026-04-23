import React from 'react'
import { Form, useField } from '@toptal/picasso-forms'
import { Container, Form as PicassoForm } from '@toptal/picasso'
import {
  getHoursAndMinutesOfDay,
  getHoursOfOverlap
} from '@staff-portal/date-time-utils'
import { GridItemField } from '@staff-portal/ui'

import { JobCreateFormValues } from '../../../../types'
import {
  TIMEZONE_PREFERENCE_FIELD,
  WORKING_TIME_FROM_FIELD,
  WORKING_TIME_TO_FIELD,
  HOURS_OVERLAP_FIELD
} from '../../../../config'
import * as S from './styles'

const hoursOverlapOptions = getHoursOfOverlap({ maxHoursOverlap: 12 })
const workingTimeOptions = getHoursAndMinutesOfDay({ hourlyInterval: 2 })

export const TimeZonePreferenceFields = () => {
  const {
    input: { value: timeZonePreference }
  } = useField<JobCreateFormValues[typeof TIMEZONE_PREFERENCE_FIELD]>(
    TIMEZONE_PREFERENCE_FIELD
  )

  if (timeZonePreference !== 'YES') {
    return null
  }

  return (
    <>
      <GridItemField label='Client Working Hours'>
        <Container flex alignItems='center' gap='small'>
          <Container flex alignItems='baseline' gap='small'>
            <PicassoForm.Label htmlFor={WORKING_TIME_FROM_FIELD}>
              From
            </PicassoForm.Label>
            <Form.Select
              css={S.workingTimeSelect}
              name={WORKING_TIME_FROM_FIELD}
              options={workingTimeOptions}
              defaultValue='09:00:00'
            />
          </Container>
          <Container flex alignItems='baseline' gap='small'>
            <PicassoForm.Label htmlFor={WORKING_TIME_TO_FIELD}>
              To
            </PicassoForm.Label>
            <Form.Select
              css={S.workingTimeSelect}
              name={WORKING_TIME_TO_FIELD}
              options={workingTimeOptions}
              defaultValue='17:00:00'
            />
          </Container>
        </Container>
      </GridItemField>
      <GridItemField
        label='Hours of Overlap'
        labelFor={HOURS_OVERLAP_FIELD}
        size='medium'
      >
        <Form.Select
          name={HOURS_OVERLAP_FIELD}
          options={hoursOverlapOptions}
          defaultValue='no_preference'
          width='full'
        />
      </GridItemField>
    </>
  )
}

export default TimeZonePreferenceFields
