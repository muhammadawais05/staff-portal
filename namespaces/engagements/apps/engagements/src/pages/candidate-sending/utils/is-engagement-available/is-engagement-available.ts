import { Maybe } from '@staff-portal/graphql/staff'

const isEngagementAvailable = ({
  availableHours,
  expectedWeeklyHoursWithDefault
}: {
  availableHours?: Maybe<number>
  expectedWeeklyHoursWithDefault?: Maybe<number>
}) => {
  return (availableHours ?? 0) >= (expectedWeeklyHoursWithDefault ?? 0)
}

export default isEngagementAvailable
