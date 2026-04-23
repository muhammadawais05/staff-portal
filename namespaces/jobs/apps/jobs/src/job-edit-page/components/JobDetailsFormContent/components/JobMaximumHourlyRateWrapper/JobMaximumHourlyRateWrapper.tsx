import React, { PropsWithChildren } from 'react'
import { useField, useForm } from '@toptal/picasso-forms'
import { useDebouncedCallback } from 'use-debounce'
import { DEFAULT_INPUT_DEBOUNCE_DELAY } from '@staff-portal/config'
import { JobMaxHourlyRateWidgets } from '@staff-portal/jobs'

import {
  COMMITMENT_FIELD,
  MAX_HOURLY_RATE_FIELD,
  NO_RATE_LIMIT_FIELD,
  SKILLSETS_FIELD,
  UNCERTAIN_OF_BUDGET_FIELD,
  VERTICAL_ID_FIELD
} from '../../../../config'
import { JobEditFormValues } from '../../../../types'

interface Props {
  fieldOptions?: React.ReactNode
}

const JobMaximumHourlyRateWrapper = ({
  children,
  fieldOptions
}: PropsWithChildren<Props>) => {
  const {
    input: { value: noRateLimit }
  } = useField<JobEditFormValues[typeof NO_RATE_LIMIT_FIELD]>(
    NO_RATE_LIMIT_FIELD,
    {
      subscription: { value: true }
    }
  )

  const {
    input: { value: uncertainOfBudget }
  } = useField<JobEditFormValues[typeof MAX_HOURLY_RATE_FIELD]>(
    UNCERTAIN_OF_BUDGET_FIELD,
    {
      subscription: { value: true }
    }
  )

  const {
    input: { value: maxHourlyRate }
  } = useField<JobEditFormValues[typeof MAX_HOURLY_RATE_FIELD]>(
    MAX_HOURLY_RATE_FIELD,
    {
      subscription: { value: true }
    }
  )

  const {
    input: { value: verticalId }
  } = useField<JobEditFormValues[typeof VERTICAL_ID_FIELD]>(VERTICAL_ID_FIELD, {
    subscription: { value: true }
  })

  const {
    input: { value: jobCommitment }
  } = useField<JobEditFormValues[typeof COMMITMENT_FIELD]>(COMMITMENT_FIELD, {
    subscription: { value: true }
  })

  const {
    input: { value: skillSets }
  } = useField<JobEditFormValues[typeof SKILLSETS_FIELD]>(SKILLSETS_FIELD, {
    subscription: { value: true }
  })

  const { change } = useForm<JobEditFormValues>()

  const expanded = !noRateLimit && !uncertainOfBudget

  const handleChange = (value: number) => {
    change(MAX_HOURLY_RATE_FIELD, value)
  }

  const debouncedOnChange = useDebouncedCallback(
    handleChange,
    DEFAULT_INPUT_DEBOUNCE_DELAY
  )

  return (
    <JobMaxHourlyRateWidgets
      data-testid='job-max-hourly-rate-wrapper'
      expanded={expanded}
      skillSets={skillSets}
      verticalId={verticalId as string}
      jobCommitment={jobCommitment as string}
      maxHourlyRate={maxHourlyRate ? Number(maxHourlyRate) : undefined}
      fieldOptions={fieldOptions}
      onSliderChange={debouncedOnChange}
      edit={true}
    >
      {children}
    </JobMaxHourlyRateWidgets>
  )
}

export default JobMaximumHourlyRateWrapper
