import { OnlineTestAttemptsFragment } from '../../../ClaimOnlineTestStepModal/data/get-online-test-data/get-online-test-data.staff.gql.types'

export const getOnlineTestAttemptColor = ({
  pureScore,
  test
}: OnlineTestAttemptsFragment) => {
  if (!pureScore || !test?.rejectThreshold) {
    return
  }

  if (pureScore < test.rejectThreshold) {
    return 'red'
  }

  if (pureScore >= test.acceptThreshold) {
    return 'green'
  }

  return 'yellow'
}
