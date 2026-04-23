import { TalentVerticalFragment } from '@staff-portal/talents'

export const getVerticalById = (
  verticalId: string,
  verticals: TalentVerticalFragment[]
) => verticals.find(({ id }) => id === verticalId)
