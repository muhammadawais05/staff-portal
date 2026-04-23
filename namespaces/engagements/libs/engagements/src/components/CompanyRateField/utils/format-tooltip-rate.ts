import { formatAmount } from '@toptal/picasso/utils'
import { CommitmentRateAvailability } from '@staff-portal/graphql/staff'

import { HOUR_SUFFIX, WEEK_SUFFIX } from '../../../constants'
import { Props as CompanyRateFieldProps } from '../CompanyRateField'

export type Props = Pick<CompanyRateFieldProps, 'rate' | 'discountMultiplier'>

export const formatTooltipRate = ({
  rate,
  discountMultiplier
}: Omit<Props, 'discountMultiplier'> & {
  discountMultiplier: string
}) => {
  const value = rate?.value
  const availability = rate?.availability

  return `${formatAmount({
    amount: (Number(value) * Number(discountMultiplier)).toFixed(2)
  })}${
    availability === CommitmentRateAvailability.HOUR ? HOUR_SUFFIX : WEEK_SUFFIX
  }`
}
