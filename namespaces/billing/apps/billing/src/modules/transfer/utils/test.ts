import {
  ApolloContextEvents,
  ModalKey
} from '@staff-portal/billing/src/@types/types'

import * as transferUtils from '.'

describe('transfersModals', () => {
  it('ModalVariant array', () => {
    expect(transferUtils.transfersModals).toEqual([
      ModalKey.transferCancel,
      ModalKey.transferPostpone,
      ModalKey.transferRollback,
      ModalKey.transferClaimRefund,
      ModalKey.transferMarkFailed,
      ModalKey.transferPay
    ])
  })
})

describe('transferTableUpdateEvents', () => {
  it('ModalVariant array', () => {
    expect(transferUtils.transferTableUpdateEvents).toEqual([
      ApolloContextEvents.invoiceCollectBadDebt,
      ApolloContextEvents.invoiceApplyPrepayments,
      ApolloContextEvents.invoicePay,
      ApolloContextEvents.paymentCancel,
      ApolloContextEvents.paymentPay,
      ApolloContextEvents.transferClaimRefund,
      ApolloContextEvents.transferMarkFailed,
      ApolloContextEvents.transferPay,
      ApolloContextEvents.transferPostpone,
      ApolloContextEvents.transferRollback
    ])
  })
})
