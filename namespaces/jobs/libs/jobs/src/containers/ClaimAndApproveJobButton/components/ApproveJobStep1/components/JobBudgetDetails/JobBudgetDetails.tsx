import React, { useCallback, useMemo } from 'react'
import { Form, useForm, useFormState } from '@toptal/picasso-forms'
import { ReferralBonus16 } from '@toptal/picasso'
import { isMaxLength } from '@staff-portal/validators'

import { ApproveJobForm } from '../../../../types'

const OTHER_REASON = 'Other'

export interface Props {
  jobUncertainOfBudgetReasons: string[]
}

const JobBudgetDetails = ({ jobUncertainOfBudgetReasons }: Props) => {
  const { resetFieldState, change } = useForm()
  const {
    values: { uncertainOfBudget, noRateLimit, uncertainOfBudgetReason }
  } = useFormState<ApproveJobForm>({ subscription: { values: true } })

  const isMaxHourlyRateDisabled = Boolean(noRateLimit || uncertainOfBudget)
  const isNoRateLimitDisabled = Boolean(uncertainOfBudget)
  const isUncertainOfBudgetDisabled = Boolean(noRateLimit)

  const handleNoRateLimitChange = useCallback(() => {
    change('maxHourlyRate', undefined)
    change('uncertainOfBudget', undefined)

    resetFieldState('maxHourlyRate')
    resetFieldState('uncertainOfBudget')
  }, [change, resetFieldState])

  const handleUncertainOfBudgetChange = useCallback(() => { 
    change('maxHourlyRate', undefined)
    change('noRateLimit', undefined)
    change('uncertainOfBudgetReason', undefined)
    change('uncertainOfBudgetReasonComment', undefined)

    resetFieldState('maxHourlyRate')
    resetFieldState('noRateLimit')
  }, [change, resetFieldState])

  const handleuncertainOfBudgetReasonChange = useCallback(() => {
    change('uncertainOfBudgetReasonComment', undefined)
  }, [change])

  const uncertainOfBudgetReasons = useMemo(
    () =>
      jobUncertainOfBudgetReasons.map(reason => ({
        value: reason,
        text: reason
      })),
    [jobUncertainOfBudgetReasons]
  )

  return (
    <>
      <Form.NumberInput
        name='maxHourlyRate'
        label='Max Hourly Rate'
        width='full'
        disabled={isMaxHourlyRateDisabled}
        required={!isMaxHourlyRateDisabled}
        hideControls
        icon={<ReferralBonus16 />}
        hint='The max hourly company rate as stated by client.'
        data-testid='approve-job-step-max-hourly-rate'
      />

      <Form.Checkbox
        name='noRateLimit'
        label='No rate limit'
        titleCase={false}
        disabled={isNoRateLimitDisabled}
        onChange={handleNoRateLimitChange}
      />

      <Form.Checkbox
        name='uncertainOfBudget'
        label='Uncertain of budget'
        titleCase={false}
        disabled={isUncertainOfBudgetDisabled}
        onChange={handleUncertainOfBudgetChange}
      />

      {uncertainOfBudget && (
        <Form.Select
          name='uncertainOfBudgetReason'
          label='Uncertain of budget reason'
          titleCase={false}
          placeholder='Select reason'
          options={uncertainOfBudgetReasons}
          onChange={handleuncertainOfBudgetReasonChange}
          required
        />
      )}

      {uncertainOfBudget && uncertainOfBudgetReason === OTHER_REASON && (
        <Form.Input
          name='uncertainOfBudgetReasonComment'
          placeholder='Please provide a reason for Uncertain of budget'
          titleCase={false}
          required
          width='full'
          multiline
          rows={4}
          validate={isMaxLength}
        />
      )}
    </>
  )
}

export default JobBudgetDetails
