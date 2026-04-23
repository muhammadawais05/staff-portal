import React from 'react'
import { Container, Info16, Tooltip, Typography } from '@toptal/picasso'
import SvgArrowLongRight16 from '@toptal/picasso/Icon/ArrowLongRight16'

import { DetailsStepPaymentsTalentFragment } from '../../../../data/get-details-step-data'
import { getFormattedRate } from './utils'

type Props = {
  mostRecentEngageableApplication?: {
    baseHourlyRate?: string | null
    requestedHourlyRate?: string | null
  }
  talent: DetailsStepPaymentsTalentFragment
}

const PaymentsRateTableHourlyTooltip = ({
  mostRecentEngageableApplication,
  talent
}: Props) => {
  const { requestedHourlyRate } = mostRecentEngageableApplication || {}
  const baseHourlyRate =
    mostRecentEngageableApplication?.baseHourlyRate || talent.hourlyRate

  if (
    !baseHourlyRate ||
    !requestedHourlyRate ||
    baseHourlyRate === requestedHourlyRate
  ) {
    return null
  }
  const talentDefaultClientHourlyRate =
    Number(talent.defaultClientRates?.hourlyRate) ?? 0
  const talentDefaultClientPartTimeRate = Number(
    talent.defaultClientRates?.weeklyRatePartTime ?? 0
  )
  const talentDefaultClientFullTimeRate = Number(
    talent.defaultClientRates?.weeklyRateFullTime ?? 0
  )

  if (
    // if any of rates equals '0' do not render tooltip
    [
      talentDefaultClientHourlyRate,
      talentDefaultClientPartTimeRate,
      talentDefaultClientFullTimeRate
    ].includes(0)
  ) {
    return null
  }

  const talentDefaultClientHourlyFormattedRate = getFormattedRate({
    rate: talentDefaultClientHourlyRate,
    suffix: 'h'
  })
  const talentDefaultClientPartTimeFormattedRate = getFormattedRate({
    rate: talentDefaultClientPartTimeRate,
    suffix: 'week'
  })
  const talentDefaultClientFullTimeFormattedRate = getFormattedRate({
    rate: talentDefaultClientFullTimeRate,
    suffix: 'week'
  })
  const baseHourlyFormattedRate = getFormattedRate({
    rate: Number(baseHourlyRate),
    suffix: 'hr'
  })
  const requestedHourlyFormattedRate = getFormattedRate({
    rate: Number(requestedHourlyRate),
    suffix: 'hr'
  })

  return (
    <Tooltip
      content={
        <>
          <Typography>Company Rates</Typography>
          <Container>
            <Typography as='span' weight='semibold'>
              Hourly:
            </Typography>{' '}
            {talentDefaultClientHourlyFormattedRate}
          </Container>

          <Container>
            <Typography as='span' weight='semibold'>
              Part-time:
            </Typography>{' '}
            {talentDefaultClientPartTimeFormattedRate}
          </Container>

          <Container>
            <Typography as='span' weight='semibold'>
              Full-time:
            </Typography>{' '}
            {talentDefaultClientFullTimeFormattedRate}
          </Container>

          <Container top='xsmall'>
            <Typography>Talent updated their rate for this job:</Typography>
            <Typography weight='semibold'>
              <Typography as='span' weight='inherit' lineThrough>
                {baseHourlyFormattedRate}
              </Typography>{' '}
              <SvgArrowLongRight16 />{' '}
              <Typography as='span' weight='inherit'>
                {requestedHourlyFormattedRate}
              </Typography>
            </Typography>
          </Container>
        </>
      }
      placement='top'
      interactive
    >
      <Container as='span' left='xsmall' flex>
        <Info16 />
      </Container>
    </Tooltip>
  )
}

export default PaymentsRateTableHourlyTooltip
