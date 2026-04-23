import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetJobPostponeReasons {
    feedbackReasons(filter: { action: JOB_POSTPONED }) {
      nodes {
        id
        name
      }
    }
  }
`
