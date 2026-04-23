import { Typography, TypographyProps } from '@toptal/picasso'
import { formatAmount } from '@toptal/picasso/utils'
import React from 'react'
import {
  CommitmentRate,
  CommitmentRateAvailability,
  Maybe,
  CommitmentRateHourlyHint
} from '@staff-portal/graphql/staff'
import { HourlyRateField } from '@staff-portal/facilities'

import { HOUR_SUFFIX, WEEK_SUFFIX } from '../../constants'

type Rate = Pick<CommitmentRate, 'availability' | 'value'> & {
  hourlyHint?: Maybe<Pick<CommitmentRateHourlyHint, 'value'>>
}

export type Props = TypographyProps & {
  rate?: Rate
  withHourlyRate?: boolean
}

const GenericRateField = ({
  rate,
  withHourlyRate = false,
  size = 'medium',
  weight = 'semibold',
  'data-testid': dataTestId = 'generic-rate-field',
  ...restProps
}: Props) => {
  if (!rate) {
    return null
  }

  const value = rate?.value
  const availability = rate?.availability
  const hourlyHint = rate?.hourlyHint

  const suffix =
    availability === CommitmentRateAvailability.WEEK ? WEEK_SUFFIX : HOUR_SUFFIX

  return (
    <Typography
      inline
      as='span'
      size={size}
      weight={weight}
      data-testid={dataTestId}
      {...restProps}
    >
      {value && `${formatAmount({ amount: value })}${suffix} `}
      {withHourlyRate && hourlyHint?.value && (
        <Typography inline as='span'>
          (<HourlyRateField hourlyRate={hourlyHint.value} />)
        </Typography>
      )}
    </Typography>
  )
}

export default GenericRateField
