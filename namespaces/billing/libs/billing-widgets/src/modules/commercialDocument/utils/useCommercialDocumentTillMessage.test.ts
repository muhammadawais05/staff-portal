import MockDate from 'mockdate'
import { DocumentStatus } from '@staff-portal/graphql/staff'

import { useCommercialDocumentTillMessage } from './useCommercialDocumentTillMessage'

describe('#useCommercialDocumentTillMessage', () => {
  beforeEach(() => MockDate.set('2019/01/01 19:00'))

  afterEach(() => MockDate.reset())

  describe('when status is `DISPUTED`', () => {
    describe('when document has actionDueOn', () => {
      it('returns proper message', () => {
        expect(
          useCommercialDocumentTillMessage({
            status: DocumentStatus.DISPUTED,
            actionDueOn: '2020-12-12'
          })
        ).toBe('Until Dec 12, 2020')
      })
    })

    describe('when document does not actionDueOn', () => {
      it('returns undefined', () => {
        expect(
          useCommercialDocumentTillMessage({
            status: DocumentStatus.DISPUTED
          })
        ).toBeUndefined()
      })
    })
  })

  describe('when status is `PENDING_RECEIPT`', () => {
    describe('when document has paidAt', () => {
      it('returns proper message', () => {
        expect(
          useCommercialDocumentTillMessage({
            status: DocumentStatus.PENDING_RECEIPT,
            processingDate: '2020-12-12'
          })
        ).toBe('Until Dec 12, 2020')
      })
    })

    describe('when document does not processingDate', () => {
      it('returns undefined', () => {
        expect(
          useCommercialDocumentTillMessage({
            status: DocumentStatus.PENDING_RECEIPT
          })
        ).toBeUndefined()
      })
    })
  })
})
