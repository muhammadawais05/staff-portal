import fixtures from '@staff-portal/billing/src/_fixtures'

import { consolidateJobsEngagements } from './consolidateJobsEngagements'
import { GetJobListItemFragment } from '../../job/components/data/getJobListItemFragment.graphql.types'
import { GetEngagementListItemFragment } from '../../job/components/data/getEngagementListItemFragment.graphql.types'

describe('#consolidateJobsEngagements', () => {
  describe('when a set of `jobs` and a set of `engagements` are passed', () => {
    it('returns a consolidated array for display purposes', () => {
      const jobs = fixtures.MockGetPurchaseOrderJobsList.nodes[0].jobs
        .nodes as GetJobListItemFragment[]
      const engagements = fixtures.MockGetPurchaseOrderJobsList.nodes[0]
        .engagements.nodes as GetEngagementListItemFragment[]

      const resultObj = consolidateJobsEngagements(jobs, engagements)

      expect(resultObj).toHaveLength(4)
      expect(resultObj[0]).toMatchObject({
        job: {
          id: 'VxAtSm9iLTIwNzM3Uy',
          engagements: { nodes: [] }
        },
        showJob: true,
        showEngagement: false
      })
      expect(resultObj[1]).toMatchObject({
        job: {
          id: 'VjEtSm9iLTIzMjYxNQ',
          engagements: { nodes: [{ id: 'VjEtRW5nYWdlbWVudC0yNDYzMDA' }] }
        },
        showJob: false,
        showEngagement: true
      })

      expect(resultObj[2]).toMatchObject({
        job: {
          id: 'VjEtSm9iLTIwNzM2Nw',
          engagements: { nodes: [{ id: 'VjEtRW5nYWdlbWVudC0yMjA3NDU' }] }
        },
        showJob: true,
        showEngagement: true
      })

      expect(resultObj[3]).toMatchObject({
        job: {
          id: 'VjEtSm9iLTIwNzM2Nw',
          engagements: { nodes: [{ id: 'VjEtRW5nYWdlbWVudC0yMjA3NDQ' }] }
        },
        showJob: true,
        showEngagement: true
      })
    })
  })

  describe('when `purchaseOrder` key is passed', () => {
    it('returns the consolidated array using purchase order id', () => {
      const jobs = fixtures.MockGetPurchaseOrderJobsList.nodes[0].jobs
        .nodes as GetJobListItemFragment[]
      const engagements = fixtures.MockGetPurchaseOrderJobsList.nodes[0]
        .engagements.nodes as GetEngagementListItemFragment[]

      const resultObj = consolidateJobsEngagements(
        jobs,
        engagements,
        'purchaseOrder'
      )

      expect(resultObj).toHaveLength(4)
      expect(resultObj[0]).toMatchObject({
        job: {
          id: 'VxAtSm9iLTIwNzM3Uy',
          engagements: { nodes: [] }
        },
        showJob: true,
        showEngagement: false
      })
    })
  })

  describe('when `purchaseOrderLine` key is passed', () => {
    it('returns the consolidated array using purchase order id', () => {
      const resultObj = consolidateJobsEngagements(
        [
          {
            id: 'VxAtSm9iLTIwNzM3Uy',
            purchaseOrderLine: { id: 'line-1' },
            engagements: {
              nodes: []
            }
          }
        ] as unknown as GetJobListItemFragment[],
        [
          {
            id: 'VxAtSm9iLTIwNzM3Uy',
            purchaseOrderLine: { id: 'line-123' }
          },
          {
            id: 'VxAtSm9iLTIwNzM3Uy',
            purchaseOrderLine: { id: 'line-21' }
          }
        ] as GetEngagementListItemFragment[],
        'purchaseOrderLine'
      )

      expect(resultObj[0]).toMatchObject({
        job: {
          id: 'VxAtSm9iLTIwNzM3Uy',
          engagements: { nodes: [] }
        },
        showJob: true,
        showEngagement: false
      })
    })
  })
})
