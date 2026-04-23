import React, { useMemo } from 'react'
import { useField } from '@toptal/picasso-forms'
import { JobBudgetDetails } from '@staff-portal/graphql/staff'
import { Container } from '@toptal/picasso'
import { CurrencyInput } from '@staff-portal/forms'

import { DraftJobFormFields } from '../../../../enums/DraftJobFormFields'
import RadioGroup from '../RadioGroup/DraftJobFormRadioGroup'
import {
  JOB_BUDGET_DETAILS_TYPE_MAPPING,
  JOB_BUDGET_DETAILS_TYPE_OPTIONS
} from '../../config'
import Field from '../Field'
import * as S from './styles'

const DraftJobFormJobBudgetFields = () => {
  const selectedJobBudgetDetailsType: JobBudgetDetails | null = useField(
    DraftJobFormFields.BudgetDetails
  ).input.value

  const jobBudgetDetailsTypeOptions = useMemo(
    () =>
      JOB_BUDGET_DETAILS_TYPE_OPTIONS.map(jobBudgetDetailsType => ({
        label: JOB_BUDGET_DETAILS_TYPE_MAPPING[jobBudgetDetailsType],
        value: jobBudgetDetailsType
      })),
    []
  )

  const disabled =
    selectedJobBudgetDetailsType !== JobBudgetDetails.RATE_SPECIFIED

  return (
    <Field label='Estimated maximum hourly rate'>
      <Container flex alignItems='flex-start'>
        <Container right='medium'>
          <RadioGroup
            name={DraftJobFormFields.BudgetDetails}
            horizontal={false}
            options={jobBudgetDetailsTypeOptions}
          />
        </Container>

        <CurrencyInput
          css={S.maxHourlyRateField}
          width='full'
          name={DraftJobFormFields.MaxHourlyRate}
          allowDecimals={false}
          disabled={disabled}
          required={!disabled}
        />
      </Container>
    </Field>
  )
}

export default DraftJobFormJobBudgetFields
