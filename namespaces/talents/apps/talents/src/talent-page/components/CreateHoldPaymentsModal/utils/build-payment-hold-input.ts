import {
  PaymentHold,
  CreatePaymentHoldInput,
  PaymentHoldAutomaticExpiration
} from '@staff-portal/graphql/staff'

import { TabType } from '../types'

// eslint-disable-next-line max-params
export const buildPaymentHoldInput = (
  talentId: string,
  currentTab: TabType,
  input: Partial<CreatePaymentHoldInput>
): CreatePaymentHoldInput => {
  const holdType =
    currentTab === TabType.AUTOMATIC
      ? PaymentHold.AUTOMATIC
      : PaymentHold.MANUAL

  const paymentHoldInput = {
    talentId: talentId,
    holdType: holdType,
    comment: input.comment
  } as CreatePaymentHoldInput

  if (currentTab === TabType.AUTOMATIC) {
    if (input.expirationType === PaymentHoldAutomaticExpiration.BY_DATE) {
      paymentHoldInput.expirationType = PaymentHoldAutomaticExpiration.BY_DATE
      paymentHoldInput.expireOn = input.expireOn
    }

    if (input.expirationType === PaymentHoldAutomaticExpiration.BY_AMOUNT) {
      paymentHoldInput.expirationType = PaymentHoldAutomaticExpiration.BY_AMOUNT
      paymentHoldInput.expireAtThreshold = input.expireAtThreshold
    }
  }

  return paymentHoldInput
}
