import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetSkillsStepData($attributes: NewEngagementWizardAttributes!) {
    newEngagementWizard(step: SKILLS, attributes: $attributes) {
      ...SkillsStepData
    }
  }

  fragment SkillsStepData on NewEngagementWizard {
    talent {
      id
      webResource {
        url
        text
      }
    }
    skillSetToVet {
      id
      skill {
        id
        name
      }
    }
  }
`
