import {
  BillingMethodName,
  BillingOptionVerificationStatus,
  Maybe
} from '@staff-portal/graphql/staff'
import i18n from '@staff-portal/billing/src/utils/i18n'

const creditCardVerificationStatusTooltipTranslationMap: {
  [key in BillingOptionVerificationStatus | string]: string
} = {
  [BillingOptionVerificationStatus.CANNOT_BE_CHARGED]: i18n.t(
    'billingOptions:verificationStatus.comments.cannotBeCharged'
  ),
  [BillingOptionVerificationStatus.CAN_BE_CHARGED]: i18n.t(
    'billingOptions:verificationStatus.comments.canBeCharged'
  ),
  [BillingOptionVerificationStatus.CARD_DECLINED]: i18n.t(
    'billingOptions:verificationStatus.comments.cardDeclined'
  ),
  [BillingOptionVerificationStatus.CVC_FAIL]: i18n.t(
    'billingOptions:verificationStatus.comments.cvcFailed'
  ),
  [BillingOptionVerificationStatus.CVC_PASS]: i18n.t(
    'billingOptions:verificationStatus.comments.cvcPass'
  ),
  [BillingOptionVerificationStatus.CVC_UNCHECKED]: i18n.t(
    'billingOptions:verificationStatus.comments.cvcUnchecked'
  ),
  [BillingOptionVerificationStatus.EXPIRED_CARD]: i18n.t(
    'billingOptions:verificationStatus.comments.cvcExpiredCard'
  ),
  [BillingOptionVerificationStatus.INCORRECT_CVC]: i18n.t(
    'billingOptions:verificationStatus.comments.incorrectCVC'
  ),
  [BillingOptionVerificationStatus.MISSING]: i18n.t(
    'billingOptions:verificationStatus.comments.missing'
  ),
  [BillingOptionVerificationStatus.PENDING]: i18n.t(
    'billingOptions:verificationStatus.comments.pending'
  ),
  [BillingOptionVerificationStatus.PROCESSING_ERROR]: i18n.t(
    'billingOptions:verificationStatus.comments.processingError'
  )
}

const getVerificationStatusTooltipLines = ({
  billingMethod,
  comment,
  verificationStatuses
}: {
  billingMethod: BillingMethodName
  comment?: Maybe<string>
  verificationStatuses?: BillingOptionVerificationStatus[] | null
}) => {
  if (billingMethod === BillingMethodName.CREDIT_CARD) {
    if (!verificationStatuses || verificationStatuses.length === 0) {
      return []
    }

    return verificationStatuses
      .map(
        verificationStatus =>
          creditCardVerificationStatusTooltipTranslationMap[verificationStatus]
      )
      .filter(val => !!val)
  }

  if (!comment) {
    return []
  }

  return [comment]
}

export default getVerificationStatusTooltipLines
