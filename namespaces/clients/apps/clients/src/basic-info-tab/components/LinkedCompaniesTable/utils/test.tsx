import { filterBadLeadCompanies } from '.'
import { LinkedCompanyNodeFragment } from '../../LinkedCompaniesSection/data'

const companies: Partial<LinkedCompanyNodeFragment>[] = [
  { id: '1', badLead: true },
  { id: '2', badLead: false },
  { id: '3', badLead: false },
  { id: '4', badLead: true }
]

describe('LinkedCompanieSection utils', () => {
  describe('filterBadLeadCompanies', () => {
    it('returns all companies', () => {
      expect(
        filterBadLeadCompanies(companies as LinkedCompanyNodeFragment[], true)
      ).toEqual(companies)
    })

    it('filters out bad lead companies', () => {
      expect(
        filterBadLeadCompanies(companies as LinkedCompanyNodeFragment[], false)
      ).toEqual([
        { id: '2', badLead: false },
        { id: '3', badLead: false }
      ])
    })
  })
})
