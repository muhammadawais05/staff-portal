import { SourcingRequestsListItemFragment } from '../../data/sourcing-requests-list-item-fragment/sourcing-requests-list-item-fragment.staff.gql.types'
import { getSourcingRequestSkills } from './get-sourcing-request-skills'

describe('getSourcingRequestSkills', () => {
  describe('when there are no skills', () => {
    it('returns empty lists', () => {
      expect(
        getSourcingRequestSkills({
          skillSets: undefined
        } as SourcingRequestsListItemFragment)
      ).toStrictEqual({ mustHaveSkills: [], niceToHaveSkills: [] })

      expect(
        getSourcingRequestSkills({
          skillSets: { nodes: [], totalCount: 0 }
        } as unknown as SourcingRequestsListItemFragment)
      ).toStrictEqual({ mustHaveSkills: [], niceToHaveSkills: [] })
    })
  })

  describe('when there are skills', () => {
    it('returns must have and nice to have skills', () => {
      expect(
        getSourcingRequestSkills({
          skillSets: {
            nodes: [
              { id: '1', niceToHave: true },
              { id: '2', niceToHave: false },
              { id: '3', niceToHave: true }
            ],
            totalCount: 0
          }
        } as SourcingRequestsListItemFragment)
      ).toStrictEqual({
        mustHaveSkills: [{ id: '2', niceToHave: false }],
        niceToHaveSkills: [
          { id: '1', niceToHave: true },
          { id: '3', niceToHave: true }
        ]
      })
    })
  })
})
