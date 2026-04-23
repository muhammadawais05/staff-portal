import { TalentEnterpriseExperience } from '@staff-portal/graphql/staff'
import { asQueryParam } from '@staff-portal/query-params-state'

const ENTERPRISE_EXPERIENCE_QUERY_PARAMS = {
  [TalentEnterpriseExperience.ALL_TALENT]: '',
  [TalentEnterpriseExperience.WITH_EXPERIENCE]: 'with experience',
  [TalentEnterpriseExperience.WITHOUT_EXPERIENCE]: 'without experience'
}

const ENTERPRISE_EXPERIENCE_VALUES = {
  [ENTERPRISE_EXPERIENCE_QUERY_PARAMS.ALL_TALENT]:
    TalentEnterpriseExperience.ALL_TALENT,
  [ENTERPRISE_EXPERIENCE_QUERY_PARAMS.WITH_EXPERIENCE]:
    TalentEnterpriseExperience.WITH_EXPERIENCE,
  [ENTERPRISE_EXPERIENCE_QUERY_PARAMS.WITHOUT_EXPERIENCE]:
    TalentEnterpriseExperience.WITHOUT_EXPERIENCE
}

export const EnterpriseExperienceQueryParam = asQueryParam({
  encode: (value: TalentEnterpriseExperience) =>
    ENTERPRISE_EXPERIENCE_QUERY_PARAMS[value] ?? '',
  decode: value => ENTERPRISE_EXPERIENCE_VALUES[value] ?? ''
})
