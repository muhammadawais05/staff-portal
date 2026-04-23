import { gql } from '@staff-portal/data-layer-service'

export const TALENT_SKILL_SETS_FRAGMENT = gql`
  fragment TalentSkillSetsFragment on TalentSkillSets {
    nodes {
      ... on SkillSet {
        id
        rating
        connections {
          totalCount
        }
        skill {
          id
          name
        }
        vettedResult {
          result
        }
      }
    }
  }
`
