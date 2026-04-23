import { SelectablePurchaseOrderFragment } from '../../data/get-edit-purchase-order-data'

// TODO: Remove this file when experiment is released. get-selectable-purchase-order-line-option will be used instead
// https://toptal-core.atlassian.net/browse/BILL-2144
export const getSelectablePurchaseOrderOption = ({
  currentOrderId,
  order: {
    id,
    poNumber,
    client: { fullName }
  }
}: {
  currentOrderId?: string
  order: SelectablePurchaseOrderFragment
}) => {
  let text = `${poNumber} - ${fullName}`

  if (id === currentOrderId) {
    text += ' (current)'
  }

  return {
    text: text,
    value: id
  }
}
