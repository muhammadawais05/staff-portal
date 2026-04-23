import {
  DocumentStatus,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'

import { getInvoiceDetailsHeaderPayOperation } from '.'

describe('#getInvoiceDetailsHeaderPayOperation', () => {
  describe("when the invoice's operation provides a HIDDEN value", () => {
    it('returns the `HIDDEN` operation', () => {
      const mockInvoice = {
        ...fixtures.MockInvoice,
        operations: {
          createTransferInvoice: {
            callable: OperationCallableTypes.HIDDEN,
            messages: []
          }
        }
      }

      expect(getInvoiceDetailsHeaderPayOperation(mockInvoice)).toEqual({
        callable: OperationCallableTypes.HIDDEN,
        messages: []
      })
    })
  })

  describe('when the invoice in Draft status', () => {
    it('returns the `DISABLED` operation', () => {
      const mockInvoice = {
        ...fixtures.MockInvoice,
        consolidatedInvoice: null,
        status: DocumentStatus.DRAFT
      }

      expect(getInvoiceDetailsHeaderPayOperation(mockInvoice)).toEqual({
        callable: OperationCallableTypes.DISABLED,
        messages: ['You cannot add payment to a draft invoice.']
      })
    })
  })

  describe('when the invoice in original', () => {
    it('returns the `DISABLED` operation', () => {
      const mockInvoice = {
        ...fixtures.MockInvoice,
        consolidatedInvoice: { id: '123456' }
      }

      expect(getInvoiceDetailsHeaderPayOperation(mockInvoice)).toEqual({
        callable: OperationCallableTypes.DISABLED,
        messages: [
          'You cannot add payment to the original invoice (pay consolidated invoice instead).'
        ]
      })
    })
  })

  it('returns the `ENABLED` operation', () => {
    const mockInvoice = { ...fixtures.MockInvoice, consolidatedInvoice: null }

    expect(getInvoiceDetailsHeaderPayOperation(mockInvoice)).toEqual({
      callable: OperationCallableTypes.ENABLED,
      messages: []
    })
  })
})
