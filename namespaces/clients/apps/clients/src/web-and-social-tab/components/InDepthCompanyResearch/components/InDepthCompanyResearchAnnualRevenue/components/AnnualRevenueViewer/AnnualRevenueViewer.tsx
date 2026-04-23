import React from 'react'
import { Amount } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'

import { GetInDepthCompanyResearchClientFragment } from '../../../../../../data'

type Props = { value: GetInDepthCompanyResearchClientFragment['annualRevenue'] }

const AnnualRevenueViewer = ({ value }: Props) => {
  // Address this once working on SPB-2225
  return value ? <Amount amount={value} weight='semibold' /> : <>{NO_VALUE}</>
}

export default AnnualRevenueViewer
