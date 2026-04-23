import { Amount } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React from 'react'
const displayName = 'BillingAmountAdjustment'

interface Props {
  amount?: number
  type: 'credits' | 'debits'
}

export const BillingAmountAdjustment = ({ amount, type }: Props) => {
  const { t: translate } = useTranslation('common')

  if (!amount) {
    return null
  }

  return (
    <>
      <br />
      <span data-testid='BillingAmountAdjustment-Label'>
        {translate(`documents.${type}` as const)}
      </span>
      <Amount
        data-testid='BillingAmountAdjustment-Amount'
        amount={amount}
        invert
      />
    </>
  )
}

BillingAmountAdjustment.displayName = displayName

export default BillingAmountAdjustment
