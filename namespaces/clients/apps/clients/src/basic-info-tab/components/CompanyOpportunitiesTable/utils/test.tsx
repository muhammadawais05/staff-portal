import { OpportunityFragment } from '@staff-portal/opportunities'

import { getJobsCount, getOpportunityType, getPendingTasksCount } from '.'

describe('CompanyOpportunitiesTable utils', () => {
  describe.each([
    ['Opportunity', 'Enterprise'],
    ['SMBOpportunity', 'SMB'],
    ['ProjectOpportunity', 'Projects'],
    [undefined, '']
  ])('#getOpportunityType', (variant, type) => {
    describe(`when variant is ${JSON.stringify(variant)}`, () => {
      it(`return the following type ${type}`, () => {
        expect(getOpportunityType(variant)).toBe(type)
      })
    })
  })

  describe('get pending tasks count', () => {
    it('returns only pending tasks', () => {
      const opportunity = {
        tasks: {
          nodes: [
            {
              status: 'finished'
            },
            {
              status: 'pending'
            },
            {
              status: 'pending'
            },
            {
              status: 'some wrong status'
            }
          ]
        }
      } as OpportunityFragment

      expect(getPendingTasksCount(opportunity)).toBe(2)
    })

    it('works with empty list', () => {
      const opportunity = {} as OpportunityFragment

      expect(getPendingTasksCount(opportunity)).toBe(0)
    })
  })

  describe('get jobs count', () => {
    it('returns jobs count if any exists', () => {
      const opportunity = {
        jobs: {
          nodes: [{}, {}, {}]
        }
      } as OpportunityFragment

      expect(getJobsCount(opportunity)).toBe(3)
    })

    it('works with empty list', () => {
      const opportunity = {} as OpportunityFragment

      expect(getJobsCount(opportunity)).toBe(0)
    })
  })
})
