import i18n from '@staff-portal/billing/src/utils/i18n'
import { WebResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql.types'
import { NOT_SELECTED_OPTION } from '@staff-portal/config'
import { formatAmount } from '@toptal/picasso/utils'

type PurchaseOrder = {
  id: string
  poNumber?: string
  poLineNumber?: string
  budgetLeft?: string | null
  webResource: WebResourceFragment
}

export type PurchaseOrders = PurchaseOrder[]
const i18nKey = 'invoice:invoiceDetails.purchaseOrdersEditor'

const enhanceLabel = (id: string, currentId?: string, nextId?: string) => {
  if (id === currentId) {
    return i18n.t(`${i18nKey}.current`)
  }
  if (id === nextId) {
    return i18n.t(`${i18nKey}.next`)
  }

  return ''
}

export const mapPurchaseOrdersToSelectOptions = (
  purchaseOrders: PurchaseOrders,
  currentId?: string,
  nextId?: string
) => {
  const options =
    purchaseOrders?.map(
      ({ id, budgetLeft = null, poNumber = '', poLineNumber }) => {
        const poLineNumberText =
          budgetLeft === null
            ? `${poLineNumber}`
            : `${i18n.t(`${i18nKey}.budgetLeftLabel`, {
                text: poLineNumber,
                budget: formatAmount({ amount: budgetLeft })
              })}`

        return {
          value: id,
          text: poLineNumber
            ? `${poLineNumberText}${enhanceLabel(id, currentId, nextId)}`
            : poNumber
        }
      }
    ) ?? []

  return [NOT_SELECTED_OPTION, ...options]
}
