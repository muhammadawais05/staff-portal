import {
  BillingMethodName,
  BillingOptionStatus
} from '@staff-portal/graphql/staff'
import i18n from '@staff-portal/billing/src/utils/i18n'

const getVerificationStatusLabel = (
  billingMethod: BillingMethodName,
  status?: BillingOptionStatus | null
) => {
  if (billingMethod === BillingMethodName.CREDIT_CARD) {
    switch (status) {
      case BillingOptionStatus.FAILED:
        return i18n.t('billingOptions:verificationStatus.labels.chargeFailed')
      case BillingOptionStatus.REQUIRES_VERIFICATION:
        return i18n.t(
          'billingOptions:verificationStatus.labels.pendingVerification'
        )
      case BillingOptionStatus.VERIFIED:
        return i18n.t('billingOptions:verificationStatus.labels.verified')
      default:
        return
    }
  }

  switch (status) {
    case BillingOptionStatus.FAILED:
      return i18n.t('billingOptions:verificationStatus.labels.failed')
    case BillingOptionStatus.REQUIRES_VERIFICATION:
      return i18n.t(
        'billingOptions:verificationStatus.labels.pendingVerification'
      )
    case BillingOptionStatus.VERIFIED:
      return i18n.t('billingOptions:verificationStatus.labels.verified')
    default:
  }
}

export default getVerificationStatusLabel
