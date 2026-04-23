import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetJobLevelData($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        jobType
        title
        categories {
          nodes {
            id
            name
          }
        }
        fieldCheck {
          id
          commitment
          estimatedLength
          hasPreferredHours
          hoursOverlap
          jobType
          maxHourlyRate
          startDate
          talentCount
          title
        }
        talentCount
        maxHourlyRate
        budgetDetails
        uncertainOfBudgetReason
        uncertainOfBudgetReasonComment
        commitment
        estimatedLength
        startDate
        hasPreferredHours
        hoursOverlapEnum
      }
    }
  }
`
