import React from 'react'
import { Typography } from '@toptal/picasso'
import { formatAmount } from '@toptal/picasso/utils'
import { getRoleTypeText } from '@staff-portal/facilities'

import { RateChangeRequestFragment } from '../../data/rate-change-request-fragment'

interface RateFieldTooltipProps {
  talentType: string
  rateRecommendation: Present<
    Present<RateChangeRequestFragment['talent']>['rateRecommendation']
  >
}

const RateFieldTooltip = ({
  talentType,
  rateRecommendation
}: RateFieldTooltipProps) => (
  <Typography as='span' color='inherit'>
    Average rate for {getRoleTypeText(talentType)}s in this region is{' '}
    <Typography as='span' inline color='inherit' weight='semibold'>
      {formatAmount({ amount: rateRecommendation.meanWeek })}/week,{' '}
      {formatAmount({ amount: rateRecommendation.meanHour })}/hour
    </Typography>
    . Average determined by the rates of{' '}
    <Typography as='span' inline color='inherit' weight='semibold'>
      {rateRecommendation.quantity}
    </Typography>{' '}
    active freelancers.
  </Typography>
)

export default RateFieldTooltip
