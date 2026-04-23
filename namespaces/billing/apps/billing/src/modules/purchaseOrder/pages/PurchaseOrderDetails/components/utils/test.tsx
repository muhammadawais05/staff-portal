import fixtures from '@staff-portal/billing/src/_fixtures'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import { GetPurchaseOrderDetailsNodeFragment } from '../../data/getPurchaseOrderDetails.graphql.types'
import getPurchaseOrderDetailsTableContent, {
  getTableContentForPurchaseOrderLines
} from '.'

jest.mock('../PurchaseOrderPropertyEditor')

describe('#getPurchaseOrderDetailsTableContent', () => {
  describe('when `activePropertyEditor` is undefined', () => {
    it('returns the required items', () => {
      const [
        company,
        number,
        amount,
        threshold,
        invoiceTotal,
        draftedTotal,
        expDate
      ] = getPurchaseOrderDetailsTableContent({
        purchaseOrder: fixtures.MockPurchaseOrders.nodes[0],
        activePropertyEditor: undefined,
        handleSetActiveEditor: jest.fn(),
        handleUnSetActiveEditor: jest.fn()
      })

      expect(company.label).toBe('Company')
      expect(JSON.stringify(company.value)).toContain(
        'url":"http://localhost:3000/platform/staff/clients/10000"'
      )

      expect(number.label).toBe('Number')
      expect(number.value).toBe('PO-1722')

      expect(amount.label).toBe('Amount')
      expect(JSON.stringify(amount.value)).toContain('"isToggled":false')

      expect(threshold.label).toBe('Threshold')
      expect(JSON.stringify(threshold.value)).toContain('"isToggled":false')

      expect(invoiceTotal.label).toBe('Invoiced total')
      expect(JSON.stringify(invoiceTotal.value)).toContain(
        '"displayName":"PurchaseOrderAmount"'
      )

      expect(draftedTotal.label).toBe('Drafted total')
      expect(draftedTotal.value).toBe('$0.00')

      expect(expDate.label).toBe('Expiration date')
      expect(JSON.stringify(expDate.value)).toContain('"isToggled":false')
    })
  })

  describe('when `activePropertyEditor` is `amount`', () => {
    it('returns the required items', () => {
      const [
        company,
        number,
        amount,
        threshold,
        invoiceTotal,
        draftedTotal,
        expDate
      ] = getPurchaseOrderDetailsTableContent({
        purchaseOrder: fixtures.MockPurchaseOrders.nodes[0],
        activePropertyEditor: 'amount',
        handleSetActiveEditor: jest.fn(),
        handleUnSetActiveEditor: jest.fn()
      })

      expect(company.label).toBe('Company')
      expect(JSON.stringify(company.value)).toContain(
        'url":"http://localhost:3000/platform/staff/clients/10000"'
      )

      expect(number.label).toBe('Number')
      expect(number.value).toBe('PO-1722')

      expect(amount.label).toBe('Amount')
      expect(JSON.stringify(amount.value)).toContain('"isToggled":true')

      expect(threshold.label).toBe('Threshold')
      expect(JSON.stringify(threshold.value)).toContain('"isToggled":false')

      expect(invoiceTotal.label).toBe('Invoiced total')
      expect(JSON.stringify(invoiceTotal.value)).toContain(
        '"displayName":"PurchaseOrderAmount"'
      )

      expect(draftedTotal.label).toBe('Drafted total')

      expect(draftedTotal.value).toBe('$0.00')

      expect(expDate.label).toBe('Expiration date')
      expect(JSON.stringify(expDate.value)).toContain('"isToggled":false')
    })
  })

  describe('when `activePropertyEditor` is `threshold`', () => {
    it('returns the required items', () => {
      const [
        company,
        number,
        amount,
        threshold,
        invoiceTotal,
        draftedTotal,
        expDate
      ] = getPurchaseOrderDetailsTableContent({
        purchaseOrder: fixtures.MockPurchaseOrders.nodes[0],
        activePropertyEditor: 'threshold',
        handleSetActiveEditor: jest.fn(),
        handleUnSetActiveEditor: jest.fn()
      })

      expect(company.label).toBe('Company')
      expect(JSON.stringify(company.value)).toContain(
        'url":"http://localhost:3000/platform/staff/clients/10000"'
      )

      expect(number.label).toBe('Number')
      expect(number.value).toBe('PO-1722')

      expect(amount.label).toBe('Amount')
      expect(JSON.stringify(amount.value)).toContain('"isToggled":false')

      expect(threshold.label).toBe('Threshold')
      expect(JSON.stringify(threshold.value)).toContain('"isToggled":true')

      expect(invoiceTotal.label).toBe('Invoiced total')
      expect(JSON.stringify(invoiceTotal.value)).toContain(
        '"displayName":"PurchaseOrderAmount"'
      )

      expect(draftedTotal.label).toBe('Drafted total')

      expect(draftedTotal.value).toBe('$0.00')

      expect(expDate.label).toBe('Expiration date')
      expect(JSON.stringify(expDate.value)).toContain('"isToggled":false')
    })
  })

  describe('when `activePropertyEditor` is `expiryDate`', () => {
    it('returns the required items', () => {
      const [
        company,
        number,
        amount,
        threshold,
        invoiceTotal,
        draftedTotal,
        expDate
      ] = getPurchaseOrderDetailsTableContent({
        purchaseOrder: fixtures.MockPurchaseOrders.nodes[0],
        activePropertyEditor: 'expiryDate',
        handleSetActiveEditor: jest.fn(),
        handleUnSetActiveEditor: jest.fn()
      })

      expect(company.label).toBe('Company')
      expect(JSON.stringify(company.value)).toContain(
        'url":"http://localhost:3000/platform/staff/clients/10000"'
      )

      expect(number.label).toBe('Number')
      expect(number.value).toBe('PO-1722')

      expect(amount.label).toBe('Amount')
      expect(JSON.stringify(amount.value)).toContain('"isToggled":false')

      expect(threshold.label).toBe('Threshold')
      expect(JSON.stringify(threshold.value)).toContain('"isToggled":false')

      expect(invoiceTotal.label).toBe('Invoiced total')
      expect(JSON.stringify(invoiceTotal.value)).toContain(
        '"displayName":"PurchaseOrderAmount"'
      )

      expect(draftedTotal.label).toBe('Drafted total')

      expect(draftedTotal.value).toBe('$0.00')

      expect(expDate.label).toBe('Expiration date')
      expect(JSON.stringify(expDate.value)).toContain('"isToggled":true')
    })
  })
})

describe('#getTableContentForPurchaseOrderLines', () => {
  it('returns the required items', () => {
    const table = getTableContentForPurchaseOrderLines({
      totalAmount: '100.0'
    } as GetPurchaseOrderDetailsNodeFragment)

    const totalAmount = table[table.length - 1]

    expect(totalAmount.label).toBe('Total Amount')

    expect(JSON.stringify(totalAmount.value)).toContain('"amount":"100.0"')
  })

  describe('when total amount is nil', () => {
    it('returns EMPTY_DATA', () => {
      const table = getTableContentForPurchaseOrderLines({
        totalAmount: null
      } as GetPurchaseOrderDetailsNodeFragment)

      const totalAmount = table[table.length - 1]

      expect(totalAmount.label).toBe('Total Amount')

      expect(JSON.stringify(totalAmount.value)).toContain(EMPTY_DATA)
    })
  })
  describe('when total amount is 0', () => {
    it('returns EMPTY_DATA', () => {
      const table = getTableContentForPurchaseOrderLines({
        totalAmount: '0'
      } as GetPurchaseOrderDetailsNodeFragment)

      const totalAmount = table[table.length - 1]

      expect(totalAmount.label).toBe('Total Amount')

      expect(JSON.stringify(totalAmount.value)).toContain('0')
    })
  })
})
