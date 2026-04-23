import { gql } from '@staff-portal/data-layer-service'

export const TALENT_PITCH_FRAGMENT = gql`
  fragment TalentPitchFragment on TalentPitch {
    id
    createdAt

    skillItems {
      nodes {
        skillSet {
          id
          skill {
            id
          }
        }
      }
    }

    designPortfolioItems {
      nodes {
        portfolioItem {
          id
        }
      }
    }

    industryItems {
      nodes {
        industry {
          id
          name
        }
      }
    }

    highlights {
      nodes {
        additionalText

        ... on TalentPitchCertificationItem {
          certification {
            id
          }
        }
        ... on TalentPitchEducationItem {
          education {
            id
          }
        }
        ... on TalentPitchEmploymentItem {
          employment {
            id
          }
        }
        ... on TalentPitchMentorshipItem {
          mentorApplication {
            id
          }
        }
        ... on TalentPitchPortfolioItem {
          portfolioItem {
            id
          }
        }
        ... on TalentPitchPublicationItem {
          publication {
            id
          }
        }
      }
    }
  }
`
