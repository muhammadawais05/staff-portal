import { formatAmount } from '@toptal/picasso/utils'
import { ReferralsWidget } from '@staff-portal/graphql/staff'

const getCompanyCommission = (
  companySourcingCommission: ReferralsWidget['companySourcingCommission']
) => {
  if (!companySourcingCommission) {
    return ''
  }

  if ('commission' in companySourcingCommission) {
    const commission = formatAmount({
      amount: companySourcingCommission.commission ?? 0
    })

    return `${commission} per client`
  }

  return `${companySourcingCommission.ratePercent}% from client engagements`
}

const getTalentCommission = (
  talentSourcingCommission: ReferralsWidget['talentSourcingCommission']
) => {
  if (!talentSourcingCommission) {
    return ''
  }

  if ('commission' in talentSourcingCommission) {
    const commission = formatAmount({
      amount: talentSourcingCommission.commission ?? 0
    })

    return `${commission} per freelancer`
  }

  return `${talentSourcingCommission.ratePercent}% from freelancer engagements`
}

export const getReferralRewardsDescription = ({
  companySourcingCommission,
  talentSourcingCommission
}: Pick<
  ReferralsWidget,
  'companySourcingCommission' | 'talentSourcingCommission'
>) => {
  const companyCommissionText = getCompanyCommission(companySourcingCommission)
  const talentCommissionText = getTalentCommission(talentSourcingCommission)
  const description = [companyCommissionText, talentCommissionText].join(', ')

  return `As soon as your referrals are working, you'll start receiving commissions: ${description}.`
}
