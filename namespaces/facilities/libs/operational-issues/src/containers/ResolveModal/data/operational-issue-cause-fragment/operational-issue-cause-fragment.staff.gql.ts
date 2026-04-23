import { gql } from '@staff-portal/data-layer-service'

export const OPERATIONAL_ISSUE_CAUSE_FRAGMENT = gql`
  fragment OperationalIssueCauseFragment on OperationalIssueCauseTemplate {
    id
    name
    __typename
  }
`
