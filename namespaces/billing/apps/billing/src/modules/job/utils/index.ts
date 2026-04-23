import { Option } from '@toptal/picasso/Select/types'
import { formatAmount } from '@toptal/picasso/utils'
import {
  isCurrentDay,
  isFutureDate
} from '@staff-portal/billing/src/_lib/dateTime/helper'
import { decodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import i18n from '@staff-portal/billing/src/utils/i18n'
import { PurchaseOrderFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/purchaseOrderFragment.graphql.types'

interface PurchaseOrdersEditorSelectFormat {
  amountWithCorrections?: number
  currentPurchaseOrderId?: string
  nextPurchaseOrderId?: string
  purchaseOrders?: PurchaseOrderFragment[]
  selectedPurchaseOrderId?: string
}

export type PurchaseOrderLinesSelect = Record<string, Option[]>

type PurchaseOrder = {
  id: string
  purchaseOrderLines: {
    nodes: {
      id: string
      poLineNumber: string
    }[]
  }
}

export const getSelectFormatPurchaseOrdersForEditor = ({
  amountWithCorrections,
  currentPurchaseOrderId,
  nextPurchaseOrderId,
  purchaseOrders = [],
  selectedPurchaseOrderId
}: PurchaseOrdersEditorSelectFormat) => {
  const i18nKey = 'invoice:invoiceDetails.purchaseOrdersEditor'

  const emptyValue = [
    {
      text: i18n.t(`${i18nKey}.notSelected`),
      value: ''
    }
  ]

  if (!purchaseOrders.length) {
    return emptyValue
  }

  const unexpiredPurchaseOrders = purchaseOrders.filter(
    ({ expiryDate }) =>
      !expiryDate || isCurrentDay(expiryDate) || isFutureDate(expiryDate)
  )

  const budgetedPurchaseOrders =
    amountWithCorrections === 0
      ? unexpiredPurchaseOrders
      : unexpiredPurchaseOrders.filter(
          ({ id, budgetSpent }) =>
            selectedPurchaseOrderId === id || !budgetSpent
        )
  const options = budgetedPurchaseOrders.map(
    ({ budgetLeft = '', id, poNumber }) => {
      const budgetLeftValue = Number(budgetLeft)
      const budgetLeftLabel = budgetLeftValue
        ? i18n.t(`${i18nKey}.budgetLeftLabel`, {
            text: poNumber,
            budget: formatAmount({ amount: budgetLeftValue })
          })
        : poNumber

      const text =
        currentPurchaseOrderId === id
          ? i18n.t(`${i18nKey}.currentLabel`, { text: budgetLeftLabel })
          : nextPurchaseOrderId === id
          ? i18n.t(`${i18nKey}.nextLabel`, { text: budgetLeftLabel })
          : budgetLeftLabel

      return {
        text,
        value: id
      }
    }
  )

  return emptyValue.concat(options)
}

export const getSelectFormatPurchaseOrders = (
  purchaseOrders: {
    budgetSpent: boolean
    id: string
    poNumber: string
  }[] = []
) =>
  purchaseOrders.reduce(
    (acc: Option<string>[], { budgetSpent, id, poNumber }) => {
      if (!budgetSpent) {
        const selectItem = {
          text: poNumber,
          value: id
        }

        acc.push(selectItem)
      }

      return acc
    },
    []
  )

export const getPurchaseOrderLines = (purchaseOrders: PurchaseOrder[] = []) =>
  purchaseOrders.reduce(
    (acc: PurchaseOrderLinesSelect, { id, purchaseOrderLines }) => {
      acc[id] = purchaseOrderLines.nodes.map(item => ({
        text: item.poLineNumber,
        value: item.id
      }))

      return acc
    },
    {}
  )

// TODO:
// Temporary any due to the two different endpoint (gateway's po type and billing document's po type)
export const getDefaultSelectPurchaseOrder = (
  purchaseOrders: {
    budgetSpent: boolean
    id: string
    poNumber: string
  }[] = []
) => {
  const orders = getSelectFormatPurchaseOrders(purchaseOrders)

  return orders.length === 1 ? orders[0].value : ''
}

export const isValidEngagement = (engagementId = '') => {
  try {
    return (
      engagementId &&
      Boolean(decodeId({ id: engagementId, type: 'engagement' }))
    )
  } catch (error) {
    return false
  }
}
