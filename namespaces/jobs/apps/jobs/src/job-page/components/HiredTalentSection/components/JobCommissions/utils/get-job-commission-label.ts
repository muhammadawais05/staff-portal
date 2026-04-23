import { formatAmount } from '@toptal/picasso/utils'
import { Maybe } from '@staff-portal/graphql/staff'
import type { DetailedListItem } from '@staff-portal/ui'

import { SourcingCommissionFragment } from '../data/get-job-commissions'

type Props = {
  commissionsPot?: Maybe<number>
  referralCommission: SourcingCommissionFragment | string
  type: string
}

const getJobCommissionLabel = ({
  commissionsPot,
  referralCommission,
  type
}: Props): DetailedListItem['label'] => {
  let suffix = ''

  if (typeof referralCommission === 'string') {
    suffix = referralCommission
  } else if ('commission' in referralCommission) {
    suffix = formatAmount({
      amount: referralCommission.commission ?? 0
    })
  } else if (commissionsPot) {
    suffix = `${
      (Number(referralCommission.ratePercent) * 100) / commissionsPot
    }%`
  }

  if (suffix) {
    return `${type} (${suffix})`
  }

  return type
}

export default getJobCommissionLabel
