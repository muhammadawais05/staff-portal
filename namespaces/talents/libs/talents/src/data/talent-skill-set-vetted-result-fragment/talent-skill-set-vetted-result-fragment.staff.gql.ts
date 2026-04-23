import { gql } from '@staff-portal/data-layer-service'

export const TALENT_SKILL_SET_VETTED_RESULT_FRAGMENT = gql`
  fragment TalentSkillSetVettedResultFragment on VettedResult {
    result
    engagementsCount
    skillConnectionsCount
    workingHoursCount
    quartiles {
      engagements25
      engagements75
      skillConnections25
      skillConnections75
      workingHours25
      workingHours75
    }
    comment
    createdAt
    reason
    performer {
      id
      fullName
    }
  }
`
