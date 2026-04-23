import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

export const FEEDBACK_DETAILS_FRAGMENT = gql`
  fragment FeedbackDetailsTaskFragment on Task {
    id
    createdAt
    status
  }

  fragment FeedbackDetailsReasonFragment on FeedbackReason {
    id
    name
    action {
      id
      name
      shortName
      identifier
    }
  }

  fragment FeedbackDetailsFragment on Feedback {
    id
    createdAt
    status
    outdatedComment
    comment
    targetPeriodSingleDay
    targetPeriodStartDate
    targetPeriodEndDate
    performer {
      ... on Node {
        id
      }
      ... on WebResource {
        ...WebResourceFragment
      }
    }
    reason {
      ...FeedbackDetailsReasonFragment
    }
    task {
      ...FeedbackDetailsTaskFragment
    }
    operations {
      updateFeedbackComment {
        ...OperationFragment
      }
      updateFeedbackReason {
        ...OperationFragment
      }
      markOutdatedFeedback {
        ...OperationFragment
      }
      createFeedbackClientAnswers {
        ...OperationFragment
      }
      createFeedbackMatcherAnswers {
        ...OperationFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
`
