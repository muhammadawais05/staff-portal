import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetApproveOnlineTestData($roleStepId: ID!) {
    node(id: $roleStepId) {
      ... on RoleStep {
        id
        step {
          id
          title
        }
        claimer {
          id
          fullName
        }
        onlineTestAttempt {
          ...ScreeningStepOnlineTestAttemptFragment
        }
      }
    }
  }

  fragment ScreeningStepOnlineTestAttemptFragment on OnlineTestAttempt {
    id
    pureScore
    maxScore
    createdAt
    finishedAt
    pending
    test {
      id
      name
      rejectThreshold
      acceptThreshold
    }
  }
`
