import { SelectablePurchaseOrderLineFragment } from '../../data/get-edit-purchase-order-data'

export const getSelectablePurchaseOrderLineOption = ({
  currentOrderId,
  order: {
    id,
    poLineNumber,
    client: { fullName }
  }
}: {
  currentOrderId?: string
  order: SelectablePurchaseOrderLineFragment
}) => {
  const text = `${poLineNumber} - ${fullName}`
  const currentText = id === currentOrderId ? ' (current)' : ''

  return {
    text: `${text}${currentText}`,
    value: id
  }
}
