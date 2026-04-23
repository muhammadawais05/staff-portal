import { gql } from '@staff-portal/data-layer-service'

export const TALENT_APPLICANT_SKILL_FRAGMENT = gql`
  fragment TalentApplicantSkillFragment on Skill {
    id
    name
  }
`
