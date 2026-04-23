import { BillingMethodName } from '@staff-portal/graphql/staff'

import { ClientBillingDetailsBillingOptionsFragment } from '../../../data/getClientBillingDetails.graphql.types'

export const getInitialValues = (
  billingOption?: ClientBillingDetailsBillingOptionsFragment
) => {
  if (!billingOption) {
    return {}
  }

  const { accountInfo, billingMethod } = billingOption

  if (!accountInfo) {
    return {}
  }

  if (billingMethod === BillingMethodName.WIRE) {
    return {
      nameOnAccount: accountInfo[0]?.value,
      bankName: accountInfo[1]?.value
    }
  } else if (billingMethod === BillingMethodName.PAYPAL) {
    return {
      businessName: accountInfo[0]?.value,
      username: accountInfo[1]?.value
    }
  }

  return {}
}
