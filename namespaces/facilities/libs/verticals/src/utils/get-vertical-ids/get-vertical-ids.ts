import { parseStringArray } from '@staff-portal/filters'

import { UserVerticalFragment } from '../../data'

export const getVerticalIds = ({
  jobTypes,
  verticals
}: {
  jobTypes: unknown
  verticals: UserVerticalFragment[]
}) =>
  parseStringArray(jobTypes)
    ?.map(
      talentType =>
        verticals?.find(vertical => vertical.talentType === talentType)?.id
    )
    .filter(Boolean) as string[] | undefined
