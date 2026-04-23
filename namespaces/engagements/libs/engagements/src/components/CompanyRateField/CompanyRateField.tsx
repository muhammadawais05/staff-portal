import React, { ComponentProps } from 'react'
import { BillingMethodName, Maybe } from '@staff-portal/graphql/staff'
import { FieldWithTooltipOverIcon } from '@staff-portal/ui'

import GenericRateField from '../GenericRateField'
import { getTooltipData } from './utils'

export type Props = ComponentProps<typeof GenericRateField> & {
  canBeDiscounted?: boolean
  discountMultiplier?: Maybe<string>
  client?: Maybe<{
    preferredBillingOption?: Maybe<{
      billingMethod: BillingMethodName
      discountable: boolean
    }>
  }>
}

const CompanyRateField = ({
  rate,
  canBeDiscounted,
  discountMultiplier,
  client,
  withHourlyRate = false
}: Props) => {
  if (!rate) {
    return null
  }

  const tooltipData = getTooltipData({
    rate,
    canBeDiscounted,
    discountMultiplier,
    client
  })

  const color =
    canBeDiscounted && client?.preferredBillingOption?.discountable === false
      ? 'red'
      : undefined

  return (
    <FieldWithTooltipOverIcon
      data-testid='CompanyRateField'
      tooltip={tooltipData?.content}
      icon={tooltipData?.icon}
    >
      <GenericRateField
        rate={rate}
        color={color}
        withHourlyRate={withHourlyRate}
      />
    </FieldWithTooltipOverIcon>
  )
}

export default CompanyRateField
