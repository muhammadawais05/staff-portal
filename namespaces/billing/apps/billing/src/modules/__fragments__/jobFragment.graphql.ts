import { gql } from '@apollo/client'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'

import { feedbackReasonFragment } from './feedbackReasonFragment.graphql'

export const jobFragment = gql`
  fragment JobFragment on Job {
    cumulativeStatus
    currentInvestigation {
      startedAt
    }
    engagementEndedFeedbackReason {
      ...FeedbackReasonFragment
    }
    hiredCount
    id
    matcherCallScheduled
    status
    talentCount
    title
    webResource {
      ...WebResourceFragment
    }
  }

  ${feedbackReasonFragment}
  ${webResourceFragment}
`
