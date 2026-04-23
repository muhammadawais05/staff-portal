import { gql } from '@staff-portal/data-layer-service'

export const ONLINE_TESTS_FRAGMENT = gql`
  fragment OnlineTestsFragment on OnlineTest {
    id
    name
    service
  }
`

export const ONLINE_TESTS_WITH_THRESHOLD_FRAGMENT = gql`
  fragment OnlineTestsWithThresholdFragment on OnlineTest {
    ...OnlineTestsFragment

    rejectThreshold
    acceptThreshold
  }

  ${ONLINE_TESTS_FRAGMENT}
`
