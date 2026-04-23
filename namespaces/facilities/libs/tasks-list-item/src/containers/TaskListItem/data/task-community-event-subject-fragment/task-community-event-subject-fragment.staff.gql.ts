import { gql } from '@staff-portal/data-layer-service'

export const TASK_COMMUNITY_EVENT_SUBJECT_FRAGMENT = gql`
  fragment TaskCommunityEventSubject on CommunityEvent {
    id
    __typename
  }
`
