import { renderHook } from '@testing-library/react-hooks'
import { InvoiceKind, MemorandumBalance } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'

import {
  getAdjustedInvoiceDueAmount,
  sumByBalance,
  useAdjustedOriginalInvoices
} from './useAdjustedOriginalInvoices'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (...args: (string | object)[]) => args
  })
}))

describe('useAdjustedOriginalInvoices', () => {
  describe('getAdjustedInvoiceDueAmount', () => {
    it('formats invoice amount to formatted amount string', () => {
      const associatedMemorandums = [
        {
          ...fixtures.MockMemorandum,
          amount: '100',
          balance: MemorandumBalance.DEBIT
        },
        {
          ...fixtures.MockMemorandum,
          amount: '200',
          balance: MemorandumBalance.DEBIT
        },
        {
          ...fixtures.MockMemorandum,
          amount: '400',
          balance: MemorandumBalance.CREDIT
        }
      ]

      const result = getAdjustedInvoiceDueAmount(associatedMemorandums, '30')

      expect(result).toBe('-$70.00')

      const resultWithoutCleanOutstanding = getAdjustedInvoiceDueAmount(
        associatedMemorandums
      )

      expect(resultWithoutCleanOutstanding).toBe('-$100.00')
    })
  })

  describe('sumByBalance', () => {
    it('properly converts string amount to signed number by balance type', () => {
      expect(
        sumByBalance({
          ...fixtures.MockMemorandum,
          amount: '100',
          balance: MemorandumBalance.DEBIT
        })
      ).toBe(100)
      expect(
        sumByBalance({
          ...fixtures.MockMemorandum,
          amount: '100',
          balance: MemorandumBalance.CREDIT
        })
      ).toStrictEqual(-100)
    })
  })

  describe('useAdjustedOriginalInvoices', () => {
    it('takes original invoices of Invoice document and converts them to dropdown options array', () => {
      const { result: emptyResult } = renderHook(() =>
        useAdjustedOriginalInvoices({})
      )

      expect(emptyResult.current).toEqual([])

      const { result: filledResult } = renderHook(() =>
        useAdjustedOriginalInvoices({
          invoiceKind: InvoiceKind.CONSOLIDATED,
          originalInvoices: { nodes: [fixtures.MockInvoice] }
        })
      )

      expect(filledResult.current).toEqual([
        {
          text: [
            'addModal.fields.originalInvoice.optionText',
            {
              adjustedDueAmount: '$2,045.00',
              originalDocumentNumber: 377249
            }
          ],
          value: 'VjEtSW52b2ljZS0zNzcyNDk'
        }
      ])
    })
  })
})
