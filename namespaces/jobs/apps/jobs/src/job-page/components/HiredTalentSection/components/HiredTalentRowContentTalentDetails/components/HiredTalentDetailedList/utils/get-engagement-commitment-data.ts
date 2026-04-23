import {
  isAfter,
  parseISO,
  getCurrentDateString
} from '@staff-portal/date-time-utils'

import { GetHiredTalentContentQuery } from '../../../../../data/get-hired-talent-content/get-hired-talent-content.staff.gql.types'

type EngagementWithCommitment = NonNullable<GetHiredTalentContentQuery['node']>

type Props = Pick<
  EngagementWithCommitment,
  'startDate' | 'currentCommitment' | 'commitmentAtStartDate'
>

export const getEngagementCommitmentData = (
  engagementCommitmentData: Props
) => {
  const { startDate, currentCommitment, commitmentAtStartDate } =
    engagementCommitmentData

  let commitmentData = currentCommitment

  const currentDate = getCurrentDateString()
  const engagementStartDate = startDate ?? currentDate

  if (isAfter(parseISO(engagementStartDate), parseISO(currentDate))) {
    commitmentData = commitmentAtStartDate
  }

  return commitmentData
}
