import { gql } from '@staff-portal/data-layer-service'

export const DRAFT_JOB_SKILL_SET_FRAGMENT = gql`
  fragment DraftJobSkillSetFragment on DraftJobSkillSet {
    skillSetId
    skillName
    main
    skillCategory {
      id
    }
    niceToHave
    rating
  }
`
