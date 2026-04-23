import { Scalars } from '@staff-portal/graphql/staff'

import { OpportunityJobFragment } from '../data'
import { sortByCreatedAtDate } from '.'

describe('Sort by createdAt date utility', () => {
  it('when first after second', () => {
    const firstCreatedAt: Scalars['Time'] = '2021-01-09T18:30:03+03:00'
    const secondCreatedAt: Scalars['Time'] = '2021-02-09T18:30:03+03:00'

    const first = {
      createdAt: firstCreatedAt
    } as OpportunityJobFragment
    const second = {
      createdAt: secondCreatedAt
    } as OpportunityJobFragment

    const notSorted = [first, second]

    expect(notSorted.sort(sortByCreatedAtDate)).toEqual([second, first])
  })

  it('when first before second', () => {
    const firstCreatedAt: Scalars['Time'] = '2021-02-09T18:30:03+03:00'
    const secondCreatedAt: Scalars['Time'] = '2021-01-09T18:30:03+03:00'

    const first = {
      createdAt: firstCreatedAt
    } as OpportunityJobFragment
    const second = {
      createdAt: secondCreatedAt
    } as OpportunityJobFragment

    const notSorted = [first, second]

    expect(notSorted.sort(sortByCreatedAtDate)).toEqual([first, second])
  })

  it('when first equal to the second', () => {
    const createdAt: Scalars['Time'] = '2021-01-09T18:30:03+03:00'

    const first = {
      createdAt
    } as OpportunityJobFragment
    const second = {
      createdAt
    } as OpportunityJobFragment

    const notSorted = [first, second]

    expect(notSorted.sort(sortByCreatedAtDate)).toEqual([first, second])
  })
})
