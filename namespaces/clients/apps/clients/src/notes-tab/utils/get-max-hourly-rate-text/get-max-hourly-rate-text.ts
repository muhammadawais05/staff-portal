import { JobBudgetDetails, Maybe } from '@staff-portal/graphql/staff'
import { isNotNullish } from '@staff-portal/utils'
import { formatAmount } from '@toptal/picasso/utils'

import { JOB_BUDGET_DETAILS_TYPE_MAPPING } from '../../components/DraftJobForm/config'

const getMaxHourlyRateText = ({
  budgetDetails,
  maxHourlyRate
}: {
  budgetDetails?: Maybe<JobBudgetDetails>
  maxHourlyRate?: Maybe<number>
}) => {
  if (!budgetDetails && !maxHourlyRate) {
    return null
  }

  if (budgetDetails === JobBudgetDetails.RATE_SPECIFIED) {
    return isNotNullish(maxHourlyRate)
      ? `${formatAmount({ amount: maxHourlyRate })}/hour`
      : null
  }

  if (budgetDetails === JobBudgetDetails.NO_RATE_LIMIT) {
    return 'No rate limit'
  }

  return budgetDetails
    ? JOB_BUDGET_DETAILS_TYPE_MAPPING[budgetDetails] ?? null
    : null
}

export default getMaxHourlyRateText
