import { gql } from '@staff-portal/data-layer-service'

export const JOB_SKILL_SET_FRAGMENT = gql`
  fragment JobSkillSetFragment on SkillSet {
    id
    rating
    main
    niceToHave
    skill {
      id
      name
    }
  }
`
