import { Exclamation16, QuestionMark16 } from '@toptal/picasso'
import React from 'react'

import { Props as CompanyRateFieldProps } from '../CompanyRateField'
import { TooltipContent } from '../components'

export type Props = CompanyRateFieldProps

export const getTooltipData = (props: Props) => {
  if (!props.canBeDiscounted || !props.discountMultiplier) {
    return null
  }

  const isDiscountable = props.client?.preferredBillingOption?.discountable

  if (isDiscountable) {
    return {
      icon: <QuestionMark16 />,
      content: (
        <TooltipContent
          isDiscountable
          {...props}
          discountMultiplier={props.discountMultiplier}
        />
      )
    }
  }

  return {
    icon: <Exclamation16 />,
    content: (
      <TooltipContent
        {...props}
        discountMultiplier={props.discountMultiplier}
      />
    )
  }
}
