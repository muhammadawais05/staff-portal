import React from 'react'
import { useField } from '@toptal/picasso-forms'
import { Typography, Container, ReferralBonus16 } from '@toptal/picasso'
import { EngagementCommitmentEnum, Maybe } from '@staff-portal/graphql/staff'
import { MAX_INT_LENGTH } from '@staff-portal/config'
import { DecimalNumberInput } from '@staff-portal/forms'
import { normalizeCurrencyAmount } from '@staff-portal/utils'

const discountRate = 0.03
const discountRatePercentage = discountRate * 100

const CompanyRateLabelMapping: Record<EngagementCommitmentEnum, string> = {
  [EngagementCommitmentEnum.HOURLY]:
    'How much will you be charging the company per hour?',
  [EngagementCommitmentEnum.PART_TIME]:
    'How much will you be charging the company part-time per week?',
  [EngagementCommitmentEnum.FULL_TIME]:
    'How much will you be charging the company per week?'
}

type Props = {
  commitment?: Maybe<EngagementCommitmentEnum>
  'data-testid'?: string
}

const CompanyRateField = ({ commitment, 'data-testid': dataTestId }: Props) => {
  const {
    input: { value: companyRate }
  } = useField<string>('companyRate')

  if (!commitment) {
    return null
  }

  const companyRateNormalized = normalizeCurrencyAmount(companyRate)
  const discountedCompanyRateNormalized = normalizeCurrencyAmount(
    Number(companyRateNormalized) * (1 - discountRate)
  )

  return (
    <>
      <DecimalNumberInput
        required
        width='full'
        name='companyRate'
        label={CompanyRateLabelMapping[commitment]}
        data-testid={dataTestId || 'CompanyRateField-rate'}
        maxLength={MAX_INT_LENGTH}
        icon={<ReferralBonus16 />}
      />

      {companyRate && (
        <Container top='xsmall' bottom='small'>
          <Typography
            color='red'
            size='xsmall'
            data-testid='CompanyRateField-discount'
          >
            Companies that pay with ACH or Wire will receive a{' '}
            {discountRatePercentage}% discount and pay $
            {discountedCompanyRateNormalized}. Companies that pay via Credit
            Card or PayPal will pay the full amount of ${companyRateNormalized}.
          </Typography>
        </Container>
      )}
    </>
  )
}

export default CompanyRateField
