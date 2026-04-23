import { gql } from '@staff-portal/data-layer-service'

export const TALENT_JOB_PREFERENCES_FRAGMENT = gql`
  fragment TalentJobPreferencesFragment on TalentJobPreferences {
    status
    commitments {
      commitment
      status
    }
    workTypes {
      workType
      status
    }
    excludeSkillNames {
      skillName
      status
    }
    skillNames {
      skillName
      status
    }
    enterpriseProjects {
      enterpriseProjects
      status
    }
  }
`
