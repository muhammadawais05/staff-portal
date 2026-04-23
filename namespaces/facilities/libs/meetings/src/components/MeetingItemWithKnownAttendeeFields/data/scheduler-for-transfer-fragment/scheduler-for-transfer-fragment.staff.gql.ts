import { gql } from '@staff-portal/data-layer-service'

export const SCHEDULER_FOR_TRANSFER_FRAGMENT = gql`
  fragment SchedulerForTransferFragment on MeetingScheduler {
    id
    code
    role {
      ... on Role {
        id
        fullName
      }
      ... on Client {
        id
        fullName
      }
    }
  }
`
