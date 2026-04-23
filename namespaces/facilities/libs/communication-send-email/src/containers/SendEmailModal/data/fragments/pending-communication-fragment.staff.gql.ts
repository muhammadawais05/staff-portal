import { gql } from '@staff-portal/data-layer-service'

export const PENDING_COMMUNICATIONS_TASK_FRAGMENT = gql`
  fragment PendingCommunicationsTaskFragment on Task {
    id
    priority
    description
    dueDate
    status
    recurringPeriod
  }
`
