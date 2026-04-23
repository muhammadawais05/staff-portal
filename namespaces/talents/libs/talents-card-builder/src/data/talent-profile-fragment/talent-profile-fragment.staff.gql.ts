import { gql } from '@staff-portal/data-layer-service'

export const TALENT_PROFILE_FRAGMENT = gql`
  fragment TalentProfileFragment on Talent {
    id
    fullName
    type
    isMentor
    photo {
      default
    }
    timeZone {
      name
    }

    resumePublications {
      nodes {
        ... on ResumePublication {
          id
          title
          url
          excerpt
        }
        title
      }
    }

    profileV2 {
      id
      updatedByTalentAt
      city

      skillSets {
        nodes {
          id
          experience
          connections {
            nodes {
              ... on Certification {
                id
              }
              ... on Education {
                id
              }
              ... on Employment {
                id
              }
              ... on PortfolioItem {
                id
                kind
              }
              ... on Profile {
                id
              }
            }
          }
          skill {
            id
            name
          }
        }
      }

      industries: industrySets {
        nodes {
          id
          connections {
            nodes {
              ... on Employment {
                id
              }
              ... on PortfolioItem {
                id
                kind
              }
              ... on Profile {
                id
              }
            }
          }
          industry {
            id
            name
          }
        }
      }

      portfolioItems {
        nodes {
          id
          title
          description
          kind
          link
          coverImage
        }
      }

      employments {
        nodes {
          id
          company
          position
          experienceItems
          startDate
          endDate
        }
      }

      educations {
        nodes {
          id
          title
          location
          fieldOfStudy
          degree
          yearFrom
          yearTo
        }
      }

      certifications {
        nodes {
          id
          certificate
          institution
          validFromMonth
          validFromYear
          validToMonth
          validToYear
        }
      }
    }
  }
`
