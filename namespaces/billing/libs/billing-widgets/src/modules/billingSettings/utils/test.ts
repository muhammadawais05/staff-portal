import { NOT_SELECTED_OPTION } from '@staff-portal/config'

import { mapEngagementToListOption, mapPurchaseOrdersToListOptions } from './'

describe('#mapEngagementToListOption', () => {
  it('should serialize engagement to value/label object', () => {
    const input = {
      nodes: [
        { id: '1', talent: { fullName: 'John Doe' } },
        { id: '2', talent: { fullName: 'Super Man' } }
      ]
    }
    const actual = mapEngagementToListOption(input)
    const expected = [
      {
        value: '1',
        text: 'John Doe'
      },
      {
        value: '2',
        text: 'Super Man'
      }
    ]

    expect(actual).toEqual(expected)
  })

  it('should return empty object on nil cases', () => {
    const actual = mapEngagementToListOption(undefined)
    const expected = [{ text: '', value: '' }]

    expect(actual).toEqual(expected)
  })
})

describe('#mapPurchaseOrdersToListOptions', () => {
  it('should serialize purchase order to value/label object', () => {
    const input = {
      nodes: [
        {
          id: '1',
          client: { fullName: 'John Doe' },
          webResource: { text: '123' }
        },
        {
          id: '2',
          client: { fullName: 'Super Man' },
          webResource: { text: '456' }
        }
      ]
    }
    const actual = mapPurchaseOrdersToListOptions(input)
    const expected = [
      NOT_SELECTED_OPTION,
      {
        value: '1',
        text: '123 - John Doe'
      },
      {
        value: '2',
        text: '456 - Super Man'
      }
    ]

    expect(actual).toEqual(expected)
  })

  it('should return `Not Selected` on nil cases', () => {
    const actual = mapPurchaseOrdersToListOptions(undefined)

    expect(actual).toEqual([NOT_SELECTED_OPTION])
  })
})
