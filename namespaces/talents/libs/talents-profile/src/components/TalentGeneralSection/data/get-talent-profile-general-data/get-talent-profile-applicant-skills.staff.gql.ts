import { gql } from '@staff-portal/data-layer-service'

export const GET_TALENT_PROFILE_APPLICANT_SKILLS = gql`
  query GetTalentProfileApplicantSkills($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        applicantSkills {
          nodes {
            id
            name
          }
        }
      }
    }
  }
`
