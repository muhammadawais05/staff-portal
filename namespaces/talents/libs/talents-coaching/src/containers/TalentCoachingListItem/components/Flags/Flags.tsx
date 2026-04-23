import React from 'react'
import { FlagColor } from '@staff-portal/graphql/staff'
import { RoleFlagFragment, useGetRoleFlags } from '@staff-portal/role-flags'

import ResizableFlagsContainer from '../ResizableFlagsContainer'
import { TalentForCoachingEngagementFragment } from '../../../../data/talent-for-coaching-engagement-fragment'

interface Props {
  talent: Pick<
    TalentForCoachingEngagementFragment,
    'id' | 'fullName' | 'photo' | 'webResource'
  >
}

export const Flags = ({ talent }: Props) => {
  const { data, loading, error } = useGetRoleFlags(talent.id)

  if (loading || error || !data) {
    return null
  }

  const FLAG_ORDER: Record<FlagColor, number> = {
    [FlagColor.GREEN]: 0,
    [FlagColor.ORANGE]: 1,
    [FlagColor.RED]: 2
  }

  const sortByColor = (
    { flag: { color: firstColor } }: RoleFlagFragment,
    { flag: { color: secondColor } }: RoleFlagFragment
  ) => {
    return (
      (firstColor ? FLAG_ORDER[firstColor] : -1) -
      (secondColor ? FLAG_ORDER[secondColor] : -1)
    )
  }

  const flags = data.slice().sort(sortByColor).reverse()

  return <ResizableFlagsContainer flags={flags} />
}

export default Flags
