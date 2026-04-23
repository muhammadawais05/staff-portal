import { TalentManagementExperience } from '@staff-portal/graphql/staff'
import { asQueryParam } from '@staff-portal/query-params-state'

const MANAGEMENT_EXPERIENCE_QUERY_PARAMS = {
  [TalentManagementExperience.ALL_TALENT]: '',
  [TalentManagementExperience.ANY_LEADERSHIP]: 'any leadership',
  [TalentManagementExperience.YEARS_1]: '1+ years',
  [TalentManagementExperience.YEARS_3]: '3+ years',
  [TalentManagementExperience.YEARS_5]: '5+ years',
  [TalentManagementExperience.YEARS_10]: '10+ years'
}

const MANAGEMENT_EXPERIENCE_VALUES = {
  [MANAGEMENT_EXPERIENCE_QUERY_PARAMS.ALL_TALENT]:
    TalentManagementExperience.ALL_TALENT,
  [MANAGEMENT_EXPERIENCE_QUERY_PARAMS.ANY_LEADERSHIP]:
    TalentManagementExperience.ANY_LEADERSHIP,
  [MANAGEMENT_EXPERIENCE_QUERY_PARAMS.YEARS_1]:
    TalentManagementExperience.YEARS_1,
  [MANAGEMENT_EXPERIENCE_QUERY_PARAMS.YEARS_3]:
    TalentManagementExperience.YEARS_3,
  [MANAGEMENT_EXPERIENCE_QUERY_PARAMS.YEARS_5]:
    TalentManagementExperience.YEARS_5,
  [MANAGEMENT_EXPERIENCE_QUERY_PARAMS.YEARS_10]:
    TalentManagementExperience.YEARS_10
}

export const ManagementExperienceQueryParam = asQueryParam({
  encode: (value: TalentManagementExperience) =>
    MANAGEMENT_EXPERIENCE_QUERY_PARAMS[value] ?? '',
  decode: value => MANAGEMENT_EXPERIENCE_VALUES[value] ?? ''
})
