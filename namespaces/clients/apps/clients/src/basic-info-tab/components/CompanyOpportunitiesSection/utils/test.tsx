import { OpportunityFragment } from '@staff-portal/opportunities'
import { Scalars } from '@staff-portal/graphql/staff'

import { sortByRecentUpdateDate } from './utils'

describe('CompanyOpportunitiesSection utils', () => {
  describe('sort by recent update date', () => {
    it('when first after second', () => {
      const firstUpdatedAt: Scalars['Time'] = '2021-01-09T18:30:03+03:00'
      const secondUpdatedAt: Scalars['Time'] = '2021-02-09T18:30:03+03:00'

      const first = {
        updatedAt: firstUpdatedAt
      } as OpportunityFragment
      const second = {
        updatedAt: secondUpdatedAt
      } as OpportunityFragment

      const notSorted = [first, second]

      expect(notSorted.sort(sortByRecentUpdateDate)).toEqual([second, first])
    })

    it('when first before second', () => {
      const firstUpdatedAt: Scalars['Time'] = '2021-02-09T18:30:03+03:00'
      const secondUpdatedAt: Scalars['Time'] = '2021-01-09T18:30:03+03:00'

      const first = {
        updatedAt: firstUpdatedAt
      } as OpportunityFragment
      const second = {
        updatedAt: secondUpdatedAt
      } as OpportunityFragment

      const notSorted = [first, second]

      expect(notSorted.sort(sortByRecentUpdateDate)).toEqual([first, second])
    })

    it('when first equal to the second', () => {
      const updatedAt: Scalars['Time'] = '2021-01-09T18:30:03+03:00'

      const first = {
        updatedAt
      } as OpportunityFragment
      const second = {
        updatedAt
      } as OpportunityFragment

      const notSorted = [first, second]

      expect(notSorted.sort(sortByRecentUpdateDate)).toEqual([first, second])
    })
  })
})
