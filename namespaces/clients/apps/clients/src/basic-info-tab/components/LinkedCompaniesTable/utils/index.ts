import { LinkedCompanyNodeFragment } from '../../LinkedCompaniesSection/data'

export const filterBadLeadCompanies = (
  companies: LinkedCompanyNodeFragment[],
  showBadLeads: boolean
) => (showBadLeads ? companies : companies.filter(company => !company.badLead))
