import { gql } from '@staff-portal/data-layer-service'

export const JOB_EDIT_VERTICAL_FRAGMENT = gql`
  fragment JobEditVerticalFragment on Vertical {
    id
    skillCategories {
      nodes {
        id
        description
        position
        title
      }
    }
    defaultSkillCategory {
      id
      description
      title
      position
    }
  }
`
