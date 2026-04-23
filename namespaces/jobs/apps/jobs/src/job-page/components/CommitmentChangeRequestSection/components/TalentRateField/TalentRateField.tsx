import React from 'react'
import { ReferralBonus16 } from '@toptal/picasso'
import { EngagementCommitmentEnum, Maybe } from '@staff-portal/graphql/staff'
import { MAX_INT_LENGTH } from '@staff-portal/config'
import { DecimalNumberInput } from '@staff-portal/forms'

const TalentRateLabelMapping: Record<EngagementCommitmentEnum, string> = {
  [EngagementCommitmentEnum.HOURLY]:
    'How much will you be paying the talent per hour?',
  [EngagementCommitmentEnum.PART_TIME]:
    'How much will you be paying the talent part-time per week?',
  [EngagementCommitmentEnum.FULL_TIME]:
    'How much will you be paying the talent per week?'
}

type Props = {
  commitment?: Maybe<EngagementCommitmentEnum>
  'data-testid'?: string
}

const TalentRateField = ({ commitment, 'data-testid': dataTestId }: Props) => {
  if (!commitment) {
    return null
  }

  return (
    <DecimalNumberInput
      required
      width='full'
      name='talentRate'
      label={TalentRateLabelMapping[commitment]}
      data-testid={dataTestId || 'TalentRateField-rate'}
      maxLength={MAX_INT_LENGTH}
      icon={<ReferralBonus16 />}
    />
  )
}

export default TalentRateField
