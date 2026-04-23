import { gql } from '@staff-portal/data-layer-service'

export const ENGAGEMENT_CLIENT_IN_TALENT_SECTION_FRAGMENT = gql`
  fragment EngagementClientInTalentSectionFragment on Client {
    id
    netTerms
    enterprise
    preferredBillingOption {
      id
      billingMethod
      discountable
    }
  }
`
