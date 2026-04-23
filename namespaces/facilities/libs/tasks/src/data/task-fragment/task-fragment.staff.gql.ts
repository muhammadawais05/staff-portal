import { gql } from '@staff-portal/data-layer-service'
import {
  WEB_RESOURCE_FRAGMENT,
  ROLE_OR_CLIENT_FRAGMENT
} from '@staff-portal/facilities'

export const TASK_FRAGMENT = gql`
  fragment TaskFragment on Task {
    __typename
    id
    description
    disputed
    dueDate
    finishedWithChildTask
    priority
    relatedTime
    engagedSubjects {
      totalCount
    }
    recurringPeriod
    source
    status
    completer {
      ... on Node {
        id
      }
    }
    starred
    relatedTo: relatedToV2 {
      ... on Node {
        id
      }
      ... on ExternalTaskSubject {
        id
      }
      ...WebResourceFragment
    }
    performer {
      ...RoleOrClientFragment
    }
    commentCount
    playbookTemplate {
      id
      # required by billing-frontend in invoice and payment task cards
      identifier
      finishDisabled
      ...WebResourceFragment
    }
    clientEmailMessagingDefaultEmailTemplate {
      id
    }
  }

  ${ROLE_OR_CLIENT_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
`
