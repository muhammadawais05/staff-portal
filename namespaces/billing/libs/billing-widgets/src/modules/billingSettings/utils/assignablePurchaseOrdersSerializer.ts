import { NOT_SELECTED_OPTION } from '@staff-portal/config'

import { PurchaseOrderLineOptionFragment } from '../../__fragments__/billingSettingsJobFragment.graphql.types'
import { GetPurchaseOrdersOptionsQuery } from '../data/getPurchaseOrdersOptions.graphql.types'

interface PurchaseOrderLines {
  nodes: PurchaseOrderLineOptionFragment[]
}

type PurchaseOrders =
  | Exclude<
      GetPurchaseOrdersOptionsQuery['node'],
      undefined | null
    >['client']['purchaseOrdersNullable']
  | PurchaseOrderLines

export const mapPurchaseOrdersToListOptions = (
  purchaseOrders: PurchaseOrders
) => {
  const options =
    purchaseOrders?.nodes.map(
      ({ id, client: { fullName }, webResource: { text } }) => ({
        value: id,
        text: `${text} - ${fullName}`
      })
    ) ?? []

  return [NOT_SELECTED_OPTION, ...options]
}

export default mapPurchaseOrdersToListOptions
