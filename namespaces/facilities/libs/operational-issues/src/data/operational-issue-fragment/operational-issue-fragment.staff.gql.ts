import { gql } from '@staff-portal/data-layer-service'

export const OPERATIONAL_ISSUE_ACTION_FRAGMENT = gql`
  fragment OperationalIssueActionFragment on OperationalIssue {
    id
    operations {
      approveOperationalIssue {
        callable
        messages
      }
      reopenOperationalIssue {
        callable
        messages
      }
      resolveOperationalIssue {
        callable
        messages
      }
      claimOperationalIssue {
        callable
        messages
      }
      verifyOperationalIssue {
        callable
        messages
      }
    }
    __typename
  }
`

export const OPERATIONAL_ISSUE_FRAGMENT = gql`
  fragment OperationalIssueFragment on OperationalIssue {
    description
    lastTimeOccurredAt
    occurrencesCount
    ...OperationalIssueActionFragment
    template {
      id
      name
      recommendedSolutions
    }
    __typename
  }
  ${OPERATIONAL_ISSUE_ACTION_FRAGMENT}
`
