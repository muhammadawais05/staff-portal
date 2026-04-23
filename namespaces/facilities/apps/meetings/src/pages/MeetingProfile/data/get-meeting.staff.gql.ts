import { gql } from '@staff-portal/data-layer-service'
import {
  MEETING_FRAGMENT,
  MEETING_PENDING_JOBS_FRAGMENT
} from '@staff-portal/meetings'

export default gql`
  query GetMeeting($meetingId: ID!) {
    node(id: $meetingId) {
      ...MeetingFragment
      ...MeetingPendingJobsFragment
    }
  }

  ${MEETING_FRAGMENT}
  ${MEETING_PENDING_JOBS_FRAGMENT}
`
