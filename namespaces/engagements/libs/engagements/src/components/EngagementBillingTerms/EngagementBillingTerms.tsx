import { Typography } from '@toptal/picasso'
import React from 'react'
import { BillCycle } from '@staff-portal/graphql/staff'
import { titleize, dasherize } from '@staff-portal/string'

type Props = {
  billCycle: BillCycle
  netTerms?: number
}

const EngagementBillingTerms = ({ billCycle, netTerms }: Props) => {
  return <Typography size='medium'>
    {`${titleize(dasherize(billCycle))}, ${
      netTerms === 0 ? 'Upon Receipt' : `Net ${netTerms}`
    }`}
  </Typography>
}

export default EngagementBillingTerms
