import { Container, Grid } from '@toptal/picasso'
import { formatAmount } from '@toptal/picasso/utils'
import React from 'react'
import { Engagement } from '@staff-portal/graphql/staff'

import JobCardTalentDetailsItem from '../JobCardTalentDetailsItem/JobCardTalentDetailsItem'

export interface Props {
  engagement: Engagement
}

const calculateMarginAndProfit = (
  talentHourlyRateText?: number | null,
  companyHourlyRateText?: number | null
) => {
  if (talentHourlyRateText && companyHourlyRateText) {
    const grossProfit = companyHourlyRateText - talentHourlyRateText

    return {
      grossProfit,
      grossMargin: (grossProfit / companyHourlyRateText) * 100
    }
  }

  return {
    grossProfit: null,
    grossMargin: null
  }
}

const getRates = (engagement: Engagement) => ({
  talentHourlyRate: engagement.talentHourlyRate
    ? parseFloat(engagement.talentHourlyRate)
    : null,
  companyHourlyRate: engagement.companyHourlyRate
    ? parseFloat(engagement.companyHourlyRate)
    : null
})

const JobCardTalentItemContent = ({ engagement }: Props) => {
  const { talentHourlyRate, companyHourlyRate } = getRates(engagement)
  const { grossProfit, grossMargin } = calculateMarginAndProfit(
    talentHourlyRate,
    companyHourlyRate
  )

  return (
    <Container top={1}>
      <Grid spacing={16}>
        {talentHourlyRate ? (
          <Grid.Item small={6}>
            <JobCardTalentDetailsItem
              leftContent='Talent rate'
              rightContent={`${formatAmount({
                amount: talentHourlyRate
              })} per hour`}
            />
          </Grid.Item>
        ) : null}
        {companyHourlyRate ? (
          <Grid.Item small={6}>
            <JobCardTalentDetailsItem
              leftContent='Company rate'
              rightContent={`${formatAmount({
                amount: companyHourlyRate
              })} per hour`}
            />
          </Grid.Item>
        ) : null}
        {grossMargin ? (
          <Grid.Item small={6}>
            <JobCardTalentDetailsItem
              leftContent='Gross Margin'
              rightContent={`${grossMargin.toFixed(0)}%`}
            />
          </Grid.Item>
        ) : null}
        {grossProfit ? (
          <Grid.Item small={6}>
            <JobCardTalentDetailsItem
              leftContent='Gross Profit'
              rightContent={formatAmount({ amount: grossProfit })}
            />
          </Grid.Item>
        ) : null}
      </Grid>
    </Container>
  )
}

export default JobCardTalentItemContent
