import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetJobSummarySkills($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        fieldCheck {
          id
          skills
        }
        description
        skillSets {
          nodes {
            id
            rating
            connections {
              totalCount
            }
            skill {
              id
              name
              category {
                id
                title
                position
              }
            }
            main
            niceToHave
          }
        }
        industries {
          nodes {
            id
            name
          }
        }
      }
    }
  }

  fragment JobSummarySkillSetFragment on SkillSet {
    id
    rating
    connections {
      totalCount
    }
    skill {
      id
      name
      category {
        id
        title
        position
      }
    }
    main
    niceToHave
  }
`
