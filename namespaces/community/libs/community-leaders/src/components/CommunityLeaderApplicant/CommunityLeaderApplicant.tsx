import React, { memo } from 'react'
import { RefetchQueries } from '@staff-portal/data-layer-service'
import { Container, Avatar } from '@toptal/picasso'

import {
  CommunityLeaderSection,
  CommunityLeaderApplicantContent,
  CommunityLeaderApplicantHeader
} from '../../components'
import { CommunityLeaderApplicationNode } from '../../types'
import { getCommunityLeaderRole } from '../../services/get-community-leader-role'

interface Props {
  communityLeader: CommunityLeaderApplicationNode
  onListChange?: () => void
  refetchQueries?: RefetchQueries
}

const CommunityLeaderApplicant = ({
  communityLeader,
  onListChange,
  refetchQueries
}: Props) => {
  const role = getCommunityLeaderRole(communityLeader)

  return (
    <CommunityLeaderSection
      header={
        <CommunityLeaderApplicantHeader
          communityLeader={communityLeader}
          onListChange={onListChange}
          refetchQueries={refetchQueries}
        />
      }
      content={
        <Container flex direction='column' padded='medium'>
          <Avatar
            size='small'
            name={role?.fullName}
            src={role?.photo?.default || undefined}
            testIds={{
              wrapper: 'CommunityLeaderApplicantHeader-avatar'
            }}
          />
          <CommunityLeaderApplicantContent communityLeader={communityLeader} />
        </Container>
      }
    />
  )
}

export default memo(CommunityLeaderApplicant)
