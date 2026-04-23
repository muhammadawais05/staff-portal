import fixtures from '@staff-portal/billing/src/_fixtures'

import {
  filterByClientsOrIds,
  getSortedUniqueClientsWithId,
  mapEngagementListFields,
  sortByField
} from '.'
import { Engagements } from '../../../components/EngagementsTable/EngagementsTable'
import { SortField } from '../components/Sorter/Sorter'

const engagements = fixtures.MockGetConsolidationDefaultsModal.data.node
  .hierarchy.engagements.nodes as unknown as Engagements

describe('getSortedUniqueClients', () => {
  describe('when no consolidationDefaultId is provided', () => {
    it('returns a unique set of client IDs sorted by fullName', () => {
      const uniqueClients = getSortedUniqueClientsWithId(engagements)

      expect(uniqueClients).toMatchObject([
        { id: 'VjEtQ2xpZW50LTQ4NjMwOQ', fullName: 'Bayer-Shields TD #2292125' },
        {
          id: 'VjEtQ2xpZW50LTE5MTcyOQ',
          fullName: 'Beier, Kilback and Yost #762234'
        },
        {
          id: 'VjEtQ2xpZW50LTQ5MzEzNg',
          fullName: 'Breitenberg-Reichert RZ #2325716'
        },
        {
          id: 'VjEtQ2xpZW50LTQ4OTMwOQ',
          fullName: 'Effertz-Langworth PP #2306461'
        },
        {
          id: 'VjEtQ2xpZW50LTQ5ODU5Mw',
          fullName: 'Fritsch, Stark and Romaguera #2351814'
        },
        {
          id: 'VjEtQ2xpZW50LTUwMDY5Mg',
          fullName: 'Gislason-Streich KI #2363569'
        },
        {
          id: 'VjEtQ2xpZW50LTQ5MTg1Mg',
          fullName: 'Larson, Nikolaus and Bergnaum #2321587'
        },
        { id: 'VjEtQ2xpZW50LTUyOTc3OA', fullName: 'Schmidt-Stark CN #2551992' },
        { id: 'VjEtQ2xpZW50LTQ5MjgwNQ', fullName: 'Schmitt-Bosco SG #2325039' },
        {
          id: 'VjEtQ2xpZW50LTQyMzc0Nw',
          fullName: 'Wilkinson-Harber HR #1930172'
        }
      ])
    })
  })

  describe('when consolidationDefaultId is provided', () => {
    it('does not return clients that have no working engagements but returns those that have CDs that match provided consolidationDefaultId', () => {
      const uniqueClients = getSortedUniqueClientsWithId(
        engagements,
        'VjEtQ29uc29saWRhdGlvbkRlZmF1bHQtMg'
      )

      // Schmidt-Stark CN #2551992 does not have working engagements, not expected to be in the list
      expect(
        uniqueClients.some(client => client.id === 'VjEtQ2xpZW50LTUyOTc3OA')
      ).toBe(false)
      // Gislason-Streich KI #2363569 does not have working
      // engagements either, but one engagement belongs to a CD that matches provided consolidationDefaultId
      expect(
        uniqueClients.some(client => client.id === 'VjEtQ2xpZW50LTUwMDY5Mg')
      ).toBe(true)
    })
  })
})

describe('mapEngagementListFields', () => {
  it('picks between engagement & job level PO lines properly', () => {
    const mockEngagements = [
      {
        purchaseOrderLine: {
          poLineNumber: 'engagementPO'
        },
        job: {}
      },
      {
        purchaseOrderLine: {
          poLineNumber: 'engagementPO'
        },
        job: {
          purchaseOrderLine: {
            poLineNumber: 'jobPO'
          }
        }
      },
      {
        purchaseOrderLine: null,
        job: {
          purchaseOrderLine: {
            poLineNumber: 'jobPO'
          }
        }
      }
    ] as Engagements
    const result = mockEngagements.map(mapEngagementListFields)

    expect(result).toMatchObject([
      {
        effectivePurchaseOrder: {
          poLineNumber: 'engagementPO'
        }
      },
      {
        effectivePurchaseOrder: {
          poLineNumber: 'engagementPO'
        }
      },
      {
        effectivePurchaseOrder: {
          poLineNumber: 'jobPO'
        }
      }
    ])
  })
})

describe('filterByClientsOrIds', () => {
  it('returns a filtered array of engagements by their client ids. or engagement ids.', () => {
    const clientIds = [
      'VjEtQ2xpZW50LTQ4OTMwOQ',
      'VjEtQ2xpZW50LTQ5MTg1Mg',
      'VjEtQ2xpZW50LTQ5MjgwNQ'
    ]
    const engagementIds = ['VjEtRW5nYWdlbWVudC0yMjM3MTQ']
    const result = engagements.filter(
      filterByClientsOrIds(engagementIds, clientIds)
    )

    expect(result).toMatchObject([
      {
        id: 'VjEtRW5nYWdlbWVudC0yMjM3MTQ'
      },
      {
        id: 'VjEtRW5nYWdlbWVudC0yNDgyNzY'
      },
      {
        id: 'VjEtRW5nYWdlbWVudC0yNDg0MDk'
      },
      {
        id: 'VjEtRW5nYWdlbWVudC0yNjIwMzY'
      },
      {
        id: 'VjEtRW5nYWdlbWVudC0yNDIzOTk'
      },
      {
        id: 'VjEtRW5nYWdlbWVudC0yNjE2NjY'
      },
      {
        id: 'VjEtRW5nYWdlbWVudC0yNjI2OTU'
      },
      {
        id: 'VjEtRW5nYWdlbWVudC0yNTE0Nzc'
      },
      {
        id: 'VjEtRW5nYWdlbWVudC0yNDUyNDc'
      }
    ])
  })
})

describe('sortByField', () => {
  it('sorts an array by a string field', () => {
    const result = engagements.slice(0, 5).sort(
      sortByField({
        name: 'talent.fullName',
        dataType: 'string'
      } as SortField)
    )

    expect(result).toMatchObject([
      {
        id: 'VjEtRW5nYWdlbWVudC0yMzc1NjQ'
      },
      {
        id: 'VjEtRW5nYWdlbWVudC0yMjIyNjI'
      },
      {
        id: 'VjEtRW5nYWdlbWVudC0yMjU4NzQ'
      },
      {
        id: 'VjEtRW5nYWdlbWVudC0yMjI0MjU'
      },
      {
        id: 'VjEtRW5nYWdlbWVudC0yMTU5NDU'
      }
    ])
  })

  it('sorts an array of engagements by a number field - empty values first', () => {
    const input = [
      { num: 345 },
      { num: 0 },
      { num: 12 },
      { num: null },
      { num: 4.568 },
      { num: 25 },
      { num: undefined }
    ]
    const result = input.sort(
      sortByField({
        name: 'num',
        dataType: 'number',
        emptyLast: false
      } as SortField)
    )

    expect(result).toMatchObject([
      { num: 0 },
      { num: null },
      { num: undefined },
      { num: 4.568 },
      { num: 12 },
      { num: 25 },
      { num: 345 }
    ])
  })

  it('sorts an array of engagements by a number field - empty values last', () => {
    const input = [
      { num: 345 },
      { num: 0 },
      { num: 12 },
      { num: null },
      { num: 4.568 },
      { num: 25 },
      { num: undefined }
    ]
    const result = input.sort(
      sortByField({
        name: 'num',
        dataType: 'number',
        emptyLast: true
      } as SortField)
    )

    expect(result).toMatchObject([
      { num: 4.568 },
      { num: 12 },
      { num: 25 },
      { num: 345 },
      { num: 0 },
      { num: null },
      { num: undefined }
    ])
  })
})
