import { gql } from '@staff-portal/data-layer-service'

export const OWNED_OPERATIONAL_ISSUE_FRAGMENT = gql`
  fragment OwnedOperationalIssueFragment on OperationalIssue {
    id
    description
    descriptionWithLinks: description(includeLinks: true)
    lastTimeOccurredAt
    occurrencesCount
    template {
      id
      name
      recommendedSolutions
    }
  }
`
