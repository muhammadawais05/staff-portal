import { ProposeEngagementEndInput } from '@staff-portal/graphql/staff'

export const isEstimatedDateChanged = (
  key: keyof ProposeEngagementEndInput,
  oldValues: Partial<ProposeEngagementEndInput>,
  nextValues: Partial<ProposeEngagementEndInput>
): boolean => {
  const nextDate = nextValues[key]
  const prevDate = oldValues[key]

  return !!nextDate && nextDate !== prevDate
}
