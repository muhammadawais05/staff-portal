import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'

import {
  getCompanyNegotiationStatusColor,
  getCompanyNegotiationStatusText
} from './utils'
import { CompanyOverviewFragment } from '../AccountOverviewSection/data/company-overview-fragment.staff.gql.types'

interface Props {
  value?: Partial<CompanyOverviewFragment['currentNegotiation']>
}

const testId = 'CompanyNegotiationStatus'

export const CompanyNegotiationStatus = ({ value }: Props) => {
  const color = getCompanyNegotiationStatusColor(value?.status)
  const text = getCompanyNegotiationStatusText(value)

  return (
    <TypographyOverflow
      as='span'
      color={color}
      weight='semibold'
      data-testid={testId}
    >
      {text}
    </TypographyOverflow>
  )
}
