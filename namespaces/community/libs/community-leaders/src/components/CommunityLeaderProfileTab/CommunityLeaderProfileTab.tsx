import React, { memo } from 'react'
import { decodeEntityId } from '@staff-portal/data-layer-service'

import { CommunityLeaderData, CommunityLeaderBasicInfo } from '../../types'
import TalentTab from './TalentTab'
import StaffTab from './StaffTab'

type Props = {
  communityLeaderId: string
  communityLeader: CommunityLeaderData
  communityLeaderBasicInfo: CommunityLeaderBasicInfo
}

const CommunityLeaderProfileTab = ({
  communityLeaderId,
  communityLeader,
  communityLeaderBasicInfo
}: Props) => {
  const decodedEntity = decodeEntityId(communityLeaderId)

  if (decodedEntity.type === 'Talent') {
    return (
      <TalentTab
        talentId={communityLeaderId}
        communityLeader={communityLeader}
        communityLeaderBasicInfo={communityLeaderBasicInfo}
      />
    )
  }

  return (
    <StaffTab
      communityLeaderId={communityLeaderId}
      communityLeader={communityLeader}
      communityLeaderBasicInfo={communityLeaderBasicInfo}
    />
  )
}

export default memo(CommunityLeaderProfileTab)
