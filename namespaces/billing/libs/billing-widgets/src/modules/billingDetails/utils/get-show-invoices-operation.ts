import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import i18n from '@staff-portal/billing/src/utils/i18n'

const getShowInvoicesOperation = (totalCount?: number) => {
  if (!totalCount && totalCount !== 0) {
    return {
      callable: OperationCallableTypes.HIDDEN,
      messages: []
    }
  }

  if (totalCount === 0) {
    return {
      callable: OperationCallableTypes.DISABLED,
      messages: [i18n.t('billingDetails:actions.showInvoices.disabled.tooltip')]
    }
  }

  return {
    callable: OperationCallableTypes.ENABLED,
    messages: []
  }
}

export default getShowInvoicesOperation
