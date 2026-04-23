import {
  BillingMethodName,
  BillingOptionStatus
} from '@staff-portal/graphql/staff'

const getVerificationStatusColor = (
  billingMethod: BillingMethodName,
  status?: BillingOptionStatus | null
) => {
  if (
    [BillingMethodName.CREDIT_CARD, BillingMethodName.PAYPAL].includes(
      billingMethod
    )
  ) {
    if (status === BillingOptionStatus.VERIFIED) {
      return 'green'
    }

    return 'red'
  }

  return 'black'
}

export default getVerificationStatusColor
