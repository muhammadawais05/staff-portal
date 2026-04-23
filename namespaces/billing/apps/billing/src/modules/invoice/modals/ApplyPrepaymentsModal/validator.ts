import { AnyObject, FORM_ERROR } from '@toptal/picasso-forms'
import { formatAmount } from '@toptal/picasso/utils'
import i18n from '@staff-portal/billing/src/utils/i18n'

const validator =
  (availablePrepaymentBalance?: string) => (values: AnyObject) => {
    const { amount } = values

    const formError: AnyObject = {}
    const numericAmount = Number(amount)
    const numericBalance = Number(availablePrepaymentBalance)

    if (numericAmount <= 0) {
      formError[FORM_ERROR] = i18n.t('common:validation.positive')
    }

    if (numericAmount > numericBalance) {
      formError[FORM_ERROR] = i18n.t('common:validation.lessThanOrEqualValue', {
        label: formatAmount({ amount: numericBalance })
      })
    }

    return formError
  }

export default validator
