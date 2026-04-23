import { getSelectablePurchaseOrderLineOption } from './get-selectable-purchase-order-line-option'

describe('getSelectablePurchaseOrderLineOption', () => {
  describe('when order id match the current order id', () => {
    it('adds current suffix', () => {
      expect(
        getSelectablePurchaseOrderLineOption({
          currentOrderId: '1',
          order: {
            id: '1',
            poLineNumber: '123456',
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
        getSelectablePurchaseOrderLineOption({
          currentOrderId: '2',
          order: {
            id: '1',
            poLineNumber: '123456',
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
