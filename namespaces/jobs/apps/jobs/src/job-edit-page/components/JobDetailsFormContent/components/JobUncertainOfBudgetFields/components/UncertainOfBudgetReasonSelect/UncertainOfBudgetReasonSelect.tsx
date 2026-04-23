import React from 'react'
import { Form } from '@toptal/picasso-forms'

import { useGetUncertainOfBudgetReasons } from './data/get-uncertain-of-budget-reasons'
import { UNCERTAIN_OF_BUDGET_REASON_FIELD } from '../../../../../../config'

const UncertainOfBudgetReasonSelect = () => {
  const { data: options, loading } = useGetUncertainOfBudgetReasons()

  return (
    <Form.Select
      name={UNCERTAIN_OF_BUDGET_REASON_FIELD}
      options={options}
      loading={loading}
      width='full'
    />
  )
}

export default UncertainOfBudgetReasonSelect
