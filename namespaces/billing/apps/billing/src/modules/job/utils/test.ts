import { DateTime } from 'luxon'
import fixtures from '@staff-portal/billing/src/_fixtures'

import {
  getDefaultSelectPurchaseOrder,
  getSelectFormatPurchaseOrders,
  getSelectFormatPurchaseOrdersForEditor
} from '.'

const today = DateTime.local().startOf('day').toFormat('yyyy-LL-dd')

const purchaseOrder1 = {
  invoicedAmount: '0',
  budgetLeft: '0',
  budgetSpent: false,
  draftedAmount: '0',
  id: '1234',
  poNumber: 'PO-1234',
  webResource: {
    text: ''
  }
}

const purchaseOrder2 = {
  invoicedAmount: '0',
  budgetLeft: '100',
  budgetSpent: true,
  draftedAmount: '0',
  id: '5678',
  poNumber: 'PO-5678',
  webResource: {
    text: ''
  }
}

const purchaseOrder3 = {
  invoicedAmount: '0',
  budgetLeft: '100',
  budgetSpent: false,
  draftedAmount: '0',
  expiryDate: '2100-01-21',
  id: '9012',
  poNumber: 'PO-9012',
  webResource: {
    text: ''
  }
}

const purchaseOrder4 = {
  invoicedAmount: '0',
  budgetLeft: '100',
  budgetSpent: false,
  draftedAmount: '0',
  expiryDate: '2019-01-21',
  id: '9017',
  poNumber: 'PO-9017',
  webResource: {
    text: ''
  }
}

describe('#getSelectFormatPurchaseOrdersForEditor', () => {
  describe('when no purchase orders are available', () => {
    it('returns just the empty placeholder', () => {
      expect(
        getSelectFormatPurchaseOrdersForEditor({
          currentPurchaseOrderId: '',
          nextPurchaseOrderId: '',
          purchaseOrders: []
        })
      ).toEqual([
        {
          text: 'Not Selected',
          value: ''
        }
      ])
    })

    describe('when there are purchase orders with spent budget', () => {
      it('skips them', () => {
        expect(
          getSelectFormatPurchaseOrdersForEditor({
            currentPurchaseOrderId: '',
            nextPurchaseOrderId: '',
            purchaseOrders: [purchaseOrder1, purchaseOrder2]
          })
        ).toEqual([
          {
            text: 'Not Selected',
            value: ''
          },
          {
            text: 'PO-1234',
            value: '1234'
          }
        ])
      })
    })

    describe('when there are purchase orders with budget left', () => {
      it('applies "budget left" label to the displayed values', () => {
        expect(
          getSelectFormatPurchaseOrdersForEditor({
            currentPurchaseOrderId: '',
            nextPurchaseOrderId: '',
            purchaseOrders: [purchaseOrder1, purchaseOrder3]
          })
        ).toEqual([
          {
            text: 'Not Selected',
            value: ''
          },
          {
            text: 'PO-1234',
            value: '1234'
          },
          {
            text: 'PO-9012 - $100.00 left',
            value: '9012'
          }
        ])
      })
    })
  })

  describe('when current and next purchase order ids are supplied', () => {
    it('applies current/next labels to the displayed values', () => {
      expect(
        getSelectFormatPurchaseOrdersForEditor({
          currentPurchaseOrderId: '1234',
          nextPurchaseOrderId: '9012',
          purchaseOrders: [
            purchaseOrder1,
            {
              ...purchaseOrder2,
              budgetSpent: false
            },
            purchaseOrder3
          ]
        })
      ).toEqual([
        {
          text: 'Not Selected',
          value: ''
        },
        {
          text: 'PO-1234 - Current PO',
          value: '1234'
        },
        {
          text: 'PO-5678 - $100.00 left',
          value: '5678'
        },
        {
          text: 'PO-9012 - $100.00 left - Next PO',
          value: '9012'
        }
      ])
    })
  })

  describe('when budgetLeft is falsy', () => {
    it('does not apply the "budget left" labels to the displayed values', () => {
      expect(
        getSelectFormatPurchaseOrdersForEditor({
          currentPurchaseOrderId: '',
          nextPurchaseOrderId: '',
          purchaseOrders: [
            {
              ...purchaseOrder1,
              budgetLeft: undefined
            },
            {
              ...purchaseOrder1,
              budgetLeft: ''
            },
            {
              ...purchaseOrder1,
              budgetLeft: '0'
            }
          ]
        })
      ).toEqual([
        {
          text: 'Not Selected',
          value: ''
        },
        {
          text: 'PO-1234',
          value: '1234'
        },
        {
          text: 'PO-1234',
          value: '1234'
        },
        {
          text: 'PO-1234',
          value: '1234'
        }
      ])
    })
  })

  describe('when expiryDate is available', () => {
    it('does not include expired purchase orders', () => {
      expect(
        getSelectFormatPurchaseOrdersForEditor({
          currentPurchaseOrderId: '',
          nextPurchaseOrderId: '',
          purchaseOrders: [purchaseOrder3, purchaseOrder4]
        })
      ).toEqual([
        {
          text: 'Not Selected',
          value: ''
        },
        {
          text: 'PO-9012 - $100.00 left',
          value: '9012'
        }
      ])
    })

    it('includes purchase order with expiryDate set to today', () => {
      expect(
        getSelectFormatPurchaseOrdersForEditor({
          currentPurchaseOrderId: '',
          nextPurchaseOrderId: '',
          purchaseOrders: [
            purchaseOrder3,
            {
              ...purchaseOrder4,
              expiryDate: today
            }
          ]
        })
      ).toEqual([
        {
          text: 'Not Selected',
          value: ''
        },
        {
          text: 'PO-9012 - $100.00 left',
          value: '9012'
        },
        {
          text: 'PO-9017 - $100.00 left',
          value: '9017'
        }
      ])
    })
  })

  describe('when Invoice amountWithCorrections equals 0', () => {
    it('includes purchase orders with budgetSpent', () => {
      expect(
        getSelectFormatPurchaseOrdersForEditor({
          amountWithCorrections: 0,
          currentPurchaseOrderId: '',
          nextPurchaseOrderId: '',
          purchaseOrders: [purchaseOrder1, purchaseOrder2, purchaseOrder3]
        })
      ).toEqual([
        {
          text: 'Not Selected',
          value: ''
        },
        {
          text: 'PO-1234',
          value: '1234'
        },
        {
          text: 'PO-5678 - $100.00 left',
          value: '5678'
        },
        {
          text: 'PO-9012 - $100.00 left',
          value: '9012'
        }
      ])
    })
  })
})

describe('#getSelectFormatPurchaseOrders', () => {
  describe('when a purchase orders is `[]`', () => {
    it('provide the proper purchase orders', () => {
      expect(
        getSelectFormatPurchaseOrders(
          fixtures.MockEngagement.job.client.purchaseOrders.nodes
        )
      ).toEqual([
        {
          text: 'testExample1',
          value: 'VjEtUHVyY2hhc2VPcmRlci0xNzIy'
        },
        {
          text: 'testExample1722',
          value: 'xxxxxxxx'
        }
      ])
    })
  })

  describe('when a purchase orders is `undefined', () => {
    it('provide empty list', () => {
      expect(getSelectFormatPurchaseOrders(undefined)).toEqual([])
    })
  })

  describe('#getDefaultSelectPurchaseOrder', () => {
    describe('when there is a single PO', () => {
      it('return default selection', () => {
        expect(
          getDefaultSelectPurchaseOrder([
            fixtures.MockEngagement.job.client.purchaseOrders.nodes[2]
          ])
        ).toBe('xxxxxxxx')
      })
    })

    describe('when the PO list is empty', () => {
      it('return default selection', () => {
        expect(
          getDefaultSelectPurchaseOrder(
            fixtures.MockEngagement.job.client.purchaseOrders.nodes
          )
        ).toBe('')
      })
    })

    describe('when the PO list has multiple elements', () => {
      it('return default selection', () => {
        expect(
          getDefaultSelectPurchaseOrder(
            fixtures.MockEngagement.job.client.purchaseOrders.nodes
          )
        ).toBe('')
      })
    })
  })
})
