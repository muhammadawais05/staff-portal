import MockDate from 'mockdate'
import { DocumentStatus, PaymentKind } from '@staff-portal/graphql/staff'

import { useCommercialDocumentDueMessage } from './useCommercialDocumentDueMessage'

describe('#useCommercialDocumentDueMessage', () => {
  beforeEach(() => MockDate.set('2019/01/01 19:00'))

  afterEach(() => MockDate.reset())

  describe('when status is `PENDING_RECEIPT`', () => {
    describe('when document has pending charges', () => {
      describe('when document has processingDate', () => {
        it('returns proper message', () => {
          expect(
            useCommercialDocumentDueMessage({
              status: DocumentStatus.PENDING_RECEIPT,
              processingDate: '2020-12-12',
              hasPendingCharges: true
            })
          ).toBe('Due on Dec 12, 2020')
        })
      })

      describe('when document does not have processingDate', () => {
        it('returns undefined', () => {
          expect(
            useCommercialDocumentDueMessage({
              status: DocumentStatus.PENDING_RECEIPT,
              hasPendingCharges: true
            })
          ).toBeUndefined()
        })
      })
    })

    describe('when document does not have pending charges', () => {
      it('returns undefined', () => {
        expect(
          useCommercialDocumentDueMessage({
            status: DocumentStatus.PENDING_RECEIPT
          })
        ).toBeUndefined()
      })
    })
  })

  describe('when status is `OUTSTANDING`', () => {
    describe('when document has dueDate', () => {
      describe('when document has payment type of kind', () => {
        it('returns undefined', () => {
          expect(
            useCommercialDocumentDueMessage({
              status: DocumentStatus.OUTSTANDING,
              dueDate: '2020-12-12',
              paymentKind: PaymentKind.SALES_ANALYSIS_COMMISSION
            })
          ).toBeUndefined()
        })
      })

      describe('when document does not have payment type of kind', () => {
        it('returns proper message', () => {
          expect(
            useCommercialDocumentDueMessage({
              status: DocumentStatus.OUTSTANDING,
              dueDate: '2020-12-12'
            })
          ).toBe('Due on Dec 12, 2020')
        })
      })
    })

    describe('when document does not have dueDate', () => {
      it('returns undefined', () => {
        expect(
          useCommercialDocumentDueMessage({
            status: DocumentStatus.OUTSTANDING
          })
        ).toBeUndefined()
      })
    })
  })

  describe('when status is `PAID`', () => {
    describe('when document has paidAt', () => {
      describe('when document has payment type of kind', () => {
        it('returns proper message', () => {
          expect(
            useCommercialDocumentDueMessage({
              status: DocumentStatus.PAID,
              paidAt: '2020-12-12'
            })
          ).toBe('Paid on Dec 12, 2020')
        })
      })
    })

    describe('when document does not have paidAt', () => {
      it('returns undefined', () => {
        expect(
          useCommercialDocumentDueMessage({
            status: DocumentStatus.PAID
          })
        ).toBeUndefined()
      })
    })
  })
})
