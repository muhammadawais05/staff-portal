import { pick } from 'lodash-es'
import React from 'react'

import { CommitmentChangeModalFormValues } from '../../CommitmentChangeModalForm/CommitmentChangeModalForm'

export const updateRateChangeWarning = (
  newValues: CommitmentChangeModalFormValues,
  initialValues: Partial<CommitmentChangeModalFormValues>,
  setRateValueChanged: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const filteredValues = pick(newValues, [
    'companyFullTimeRate',
    'companyHourlyRate',
    'companyPartTimeRate',
    'fullTimeDiscount',
    'markup',
    'partTimeDiscount',
    'rateMethod',
    'talentFullTimeRate',
    'talentHourlyRate',
    'talentPartTimeRate'
  ]) as CommitmentChangeModalFormValues

  setRateValueChanged(isRateValueChanged(initialValues, filteredValues))
}

const isRateValueChanged = (
  initialValues: Partial<CommitmentChangeModalFormValues>,
  currentValues: Partial<CommitmentChangeModalFormValues>
) =>
  !!Object.keys(currentValues).find(
    fieldName =>
      initialValues[fieldName as keyof CommitmentChangeModalFormValues] !==
      currentValues[fieldName as keyof CommitmentChangeModalFormValues]
  )
