import i18n from '@staff-portal/billing/src/utils/i18n'

export const validatePurchaseOrderLine = (
  value: string,
  allValues: { purchaseOrderId?: string }
) => {
  const { purchaseOrderId } = allValues

  if (!purchaseOrderId) {
    return
  }
  if (!value) {
    return i18n.t('common:validation.required')
  }
}
