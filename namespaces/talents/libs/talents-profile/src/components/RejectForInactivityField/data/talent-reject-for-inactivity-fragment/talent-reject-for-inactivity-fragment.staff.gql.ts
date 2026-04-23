import { gql } from '@staff-portal/data-layer-service'

export const TALENT_REJECT_FOR_INACTIVITY_FRAGMENT = gql`
  fragment TalentRejectForInactivityFragment on Talent {
    id
    cumulativeStatus
    ofacStatus
    inactivityRejectionDeadlines {
      nodes {
        operations {
          updateInactivityRejectionDeadline {
            callable
            messages
          }
        }
        date
        id
        identifier
      }
    }
    activation {
      id
      status
      steps(filter: { inProgress: true }) {
        nodes {
          id
          status
          deadlineAt
        }
      }
    }
    specializationApplications(filter: { statuses: PENDING }) {
      nodes {
        id
      }
    }
    operations {
      changeTalentActivationDeadline {
        callable
        messages
      }
    }
  }
`
