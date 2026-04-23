import { useTranslation } from 'react-i18next'
import { Form, useForm, useFormState } from '@toptal/picasso-forms'
import React from 'react'
import { useFormStateHandlerForPOLines } from '@staff-portal/billing/src/_lib/customHooks/purchase-order'

import { GetPurchaseOrderLinesForInvoiceQuery } from '../../../../data/getPurchaseOrderLinesForInvoice.graphql.types'
import {
  mapPurchaseOrdersToSelectOptions,
  PurchaseOrders
} from '../../../../utils/map-purchase-orders-to-select-options'

export interface Props {
  invoice: Exclude<
    GetPurchaseOrderLinesForInvoiceQuery['node'],
    null | undefined
  >
}

const PurchaseOrderFields = ({ invoice }: Props) => {
  const { t: translate } = useTranslation('invoice')

  const { change } = useForm()
  const { values } = useFormState()

  const { purchaseOrderLine, purchaseOrder, job } = invoice
  const initialPurchaseOrderId =
    purchaseOrderLine?.purchaseOrder?.id ?? purchaseOrder?.id

  const currentJobPurchaseOrderLineId = job?.purchaseOrderLine?.id
  const nextJobNextPurchaseOrderLineId = job?.nextPurchaseOrderLine?.id
  const purchaseOrdersNullable =
    invoice?.subjectObject?.purchaseOrdersNullable?.nodes

  const purchaseOrders = mapPurchaseOrdersToSelectOptions(
    purchaseOrdersNullable as PurchaseOrders
  )

  const purchaseOrderLines = mapPurchaseOrdersToSelectOptions(
    purchaseOrdersNullable?.find(({ id }) => values?.purchaseOrderId === id)
      ?.purchaseOrderLines?.nodes as PurchaseOrders,
    currentJobPurchaseOrderLineId,
    nextJobNextPurchaseOrderLineId
  )

  const { visiblePurchaseOrderLines } = useFormStateHandlerForPOLines({
    values,
    change,
    initialPurchaseOrderId,
    purchaseOrderLines
  })

  return (
    <>
      <Form.Select
        autoFocus
        label={translate('assignPurchaseOrderModal.fields.purchaseOrder.label')}
        name='purchaseOrderId'
        options={purchaseOrders}
        enableReset
        data-testid='purchase-order-edit-select'
      />

      {visiblePurchaseOrderLines && (
        <Form.Select
          autoFocus
          label={translate('assignPurchaseOrderModal.fields.lineNumber.label')}
          name='purchaseOrderLineId'
          enableReset
          options={purchaseOrderLines}
          data-testid='purchase-order-line-select'
        />
      )}
    </>
  )
}

export default PurchaseOrderFields
