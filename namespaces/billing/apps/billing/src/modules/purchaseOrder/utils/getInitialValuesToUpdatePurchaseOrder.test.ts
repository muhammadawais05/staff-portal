import { getInitialValuesToUpdatePurchaseOrder } from '.'

describe('#getInitialValuesToUpdatePurchaseOrder', () => {
  it('returns proper values', () => {
    const actual = getInitialValuesToUpdatePurchaseOrder({
      poNumber: '123',
      id: '123',
      client: { id: 'client-id', fullName: 'Client name' },
      purchaseOrderLines: {
        nodes: [
          {
            id: '1',
            poLineNumber: '0',
            archived: false
          }
        ]
      }
    })
    const expected = {
      clientName: 'Client name',
      number: '123',
      purchaseOrderLinesAttributes: [
        {
          amount: undefined,
          disabled: true,
          expiryDate: undefined,
          id: '1',
          number: '0',
          threshold: undefined
        }
      ]
    }

    expect(actual).toEqual(expected)
  })

  it('filters out archived items', () => {
    const actual = getInitialValuesToUpdatePurchaseOrder({
      poNumber: '123',
      id: '123',
      client: { id: 'client-id', fullName: 'Client name' },
      purchaseOrderLines: {
        nodes: [
          {
            id: '1',
            poLineNumber: '0',
            archived: true
          }
        ]
      }
    })

    const expected = {
      clientName: 'Client name',
      number: '123',
      purchaseOrderLinesAttributes: []
    }

    expect(actual).toEqual(expected)
  })
})
