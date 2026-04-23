import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { Typography } from '@toptal/picasso'
import { InvoiceKind } from '@staff-portal/graphql/staff'
import * as OperationsHelper from '@staff-portal/billing/src/_lib/helpers/operations'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import { PurchaseOrderFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/purchaseOrderFragment.graphql.types'

import PurchaseOrderAssignment from '../PurchaseOrderAssignment'
import {
  InvoiceDetailsPurchaseOrderFragment,
  JobReasonFragment
} from '../../../InvoiceDetailsTable/data/getInvoiceDetailsTable.graphql.types'
interface Props {
  invoice: InvoiceDetailsPurchaseOrderFragment
}

const displayName = 'InvoiceUpdatePurchaseOrder'

export const InvoiceUpdatePurchaseOrder = ({
  invoice: {
    amountWithCorrections,
    balanceDue,
    exceedsPurchaseOrderBalance,
    id,
    invoiceKind,
    job,
    operations,
    purchaseOrder,
    reason,
    subjectObject
  }
}: Props) => {
  const { t: translate } = useTranslation('invoice')

  const poNumber = purchaseOrder?.poNumber || ''
  const budgetLeft = purchaseOrder?.budgetLeft || '0.0'
  const isConsolidatedInvoice = invoiceKind === InvoiceKind.CONSOLIDATED
  const exceededNumber = Number(balanceDue) - Number(budgetLeft)
  const displayOverbillingWarning =
    exceedsPurchaseOrderBalance && exceededNumber > 0

  const purchaseOrders: PurchaseOrderFragment[] =
    subjectObject?.purchaseOrdersNullable?.nodes || []
  const isAssignPurchaseOrdersEnabled = OperationsHelper.isOperationEnabled({
    key: 'assignPurchaseOrder',
    operations
  })

  return (
    <>
      {!isConsolidatedInvoice && (
        <PurchaseOrderAssignment
          amountWithCorrections={Number(amountWithCorrections)}
          currentPurchaseOrderId={
            reason?.purchaseOrder?.id || job?.purchaseOrder?.id
          }
          nextPurchaseOrderId={
            (reason as JobReasonFragment)?.nextPurchaseOrder?.id ||
            job?.nextPurchaseOrder?.id
          }
          selectedPurchaseOrder={purchaseOrder}
          invoiceId={id}
          isDisabled={!isAssignPurchaseOrdersEnabled}
          label={isConsolidatedInvoice ? EMPTY_DATA : ''}
          purchaseOrders={purchaseOrders}
        />
      )}
      {displayOverbillingWarning && (
        <Typography data-testid='overbilling-warning' color='red' size='medium'>
          {translate('invoiceDetails.overbilling', {
            exceeded: exceededNumber,
            poNumber
          })}
        </Typography>
      )}
    </>
  )
}

InvoiceUpdatePurchaseOrder.displayName = displayName

export default memo(InvoiceUpdatePurchaseOrder)
