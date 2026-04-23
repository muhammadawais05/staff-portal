import React from 'react'
import { SelectProps } from '@toptal/picasso'
import { Form, useFormState, useForm } from '@toptal/picasso-forms'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'

import { useGetPurchaseOrderFormState } from '../../utils'
import { GetPurchaseOrdersOptionsQuery } from '../../data/getPurchaseOrdersOptions.graphql.types'

interface Props {
  currentPOid?: string
  data: NonNullable<
    GetPurchaseOrdersOptionsQuery['node']
  >['client']['purchaseOrdersNullable']
  width?: SelectProps['width']
  poPlaceholder: string
  poLabel: string
  poLinePlaceholder: string
  poLineLabel: string
  loading?: boolean
}

const PurchaseOrderLineSelect = ({
  currentPOid,
  data,
  width,
  poLabel,
  poLineLabel,
  poPlaceholder,
  poLinePlaceholder,
  loading
}: Props) => {
  const { modalContainer } = useExternalIntegratorContext()
  const { change } = useForm()
  const { values } = useFormState()

  const { purchaseOrderLines, purchaseOrders, visiblePurchaseOrderLines } =
    useGetPurchaseOrderFormState({
      currentPOid,
      values,
      change,
      data
    })

  return (
    <>
      <Form.Select
        autoFocus={false}
        data-testid='purchase-order'
        placeholder={poPlaceholder}
        label={poLabel}
        enableReset
        name='purchaseOrderId'
        options={purchaseOrders}
        popperContainer={modalContainer}
        searchThreshold={0}
        width={width}
        loading={loading}
        disabled={loading}
      />
      {visiblePurchaseOrderLines && (
        <Form.Select
          autoFocus={false}
          data-testid='purchase-order-line'
          placeholder={poLinePlaceholder}
          label={poLineLabel}
          enableReset
          name='purchaseOrderLineId'
          options={purchaseOrderLines}
          popperContainer={modalContainer}
          searchThreshold={0}
          width={width}
        />
      )}
    </>
  )
}

export default PurchaseOrderLineSelect
