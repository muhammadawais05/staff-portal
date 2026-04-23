import React from 'react'
import { formatAmount } from '@toptal/picasso/utils'
import i18n from '@staff-portal/billing/src/utils/i18n'
import { Amount } from '@toptal/picasso'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import { isNotNullish } from '@staff-portal/utils'

import { GetPurchaseOrderDetailsNodeFragment } from '../../data/getPurchaseOrderDetails.graphql.types'
import PurchaseOrderPropertyEditor from '../PurchaseOrderPropertyEditor'
import PurchaseOrderDetailsTableCompany from '../PurchaseOrderDetailsTableCompany'
import PurchaseOrderAmount from '../../../../components/PurchaseOrderAmount'

interface GetPurchaseOrderDetailsTableContent {
  purchaseOrder: GetPurchaseOrderDetailsNodeFragment
  handleSetActiveEditor: (name: string) => () => void
  handleUnSetActiveEditor: () => void
  activePropertyEditor?: string
  propertyLoading: boolean
}

const baseKey = 'purchaseOrder:page.details'

export const getTableContentForPurchaseOrderLines = (
  purchaseOrder: GetPurchaseOrderDetailsNodeFragment
) => {
  const { client, draftedAmount, poNumber, shared, totalAmount } = purchaseOrder

  return [
    {
      label: i18n.t(`${baseKey}.company`),
      value: (
        <PurchaseOrderDetailsTableCompany client={client} shared={shared} />
      )
    },
    {
      label: i18n.t(`${baseKey}.draftedTotal`),
      value: formatAmount({ amount: draftedAmount })
    },
    {
      label: i18n.t(`${baseKey}.poNumber`),
      value: `${poNumber}`
    },
    {
      label: i18n.t(`${baseKey}.invoicedTotal`),
      value: <PurchaseOrderAmount purchaseOrder={purchaseOrder} />
    },
    {
      label: i18n.t(`${baseKey}.totalAmount`),
      value: isNotNullish(totalAmount) ? (
        <Amount amount={totalAmount} />
      ) : (
        EMPTY_DATA
      )
    }
  ]
}

const getPurchaseOrderDetailsTableContent = ({
  purchaseOrder,
  activePropertyEditor,
  handleSetActiveEditor,
  handleUnSetActiveEditor,
  propertyLoading
}: GetPurchaseOrderDetailsTableContent) => {
  const {
    client,
    draftedAmount,
    expiryDate,
    id: purchaseOrderId,
    operations,
    poNumber,
    shared,
    threshold,
    totalAmount
  } = purchaseOrder

  return [
    {
      label: i18n.t(`${baseKey}.company`),
      value: (
        <PurchaseOrderDetailsTableCompany client={client} shared={shared} />
      )
    },
    {
      label: i18n.t(`${baseKey}.poNumber`),
      value: `${poNumber}`
    },
    {
      label: i18n.t(`${baseKey}.amount`),
      value: (
        <PurchaseOrderPropertyEditor
          loading={propertyLoading}
          isToggled={activePropertyEditor === 'amount'}
          name='amount'
          onClose={handleUnSetActiveEditor}
          onToggle={handleSetActiveEditor('amount')}
          operation={operations.updatePurchaseOrder}
          purchaseOrderId={purchaseOrderId}
          successMessage={i18n.t(
            'purchaseOrder:mutation.updatePurchaseOrder.notification.amount'
          )}
          type='amount'
          value={totalAmount}
        />
      )
    },
    {
      label: i18n.t(`${baseKey}.threshold`),
      value: (
        <PurchaseOrderPropertyEditor
          disabled={!totalAmount}
          tooltipMessage={
            !totalAmount
              ? i18n.t(
                  'purchaseOrder:createModal.fields.threshold.disabledMessage'
                )
              : undefined
          }
          loading={propertyLoading}
          isToggled={activePropertyEditor === 'threshold'}
          name='threshold'
          onClose={handleUnSetActiveEditor}
          onToggle={handleSetActiveEditor('threshold')}
          operation={operations.updatePurchaseOrder}
          purchaseOrderId={purchaseOrderId}
          successMessage={i18n.t(
            'purchaseOrder:mutation.updatePurchaseOrder.notification.threshold'
          )}
          type='percentage'
          value={threshold}
        />
      )
    },
    {
      label: i18n.t(`${baseKey}.invoicedTotal`),
      value: <PurchaseOrderAmount purchaseOrder={purchaseOrder} />
    },
    {
      label: i18n.t(`${baseKey}.draftedTotal`),
      value: formatAmount({ amount: draftedAmount })
    },
    {
      label: i18n.t(`${baseKey}.expirationDate`),
      value: (
        <PurchaseOrderPropertyEditor
          loading={propertyLoading}
          isToggled={activePropertyEditor === 'expiryDate'}
          name='expiryDate'
          onClose={handleUnSetActiveEditor}
          onToggle={handleSetActiveEditor('expiryDate')}
          operation={operations.updatePurchaseOrder}
          purchaseOrderId={purchaseOrderId}
          successMessage={i18n.t(
            'purchaseOrder:mutation.updatePurchaseOrder.notification.expiryDate'
          )}
          type='date'
          value={expiryDate}
        />
      )
    }
  ]
}

export default getPurchaseOrderDetailsTableContent
