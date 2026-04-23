import { gql } from '@staff-portal/data-layer-service'

export const TALENT_PARTNER_FRAGMENT = gql`
  fragment TalentPartnerFragment on Talent {
    talentPartner {
      id
      webResource {
        text
        url
      }
    }
  }
`
