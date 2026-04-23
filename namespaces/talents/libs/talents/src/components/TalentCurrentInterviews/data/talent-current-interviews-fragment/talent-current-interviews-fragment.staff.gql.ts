import { gql } from '@staff-portal/data-layer-service'

const TALENT_CURRENT_INTERVIEWS_FRAGMENT = gql`
  fragment TalentCurrentInterviewsFragment on TalentCurrentInterviews {
    totalCount
    inLast2DaysCounts {
      count
      interviewStatus
      engagementStatus
    }
    inLast2To7DaysCounts {
      count
      interviewStatus
      engagementStatus
    }
  }
`

export default TALENT_CURRENT_INTERVIEWS_FRAGMENT
