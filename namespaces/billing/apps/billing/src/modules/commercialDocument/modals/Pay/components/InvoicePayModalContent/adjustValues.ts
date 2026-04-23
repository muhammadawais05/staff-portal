import { AnyObject } from '@toptal/picasso-forms'
import { omit } from 'lodash-es'
import {
  BillingMethodName,
  InvoicePaymentSources
} from '@staff-portal/graphql/staff'
import { parse } from '@staff-portal/billing/src/_lib/dateTime'

// TODO: add tests
const getBillingOptionId = (
  billingOptionId: string,
  source: InvoicePaymentSources,
  sources: AnyObject
) => {
  if (source === InvoicePaymentSources.ACH) {
    const sourcesAch = sources[BillingMethodName.ACH]
    const isSingleAch = sourcesAch?.options?.length === 1

    if (isSingleAch) {
      return sourcesAch?.options[0].id
    }
  } else if (source === InvoicePaymentSources.CREDIT_CARD) {
    const sourcesCards = sources[BillingMethodName.CREDIT_CARD]
    const isSingleCard = sourcesCards?.options?.length === 1

    if (isSingleCard) {
      return sourcesCards?.options[0].id
    }
  }

  return billingOptionId
}

const adjustValues = (
  mergedValues: AnyObject,
  availablePaymentSources: AnyObject
) => {
  const keysToOmit = [
    'amountCompareKey',
    'discountedAmount',
    'unappliedCashIdFake',
    'unappliedCashAmount',
    'undiscountedAmount'
  ]

  const billingOptionId = getBillingOptionId(
    mergedValues.billingOptionId,
    mergedValues.paymentSource,
    availablePaymentSources
  )

  const values: typeof mergedValues = {
    ...mergedValues,
    unappliedCashEffectiveDate:
      parse(mergedValues.unappliedCashEffectiveDate).toISODate() || '',
    billingOptionId
  }

  const emptyKeys = Object.keys(values).filter(key => values[key] === '')

  return omit(values, keysToOmit.concat(emptyKeys))
}

export default adjustValues
