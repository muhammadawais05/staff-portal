import React from 'react'
import {
  Container,
  Typography,
  Tooltip,
  TypographyOverflow
} from '@toptal/picasso'
import { QuestionMark16 } from '@toptal/picasso/Icon'
import { formatAmount } from '@toptal/picasso/utils'
import { NO_VALUE } from '@staff-portal/config'

import * as S from './styles'

interface ListItemProps {
  label: string
  value: number | string
}

const ListItem = ({ label, value }: ListItemProps) => {
  return (
    <Typography>
      <Typography as='span' weight='semibold'>
        {label}:{' '}
      </Typography>
      {value}
    </Typography>
  )
}

export interface Props {
  requestedHourlyRate?: string | null
  talentHourlyRate?: string | null
  clientRates?: {
    hourlyRate?: string
    weeklyRateFullTime?: string
    weeklyRatePartTime?: string
  } | null
}

// eslint-disable-next-line complexity
const TalentRateField = ({
  talentHourlyRate,
  requestedHourlyRate,
  clientRates
}: Props) => {
  const displayComparison =
    requestedHourlyRate && requestedHourlyRate !== talentHourlyRate

  const displayValue = requestedHourlyRate || talentHourlyRate

  const tooltipContent = (
    <Container css={S.tooltipContent}>
      <Typography>Company Rates</Typography>

      <ListItem
        label='Hourly'
        value={
          clientRates?.hourlyRate
            ? `${formatAmount({ amount: clientRates?.hourlyRate })}/h`
            : NO_VALUE
        }
      />
      <ListItem
        label='Part-time'
        value={
          clientRates?.weeklyRatePartTime
            ? `${formatAmount({
                amount: clientRates?.weeklyRatePartTime
              })}/week`
            : NO_VALUE
        }
      />
      <ListItem
        label='Full-time'
        value={
          clientRates?.weeklyRateFullTime
            ? `${formatAmount({
                amount: clientRates?.weeklyRateFullTime
              })}/week`
            : NO_VALUE
        }
      />
      {displayComparison && (
        <Container top='small'>
          <Typography>
            Talent updated their rate for this job:{' '}
            <Typography as='span' weight='semibold' lineThrough>
              {formatAmount({ amount: talentHourlyRate as string })}/h
            </Typography>{' '}
            →{' '}
            <Typography as='span' weight='semibold'>
              {formatAmount({ amount: requestedHourlyRate as string })}/h
            </Typography>
          </Typography>
        </Container>
      )}
    </Container>
  )

  return (
    <Container flex alignItems='center'>
      {displayValue ? (
        <>
          <TypographyOverflow as='span' weight='semibold'>
            {formatAmount({ amount: displayValue })}/h{' '}
          </TypographyOverflow>
          <Tooltip interactive content={tooltipContent}>
            <Container flex left='xsmall' inline>
              <QuestionMark16 data-testid='hourly-rate-tooltip' />
            </Container>
          </Tooltip>
        </>
      ) : (
        NO_VALUE
      )}
    </Container>
  )
}

export default TalentRateField
