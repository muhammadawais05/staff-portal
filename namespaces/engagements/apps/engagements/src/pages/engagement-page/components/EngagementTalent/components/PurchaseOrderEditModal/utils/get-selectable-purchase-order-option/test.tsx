import { getSelectablePurchaseOrderOption } from './get-selectable-purchase-order-option'

describe('getSelectablePurchaseOrderOption', () => {
  describe('when order id match the current order id', () => {
    it('adds current suffix', () => {
      expect(
        getSelectablePurchaseOrderOption({
          currentOrderId: '1',
          order: {
            purchaseOrderLines: { nodes: [] },
            id: '1',
            poNumber: '123456',
            client: { id: '1', fullName: 'Test Company' }
          }
        })
      ).toStrictEqual({
        text: '123456 - Test Company (current)',
        value: '1'
      })
    })

    it('returns order option', () => {
      expect(
        getSelectablePurchaseOrderOption({
          currentOrderId: '2',
          order: {
            purchaseOrderLines: { nodes: [] },
            id: '1',
            poNumber: '123456',
            client: { id: '1', fullName: 'Test Company' }
          }
        })
      ).toStrictEqual({
        text: '123456 - Test Company',
        value: '1'
      })
    })
  })
})
