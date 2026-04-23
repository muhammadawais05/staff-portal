import { getReferralRewardsDescription } from './get-referral-rewards-description'

describe('getReferralRewardsDescription', () => {
  it('renders fixed commission', () => {
    expect(
      getReferralRewardsDescription({
        companySourcingCommission: {
          commission: '2000'
        },
        talentSourcingCommission: {
          commission: '4000'
        }
      })
    ).toBe(
      "As soon as your referrals are working, you'll start receiving commissions: $2,000.00 per client, $4,000.00 per freelancer."
    )
  })

  it('renders relative commission', () => {
    expect(
      getReferralRewardsDescription({
        companySourcingCommission: {
          ratePercent: '2.5'
        },
        talentSourcingCommission: {
          ratePercent: '1.5'
        }
      })
    ).toBe(
      "As soon as your referrals are working, you'll start receiving commissions: 2.5% from client engagements, 1.5% from freelancer engagements."
    )
  })
})
