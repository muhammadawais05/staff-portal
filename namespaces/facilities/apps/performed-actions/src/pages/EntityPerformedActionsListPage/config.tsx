import { PerformedActionEntitiesData } from './types'
import { useGetTalentFilters } from './entities/Talent/hooks'
import { useGetOpportunitySearchData } from './entities/Opportunity/hooks'
import {
  useGetStaffAbilityFilters,
  useGetStaffAbilitySearchData
} from './entities/StaffAbility/hooks'

export const PERFORMED_ACTION_ENTITIES_DATA: PerformedActionEntitiesData = {
  clients: {
    entityType: 'Client'
  },
  company_representatives: {
    entityType: 'CompanyRepresentative'
  },
  invoices: {
    entityType: 'Invoice'
  },
  jobs: {
    entityType: 'Job'
  },
  leaders: {
    entityType: 'Leader'
  },
  operational_issues: {
    entityType: 'OperationalIssue'
  },
  opportunities: {
    entityType: 'Opportunity',
    useGetSearchData: useGetOpportunitySearchData
  },
  payments: {
    entityType: 'Payment'
  },
  payment_groups: {
    entityType: 'PaymentGroup'
  },
  project_opportunities: {
    entityType: 'Opportunity',
    useGetSearchData: useGetOpportunitySearchData
  },
  smb_opportunities: {
    entityType: 'Opportunity',
    useGetSearchData: useGetOpportunitySearchData
  },
  staff: {
    entityType: 'Staff'
  },
  talents: {
    entityType: 'Talent',
    useGetFilters: useGetTalentFilters
  },
  talent_partners: {
    entityType: 'TalentPartner'
  },
  referral_partners: {
    entityType: 'ReferralPartner'
  },
  permissions: {
    entityType: 'StaffAbility',
    useGetFilters: useGetStaffAbilityFilters,
    useGetSearchData: useGetStaffAbilitySearchData
  }
}
