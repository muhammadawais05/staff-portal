import { renderHook } from '@testing-library/react-hooks'
import { PaymentKind } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import {
  ApolloContextEvents,
  ModalKey
} from '@staff-portal/billing/src/@types/types'

import * as paymentActionUtils from './index'
import { isPaymentCommission, usePaymentActionHandler } from './index'

const mockedHandleOnOpenModal = jest.fn()

jest.mock('@staff-portal/billing/src/_lib/customHooks/useQueryParams', () => ({
  useQueryParams: () => ['test', jest.fn()]
}))

const getMockedEvent = (value: string | undefined) => ({
  currentTarget: {
    dataset: {
      documentNumber: fixtures.MockPayment.documentNumber,
      value
    }
  }
})

const defaultPayload = {
  nodeId: 1104428,
  nodeType: 'payment'
}

describe('Payment action utils', () => {
  describe.each([
    [
      paymentActionUtils.paymentEntityOperations[0],
      mockedHandleOnOpenModal,
      ModalKey.commercialDocumentAddNote,
      defaultPayload
    ],
    [
      paymentActionUtils.paymentEntityOperations[1],
      mockedHandleOnOpenModal,
      ModalKey.memorandumAdd,
      defaultPayload
    ],
    [
      paymentActionUtils.paymentEntityOperations[2],
      mockedHandleOnOpenModal,
      ModalKey.paymentApplyMemos,
      defaultPayload
    ],
    [
      paymentActionUtils.paymentEntityOperations[3],
      mockedHandleOnOpenModal,
      ModalKey.paymentCancel,
      defaultPayload
    ],
    [
      paymentActionUtils.paymentEntityOperations[4],
      mockedHandleOnOpenModal,
      ModalKey.paymentConvertIntoCreditMemo,
      defaultPayload
    ],
    [
      paymentActionUtils.paymentEntityOperations[5],
      mockedHandleOnOpenModal,
      ModalKey.commercialDocumentDisputeRequest,
      defaultPayload
    ],
    [
      paymentActionUtils.paymentEntityOperations[6],
      mockedHandleOnOpenModal,
      ModalKey.commercialDocumentEditNote,
      defaultPayload
    ],
    [
      paymentActionUtils.paymentEntityOperations[7],
      mockedHandleOnOpenModal,
      ModalKey.paymentPay,
      defaultPayload
    ],
    [
      paymentActionUtils.paymentEntityOperations[9],
      mockedHandleOnOpenModal,
      ModalKey.commercialDocumentUpdateDueDate,
      defaultPayload
    ]
  ])(
    '#paymentActionHandler',
    // eslint-disable-next-line max-params
    (actionName, mockedHandler, modalName, payload) => {
      describe(`when action is "${actionName}"`, () => {
        it(`action handler is called with expected params`, () => {
          jest.resetAllMocks()

          paymentActionUtils.paymentActionHandler({
            handleOnOpenModal: mockedHandleOnOpenModal
          })(getMockedEvent(actionName))

          expect(mockedHandler).toHaveBeenCalledTimes(1)
          expect(mockedHandler).toHaveBeenCalledWith(modalName, payload)
        })
      })
    }
  )

  it('#getPaymentDuePeriod', () => {
    expect(
      paymentActionUtils.getPaymentDuePeriod({ dueDate: '', createdOn: '' })
    ).toBe(0)

    expect(
      paymentActionUtils.getPaymentDuePeriod({
        dueDate: '',
        createdOn: '2020-08-24'
      })
    ).toBe(0)

    expect(
      paymentActionUtils.getPaymentDuePeriod({
        dueDate: '2020-01-01',
        createdOn: ''
      })
    ).toBe(0)

    expect(
      paymentActionUtils.getPaymentDuePeriod({
        createdOn: '2020-01-01',
        dueDate: '2020-08-24'
      })
    ).toBe(236)
  })
})

describe('paymentListUpdateDataEvents', () => {
  it('returns the proper event list', () => {
    expect(paymentActionUtils.paymentListUpdateDataEvents).toEqual([
      ApolloContextEvents.paymentCreateGroup,
      ApolloContextEvents.commercialDocumentApplyMemos,
      ApolloContextEvents.commercialDocumentDisputeRequest,
      ApolloContextEvents.commercialDocumentDisputeResolve,
      ApolloContextEvents.commercialDocumentUpdateDueDate,
      ApolloContextEvents.convertPaymentIntoCreditMemorandum,
      ApolloContextEvents.memorandumAdd,
      ApolloContextEvents.memorandumRevert,
      ApolloContextEvents.memorandumRevertPrepayment,
      ApolloContextEvents.paymentCancel,
      ApolloContextEvents.paymentMultiplePay,
      ApolloContextEvents.paymentPay
    ])
  })
})

describe('paymentDetailsUpdateDataEvents', () => {
  it('returns expected events', () => {
    expect(paymentActionUtils.paymentDetailsUpdateDataEvents).toEqual([
      ApolloContextEvents.commercialDocumentAddNote,
      ApolloContextEvents.commercialDocumentEditNote,
      ApolloContextEvents.paymentCancel,
      ApolloContextEvents.transferClaimRefund,
      ApolloContextEvents.transferMarkFailed,
      ApolloContextEvents.transferPay,
      ApolloContextEvents.transferPostpone,
      ApolloContextEvents.paymentCreateGroup,
      ApolloContextEvents.commercialDocumentApplyMemos,
      ApolloContextEvents.commercialDocumentDisputeRequest,
      ApolloContextEvents.commercialDocumentDisputeResolve,
      ApolloContextEvents.commercialDocumentUpdateDueDate,
      ApolloContextEvents.convertPaymentIntoCreditMemorandum,
      ApolloContextEvents.memorandumAdd,
      ApolloContextEvents.memorandumRevert,
      ApolloContextEvents.memorandumRevertPrepayment,
      ApolloContextEvents.paymentCancel,
      ApolloContextEvents.paymentMultiplePay,
      ApolloContextEvents.paymentPay
    ])
  })
})

describe('usePaymentActionHandler', () => {
  it('returns handlers', () => {
    const { result } = renderHook(() => usePaymentActionHandler())

    expect(result.current.handleOnActionClick).toBeInstanceOf(Function)
  })
})

describe('paymentTotalSortOrder', () => {
  it('return the following order list', () => {
    expect(paymentActionUtils.paymentTotalSortOrder).toEqual([
      'outstanding',
      'due',
      'overdue',
      'onHold',
      'disputed',
      'debited',
      'paid'
    ])
  })
})

describe('paymentDetailsActions', () => {
  it('return the action list', () => {
    expect(paymentActionUtils.paymentDetailsActions).toEqual([
      'downloadPdfUrl',
      'downloadHtmlUrl',
      'disputeCommercialDocument',
      'resolveDisputeOfCommercialDocument',
      'cancelPayment',
      'addMemorandumToCommercialDocument',
      'applyUnallocatedMemorandumsToCommercialDocument',
      'convertPaymentIntoCreditMemorandum',
      'addDocumentNote',
      'editDocumentNote',
      'updateCommercialDocumentDueDate'
    ])
  })
})

describe('paymentListItemActions', () => {
  it('return the action list', () => {
    expect(paymentActionUtils.paymentListItemActions).toEqual([
      'details',
      'downloadPdfUrl',
      'downloadHtmlUrl',
      'disputeCommercialDocument',
      'resolveDisputeOfCommercialDocument',
      'cancelPayment',
      'addMemorandumToCommercialDocument',
      'applyUnallocatedMemorandumsToCommercialDocument',
      'convertPaymentIntoCreditMemorandum',
      'updateCommercialDocumentDueDate'
    ])
  })
})

describe('#isPaymentCommission', () => {
  it('returns `true` when kind is not of commission type', () => {
    expect(isPaymentCommission(PaymentKind.ROLE_STEP_COMMISSION)).toBe(true)
  })

  it('returns `false` when kind is not of commission type, or when kind is undefined', () => {
    expect(isPaymentCommission(PaymentKind.TALENT_PAYMENT)).toBe(false)
    expect(isPaymentCommission()).toBe(false)
  })
})
