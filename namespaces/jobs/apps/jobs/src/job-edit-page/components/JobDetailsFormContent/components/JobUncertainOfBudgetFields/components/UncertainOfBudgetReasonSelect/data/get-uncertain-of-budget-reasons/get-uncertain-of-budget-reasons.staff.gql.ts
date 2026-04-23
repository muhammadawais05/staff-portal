import { gql, useQuery } from '@staff-portal/data-layer-service'

import { UncertainOfBudgetReasonsDocument } from './get-uncertain-of-budget-reasons.staff.gql.types'

export default gql`
  query UncertainOfBudgetReasons {
    jobUncertainOfBudgetReasons
  }
`

export const useGetUncertainOfBudgetReasons = () => {
  const { data, ...restOptions } = useQuery(UncertainOfBudgetReasonsDocument)

  return {
    ...restOptions,
    data:
      data?.jobUncertainOfBudgetReasons.map(reason => ({
        value: reason,
        text: reason
      })) ?? []
  }
}
