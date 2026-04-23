import { NOT_SELECTED_OPTION } from '@staff-portal/config'

import { mapPurchaseOrdersToSelectOptions } from './map-purchase-orders-to-select-options'

describe('#mapPurchaseOrdersToSelectOptions', () => {
  it('maps input to text label entries', () => {
    expect(
      mapPurchaseOrdersToSelectOptions(
        [
          {
            id: '1',
            poNumber: 'po-number1',
            webResource: { url: '', text: '' }
          },
          {
            id: '2',
            budgetLeft: '500',
            poNumber: 'po-number2',
            webResource: { url: '', text: '' }
          },
          {
            id: '3',
            budgetLeft: '500',
            poLineNumber: 'po-line-number3',
            webResource: { url: '', text: '' }
          },
          {
            id: '4',
            budgetLeft: '40',
            poLineNumber: 'po-line-number4',
            webResource: { url: '', text: '' }
          },
          {
            id: '5',
            budgetLeft: null,
            poLineNumber: 'po-line-number5',
            webResource: { url: '', text: '' }
          }
        ],
        '4',
        '3'
      )
    ).toStrictEqual([
      NOT_SELECTED_OPTION,
      { text: 'po-number1', value: '1' },
      { text: 'po-number2', value: '2' },
      { text: 'po-line-number3 - $500.00 left - Next on Job', value: '3' },
      { text: 'po-line-number4 - $40.00 left - Current on Job', value: '4' },
      { text: 'po-line-number5', value: '5' }
    ])
  })

  it('handles empty input', () => {
    expect(mapPurchaseOrdersToSelectOptions([])).toStrictEqual([
      NOT_SELECTED_OPTION
    ])
  })
})
