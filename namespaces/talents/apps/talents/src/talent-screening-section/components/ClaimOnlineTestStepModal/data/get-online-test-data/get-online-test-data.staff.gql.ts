import { gql } from '@staff-portal/data-layer-service'
import { ROLE_FLAG_FRAGMENT } from '@staff-portal/role-flags'
import { CLAIMER_FRAGMENT } from '@staff-portal/facilities'
import {
  ONLINE_TESTS_FRAGMENT,
  ONLINE_TESTS_WITH_THRESHOLD_FRAGMENT
} from '@staff-portal/talents'

export default gql`
  query GetOnlineTestData($roleStepId: ID!) {
    ...OnlineTestDataFragment
  }

  fragment OnlineTestDataFragment on Query {
    onlineTests {
      nodes {
        ...OnlineTestsFragment
      }
    }
    node(id: $roleStepId) {
      ... on RoleStep {
        id
        step {
          id
          title
        }
        talent {
          ...OnlineTestTalentFragment
        }
        claimer {
          ...ClaimerFragment
        }
      }
    }
  }

  fragment OnlineTestTalentFragment on Talent {
    id
    fullName
    talentPartner {
      id
      fullName
    }
    onlineTestAttempts(filter: { scope: NOT_CANCELED }) {
      nodes {
        ...OnlineTestAttemptsFragment
      }
    }
    roleFlags {
      nodes {
        ...RoleFlagFragment
      }
    }
  }

  fragment OnlineTestAttemptsFragment on OnlineTestAttempt {
    id
    createdAt
    finishedAt
    pureScore
    maxScore
    test {
      ...OnlineTestsWithThresholdFragment
    }
  }

  ${CLAIMER_FRAGMENT}
  ${ROLE_FLAG_FRAGMENT}
  ${ONLINE_TESTS_FRAGMENT}
  ${ONLINE_TESTS_WITH_THRESHOLD_FRAGMENT}
`
