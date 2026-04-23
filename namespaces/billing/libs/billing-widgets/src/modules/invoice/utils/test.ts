import { DocumentStatus } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import i18n from '@staff-portal/billing/src/utils/i18n'
import { ModalKey } from '@staff-portal/billing/src/@types/types'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import {
  invoiceActionHandler,
  invoiceEntityOperations,
  getInvoiceAmountTooltipText,
  getInvoiceDuePeriodText,
  isInvoiceOriginal,
  isInvoicePayable
} from '.'
import { GqlNoneMeIdQueryParam } from './gqlNoneMeIdQueryParam'

const mockedHandleOnApplyPromotions = jest.fn()
const mockedHandleOnOpenModal = jest.fn()

const getMockedEvent = (value: string | undefined) => ({
  currentTarget: {
    dataset: {
      documentNumber: fixtures.MockInvoice.documentNumber,
      value
    }
  }
})

const invoicePayload = {
  invoiceId: 377249
}
const defaultPayload = {
  nodeId: 377249,
  nodeType: 'invoice'
}

describe('#invoiceActionHandler', () => {
  describe(`when action is '${invoiceEntityOperations[2]}'`, () => {
    it(`action handler is called with expected params`, () => {
      jest.resetAllMocks()

      invoiceActionHandler({
        handleOnApplyPromotions: mockedHandleOnApplyPromotions,
        handleOnOpenModal: mockedHandleOnOpenModal
      })(getMockedEvent(invoiceEntityOperations[2]))

      expect(mockedHandleOnApplyPromotions).toHaveBeenCalledTimes(1)
      expect(mockedHandleOnApplyPromotions).toHaveBeenCalledWith(
        'VjEtSW52b2ljZS0zNzcyNDk'
      )
    })
  })

  describe.each([
    [
      invoiceEntityOperations[0],
      mockedHandleOnOpenModal,
      ModalKey.memorandumAdd,
      defaultPayload
    ],
    [
      invoiceEntityOperations[1],
      mockedHandleOnOpenModal,
      ModalKey.invoiceApplyPrepayments,
      defaultPayload
    ],
    [
      invoiceEntityOperations[3],
      mockedHandleOnOpenModal,
      ModalKey.invoiceApplyMemos,
      defaultPayload
    ],
    [
      invoiceEntityOperations[4],
      mockedHandleOnOpenModal,
      ModalKey.invoiceCollectBadDebt,
      invoicePayload
    ],
    [
      invoiceEntityOperations[5],
      mockedHandleOnOpenModal,
      ModalKey.invoiceDisputeTalent,
      defaultPayload
    ],
    [
      invoiceEntityOperations[6],
      mockedHandleOnOpenModal,
      ModalKey.invoiceRecordBadDebt,
      defaultPayload
    ],
    [
      invoiceEntityOperations[7],
      mockedHandleOnOpenModal,
      ModalKey.commercialDocumentDisputeRequest,
      defaultPayload
    ],
    [
      invoiceEntityOperations[8],
      mockedHandleOnOpenModal,
      ModalKey.commercialDocumentDisputeResolve,
      defaultPayload
    ],
    [
      invoiceEntityOperations[9],
      mockedHandleOnOpenModal,
      ModalKey.invoiceUnconsolidate,
      defaultPayload
    ],
    [
      invoiceEntityOperations[10],
      mockedHandleOnOpenModal,
      ModalKey.invoiceDisputeUpdate,
      defaultPayload
    ],
    [
      invoiceEntityOperations[11],
      mockedHandleOnOpenModal,
      ModalKey.commercialDocumentUpdateDueDate,
      defaultPayload
    ],
    [
      invoiceEntityOperations[12],
      mockedHandleOnOpenModal,
      ModalKey.invoiceWriteOff,
      defaultPayload
    ],
    [
      invoiceEntityOperations[13],
      mockedHandleOnOpenModal,
      ModalKey.commercialDocumentAddNote,
      defaultPayload
    ],
    [
      invoiceEntityOperations[14],
      mockedHandleOnOpenModal,
      ModalKey.commercialDocumentEditNote,
      defaultPayload
    ]
    // eslint-disable-next-line max-params
  ])(
    '#invoiceActionHandler',
    (actionName, mockedHandler, modalName, payload) => {
      describe(`when action is "${actionName}"`, () => {
        it(`action handler is called with expected params`, () => {
          jest.resetAllMocks()

          invoiceActionHandler({
            handleOnApplyPromotions: mockedHandleOnApplyPromotions,
            handleOnOpenModal: mockedHandleOnOpenModal
          })(getMockedEvent(actionName))

          expect(mockedHandler).toHaveBeenCalledTimes(1)
          expect(mockedHandler).toHaveBeenCalledWith(modalName, payload)
        })
      })
    }
  )
})

describe('#getInvoiceDuePeriodText', () => {
  describe('when duePeriod is `undefined`', () => {
    it('return `unknown`', () => {
      expect(getInvoiceDuePeriodText()).toBe(EMPTY_DATA)
    })
  })

  describe('when duePeriod is `0` or less', () => {
    it('return `Upon receipt`', () => {
      expect(getInvoiceDuePeriodText(0)).toBe(
        i18n.t('invoice:invoiceDetails.duePeriodUponReceipt')
      )
      expect(getInvoiceDuePeriodText(-1)).toBe(
        i18n.t('invoice:invoiceDetails.duePeriodUponReceipt')
      )
    })
  })

  describe('when duePeriod is a positive number', () => {
    it('return `Net{{number}}`', () => {
      expect(getInvoiceDuePeriodText(10)).toBe(
        i18n.t('invoice:invoiceDetails.duePeriodValue', { duePeriod: 10 })
      )
    })
  })
})

describe('#isInvoiceOriginal', () => {
  it('returns `true` if invoice is original', () => {
    expect(
      isInvoiceOriginal({
        consolidatedInvoice: { id: 'id' }
      })
    ).toBe(true)
  })

  it('returns `false` if invoice is not original', () => {
    expect(
      isInvoiceOriginal({
        consolidatedInvoice: undefined
      })
    ).toBe(false)
  })
})

describe('isInvoicePayable', () => {
  describe.each([
    DocumentStatus.OUTSTANDING,
    DocumentStatus.OVERDUE,
    DocumentStatus.PENDING_RECEIPT,
    DocumentStatus.IN_COLLECTIONS
  ])('when it should be true', status => {
    describe(`when it's not a child of consolidated invoice, has cleanAmountToPay, and status is ${status}`, () => {
      it('returns true', () => {
        expect(
          isInvoicePayable({
            cleanAmountToPay: '100.0',
            consolidatedInvoice: undefined,
            status
          })
        ).toBe(true)
      })
    })
  })

  describe.each([
    ['0.0', undefined, DocumentStatus.OUTSTANDING],
    ['100.0', { id: 'id' }, DocumentStatus.OVERDUE],
    ['100.0', undefined, DocumentStatus.DISPUTED]
  ])(
    'when it should be false',
    (cleanAmountToPay, consolidatedInvoice, status) => {
      describe(`when consolidated invoice is ${JSON.stringify(
        consolidatedInvoice
      )}, cleanAmountToPay is ${cleanAmountToPay}, and status is ${status}`, () => {
        it('returns false', () => {
          expect(
            isInvoicePayable({
              cleanAmountToPay,
              consolidatedInvoice,
              status
            })
          ).toBe(false)
        })
      })
    }
  )
})

describe.each([
  [
    {
      discountApplied: true,
      discountedAmount: '1500',
      partiallyPaid: true,
      status: DocumentStatus.OUTSTANDING,
      subjectObject: {
        preferredBillingOption: {
          billingMethod: 'CREDIT_CARD',
          discountable: true
        }
      }
    },
    'The company will pay a rate of $1,500.00 (% discount) if they use their primary payment method, which is Credit Card.'
  ],
  [
    {
      discountApplied: true,
      discountedAmount: '1500',
      partiallyPaid: true,
      status: DocumentStatus.OVERDUE,
      subjectObject: {
        preferredBillingOption: {
          billingMethod: 'CREDIT_CARD',
          discountable: false
        }
      }
    },
    'The company has selected Credit Card as their primary payment method. They can receive a % discount by switching to ACH or Wire and pay a rate of $1,500.00.'
  ],
  [
    {
      discountApplied: true,
      partiallyPaid: true,
      status: DocumentStatus.PAID,
      subjectObject: {
        preferredBillingOption: {
          discountable: false
        }
      }
    },
    null
  ],
  [
    {
      discountApplied: true,
      discountedAmount: '1500',
      partiallyPaid: false,
      status: DocumentStatus.OUTSTANDING,
      subjectObject: {
        preferredBillingOption: {
          billingMethod: 'CREDIT_CARD',
          discountable: true
        }
      }
    },
    'The company will pay a rate of $1,500.00 (% discount) if they use their primary payment method, which is Credit Card.'
  ],
  [
    {
      discountApplied: true,
      discountedAmount: '1500',
      partiallyPaid: false,
      status: DocumentStatus.OVERDUE,
      subjectObject: {
        preferredBillingOption: {
          billingMethod: 'CREDIT_CARD',
          discountable: false
        }
      }
    },
    'The company has selected Credit Card as their primary payment method. They can reduce the amount to $1,500.00 (% discount) by switching to ACH or Wire.'
  ],
  [
    {
      discountApplied: true,
      partiallyPaid: false,
      status: DocumentStatus.PAID,
      subjectObject: {
        preferredBillingOption: {
          discountable: false
        }
      }
    },
    null
  ]
])('#getInvoiceAmountTooltipText', (invoiceData, tooltipText) => {
  describe(`when invoice's partiallyPaid is ${JSON.stringify(
    invoiceData.partiallyPaid
  )}`, () => {
    describe(`when invoice's status is ${invoiceData.status}`, () => {
      describe(`when invoice's preferredBillingOption is ${JSON.stringify(
        invoiceData.subjectObject.preferredBillingOption.discountable
      )}`, () => {
        it('returns proper string representation', () => {
          const mockInvoice = {
            ...fixtures.MockInvoice,
            ...invoiceData
          }
          const result = getInvoiceAmountTooltipText(mockInvoice)

          expect(result).toBe(tooltipText)
        })
      })
    })
  })
})

describe('#GqlNoneMeIdQueryParam', () => {
  it('will decode the id', () => {
    const actualEncodedId = GqlNoneMeIdQueryParam('Staff').decode('id')

    expect(actualEncodedId).toBe('VjEtU3RhZmYtaWQ')
  })

  it('will respect the ignored values', () => {
    const actualDecodedIdme = GqlNoneMeIdQueryParam('Staff').decode('me')
    const actualEncodedIdME = GqlNoneMeIdQueryParam('Staff').encode('ME')
    const actualDecodedIdnone = GqlNoneMeIdQueryParam('Staff').decode('none')
    const actualEncodedIdNONE = GqlNoneMeIdQueryParam('Staff').encode('NONE')

    expect(actualDecodedIdme).toBe('ME')
    expect(actualEncodedIdME).toBe('me')
    expect(actualDecodedIdnone).toBe('NONE')
    expect(actualEncodedIdNONE).toBe('none')
  })
})
