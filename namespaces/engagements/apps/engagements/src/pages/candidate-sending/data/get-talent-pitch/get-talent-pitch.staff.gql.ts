import { gql } from '@staff-portal/data-layer-service'
import { TALENT_PITCH_FRAGMENT } from '@staff-portal/talents-card-builder'

export default gql`
  query GetTalentPitch($attributes: NewEngagementWizardAttributes!) {
    newEngagementWizard(step: PITCH, attributes: $attributes) {
      talentPitch {
        ...TalentPitchFragment
      }
    }
  }

  ${TALENT_PITCH_FRAGMENT}
`
