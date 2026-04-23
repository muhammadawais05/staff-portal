import React, { memo } from 'react'

import { GetBillingStatsWidgetQuery } from '../../data/getBillingStatsWidget.graphql.types'
import { getTransformedTotals } from '../../utils'
import { invoiceTotalSortOrder } from '../../../../../invoice/utils'
import { paymentTotalSortOrder } from '../../../../../payment/utils'
import ListTotals from '../../../../../commercialDocument/components/ListTotals'
import PaymentMethodTotals from '../../../../../payment/components/PaymentMethodTotals'

const displayName = 'BillingStatsWidgetContent'

interface Props {
  data?: GetBillingStatsWidgetQuery
}

export const BillingStatsWidgetContent = ({ data }: Props) => {
  if (!data?.widgets?.billingStats) {
    return null
  }

  const { invoicesTotals, paymentsTotals, billingMethods } =
    data.widgets.billingStats
  const invoiceTotals = getTransformedTotals(invoicesTotals)
  const paymentTotals = getTransformedTotals(paymentsTotals)

  return (
    <>
      <ListTotals
        containerTopSpacing='large'
        totals={invoiceTotals}
        sortOrder={invoiceTotalSortOrder}
      />
      <ListTotals
        containerTopSpacing='large'
        totals={paymentTotals}
        sortOrder={paymentTotalSortOrder}
      />
      <PaymentMethodTotals billingMethods={billingMethods} />
    </>
  )
}

BillingStatsWidgetContent.displayName = displayName

export default memo(BillingStatsWidgetContent)
