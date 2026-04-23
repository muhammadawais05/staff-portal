import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetAdditionalStatusMessagesData(
    $attributes: NewEngagementWizardAttributes!
    $includeUnrealisticRate: Boolean!
  ) {
    newEngagementWizard(attributes: $attributes) {
      talentHasAppropriateSpecialization

      talent @include(if: $includeUnrealisticRate) {
        id
        unrealisticOnRate
      }
    }
  }
`
