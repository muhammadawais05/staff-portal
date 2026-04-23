import { gql } from '@staff-portal/data-layer-service'
import {
  UNLINKED_SOURCING_REQUEST_TALENTS_FRAGMENT,
  LINKED_SOURCING_REQUEST_TALENTS_FRAGMENT
} from '@staff-portal/jobs'

export const GET_JOB_SOURCING_REQUEST_TALENTS = gql`
  query GetJobSourcingRequestTalents($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        sourcingRequest {
          id
          ...LinkedSourcingRequestTalentsFragment
          ...UnlinkedSourcingRequestTalentsFragment
        }
      }
    }
  }

  ${LINKED_SOURCING_REQUEST_TALENTS_FRAGMENT}
  ${UNLINKED_SOURCING_REQUEST_TALENTS_FRAGMENT}
`
