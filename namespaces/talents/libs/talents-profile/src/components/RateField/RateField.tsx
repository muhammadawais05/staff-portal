import React from 'react'
import { Typography, Tooltip, Container, Info16 } from '@toptal/picasso'
import { formatAmount } from '@toptal/picasso/utils'
import { NO_VALUE } from '@staff-portal/config'
import { getRoleTypeText } from '@staff-portal/facilities'

import { TalentProfileGeneralDataFragment } from '../TalentGeneralSection/data/get-talent-profile-general-data'

export type Props = Pick<
  TalentProfileGeneralDataFragment,
  'weeklyRate' | 'hourlyRate' | 'type' | 'rateRecommendation'
> & { rateRecommendationUnauthorized?: boolean }

export const RateField = ({
  weeklyRate,
  hourlyRate,
  type,
  rateRecommendation,
  rateRecommendationUnauthorized
}: Props) => {
  const rateText =
    weeklyRate && hourlyRate ? (
      <>
        {formatAmount({ amount: weeklyRate })}/week,{' '}
        {formatAmount({ amount: hourlyRate })}/h
      </>
    ) : (
      <>{NO_VALUE}</>
    )

  const tooltipContent = rateRecommendation ? (
    <>
      Average rate for {getRoleTypeText(type)}s in this region:
      <br />
      <Typography color='inherit' weight='semibold'>
        {formatAmount({ amount: rateRecommendation.meanWeek })}/week,{' '}
        {formatAmount({ amount: rateRecommendation.meanHour })}/hour
        <br />
        (Average determined by the rates of {rateRecommendation.quantity} active
        freelancers)
      </Typography>
    </>
  ) : (
    "Can't calculate average rate for this region."
  )

  return rateRecommendationUnauthorized ? (
    rateText
  ) : (
    <Container flex as='span' alignItems='center' inline>
      {rateText}
      <Tooltip content={tooltipContent}>
        <Container flex left='xsmall'>
          <Info16 data-testid='info-icon' />
        </Container>
      </Tooltip>
    </Container>
  )
}

export default RateField
