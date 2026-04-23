import { Form, useFormState, useForm } from '@toptal/picasso-forms'
import React, { useMemo } from 'react'
import { useFormStateHandlerForPOLines } from '@staff-portal/billing'
import { NOT_SELECTED_OPTION } from '@staff-portal/config'

import { GetEditPurchaseOrderDataQuery } from '../../data'
import {
  getSelectablePurchaseOrderOption,
  getSelectablePurchaseOrderLineOption
} from '../../utils'

export type Props = {
  data?: GetEditPurchaseOrderDataQuery
}

const PurchaseOrderEditFormSelectFields = ({ data }: Props) => {
  const { values } = useFormState()
  const { change } = useForm()

  const selectedPurchaseOrderId = values?.purchaseOrderId ?? ''
  const initialPurchaseOrderId =
    data?.node?.purchaseOrderLine?.purchaseOrder?.id
  const purchaseOrderLineId = data?.node?.purchaseOrderLine?.id
  const purchaseOrdersNullable = data?.node?.selectablePurchaseOrders?.nodes

  const purchaseOrders = useMemo(() => {
    const result =
      purchaseOrdersNullable?.map(order =>
        getSelectablePurchaseOrderOption({
          order,
          currentOrderId: initialPurchaseOrderId
        })
      ) ?? []

    return [NOT_SELECTED_OPTION, ...result]
  }, [initialPurchaseOrderId, purchaseOrdersNullable])

  const purchaseOrderLines = useMemo(() => {
    const result =
      // display only related po lines with our selected purchase order
      purchaseOrdersNullable?.find(
        ({ id: poLineId }) => poLineId === selectedPurchaseOrderId
      )?.purchaseOrderLines?.nodes ?? []

    return [
      NOT_SELECTED_OPTION,
      // eslint-disable-next-line no-unsafe-optional-chaining
      ...result?.map(order =>
        getSelectablePurchaseOrderLineOption({
          order,
          currentOrderId: purchaseOrderLineId
        })
      )
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPurchaseOrderId])

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
        label='Purchase Order Number'
        name='purchaseOrderId'
        options={purchaseOrders}
        data-testid='purchase-order-edit-modal-orders'
      />
      {visiblePurchaseOrderLines && (
        <Form.Select
          autoFocus
          label='Line Number'
          required
          name='purchaseOrderLineId'
          options={purchaseOrderLines}
          data-testid='purchase-order-line-edit-modal-orders'
        />
      )}
    </>
  )
}

export default PurchaseOrderEditFormSelectFields
