import { Typography } from '@toptal/picasso'
import React from 'react'
import { CommercialDocument } from '@staff-portal/graphql/staff'

import BillingAmountAdjustment from '../BillingAmountAdjustment'

const displayName = 'BillingAmountAdjustments'

interface Props {
  document: Pick<CommercialDocument, 'creditedAmount' | 'debitedAmount'>
}

export const BillingAmountAdjustments = ({
  document: { creditedAmount, debitedAmount }
}: Props) => {
  return (
    <Typography invert key='c2' as='span'>
      <BillingAmountAdjustment type='credits' amount={Number(creditedAmount)} />
      <BillingAmountAdjustment type='debits' amount={Number(debitedAmount)} />
    </Typography>
  )
}

BillingAmountAdjustments.displayName = displayName

export default BillingAmountAdjustments
