import { Form, useField } from '@toptal/picasso-forms'
import { GridItemField } from '@staff-portal/ui'
import React from 'react'

import { JobEditFormValues } from '../../../../types'
import {
  UNCERTAIN_OF_BUDGET_FIELD,
  UNCERTAIN_OF_BUDGET_REASON_FIELD
} from '../../../../config'
import { UncertainOfBudgetReasonSelect } from '../JobUncertainOfBudgetFields/components'

const UNCERTAIN_OF_BUDGET_REASON_OTHER = 'Other'

const JobUncertainOfBudgetReasonCommentField = () => {
  const {
    input: { value: uncertainOfBudget }
  } = useField<JobEditFormValues[typeof UNCERTAIN_OF_BUDGET_FIELD]>(
    UNCERTAIN_OF_BUDGET_FIELD
  )

  const {
    input: { value: uncertainOfBudgetReason }
  } = useField<JobEditFormValues[typeof UNCERTAIN_OF_BUDGET_REASON_FIELD]>(
    UNCERTAIN_OF_BUDGET_REASON_FIELD
  )

  return uncertainOfBudget ? (
    <GridItemField label='Uncertain of budget reason'>
      <UncertainOfBudgetReasonSelect />

      {uncertainOfBudgetReason === UNCERTAIN_OF_BUDGET_REASON_OTHER && (
        <Form.Input
          data-testid="uncertain-of-budget-reason-comment"
          name='uncertainOfBudgetReasonComment'
          rows={5}
          maxRows={25}
          width='full'
          multiline
          multilineResizable
          required
        />
      )}
    </GridItemField>
  ) : null
}

export default JobUncertainOfBudgetReasonCommentField
