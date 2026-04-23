import { gql } from '@staff-portal/data-layer-service'

const TALENT_SPECIALIZATION_APPLICATION_FRAGMENT = gql`
  fragment TalentSpecializationApplicationFragment on SpecializationApplication {
    id
    status
    startedAt
    completedAt
    operations {
      id
      convertSpecializationApplication {
        callable
        messages
      }
      rejectSpecializationApplication {
        callable
        messages
      }
      restoreSpecializationApplication {
        callable
        messages
      }
    }
    specialization {
      id
      title
    }
    rejectionReason {
      comment
      place
      reason
      id
    }
    rejectNoteTasks(filter: { statuses: PENDING }) {
      totalCount
    }
    performer {
      id
      ... on WebResource {
        webResource {
          text
          url
        }
      }
    }
  }
`

export default TALENT_SPECIALIZATION_APPLICATION_FRAGMENT
