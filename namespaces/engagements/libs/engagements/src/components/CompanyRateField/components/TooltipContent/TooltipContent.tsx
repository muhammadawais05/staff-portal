import React from 'react'
import { titleize } from '@staff-portal/string'

import { Props as CompanyRateFieldProps } from '../../CompanyRateField'
import { formatTooltipRate } from '../../utils'

export type Props = Omit<CompanyRateFieldProps, 'discountMultiplier'> & {
  discountMultiplier: string
  isDiscountable?: boolean
}

const TooltipContent = ({
  rate,
  isDiscountable,
  discountMultiplier,
  client
}: Props) => {
  const { billingMethod } = client?.preferredBillingOption || {}

  if (!billingMethod) {
    return null
  }
  const tooltipRate = formatTooltipRate({
    rate,
    discountMultiplier
  })

  if (isDiscountable) {
    return (
      <>
        The company will pay a rate of <strong>{tooltipRate}</strong> (3%
        discount) if they use their primary payment method, which is{' '}
        {titleize(billingMethod)}.
      </>
    )
  }

  return (
    <>
      The company has selected {titleize(billingMethod)} as their primary
      payment method. They can receive a 3% discount by switching to ACH or Wire
      and pay a rate of <strong>{tooltipRate}</strong>.
    </>
  )
}

export default TooltipContent
