import i18n from '@staff-portal/billing/src/utils/i18n'

import { ClientCommissionFragment } from '../data/getCommission.graphql.types'

type ReferralCommission = Exclude<
  ClientCommissionFragment['commissions'],
  undefined | null
>['referralCommission']
type ReferralCommissionCommission = Extract<
  Exclude<ReferralCommission, null | undefined>,
  { commission: string }
>
type ReferralCommissionRatePercent = Extract<
  Exclude<ReferralCommission, null | undefined>,
  { ratePercent: string }
>

const getCommissionDetailedListReferralLabel = (
  referralCommission: ReferralCommission
) => {
  if (!referralCommission) {
    return i18n.t('commission:widget:referrer.label.withoutCommission')
  }

  if ((referralCommission as ReferralCommissionCommission).commission) {
    return i18n.t('commission:widget:referrer.label.withCommission.amount', {
      commission: (referralCommission as ReferralCommissionCommission)
        .commission
    })
  }

  return i18n.t('commission:widget:referrer.label.withCommission.rate', {
    ratePercent: (referralCommission as ReferralCommissionRatePercent)
      .ratePercent
  })
}

export default getCommissionDetailedListReferralLabel
