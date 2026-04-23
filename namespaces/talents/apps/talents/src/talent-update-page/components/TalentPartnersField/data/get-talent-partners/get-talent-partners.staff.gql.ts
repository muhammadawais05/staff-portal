import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetTalentPartners {
    viewer {
      permits {
        assignTalentPartner
      }
    }

    talentPartners(
      filter: { scope: ACTIVE }
      order: { field: FULL_NAME, direction: ASC }
      pagination: { limit: 200, offset: 0 }
    ) {
      nodes {
        ... on TalentPartner {
          id
          fullName
        }
      }
    }
  }
`
