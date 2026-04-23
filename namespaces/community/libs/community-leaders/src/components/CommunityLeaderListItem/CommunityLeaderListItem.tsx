import React, { memo } from 'react'
import { RefetchQueries } from '@staff-portal/data-layer-service'
import { Container, Avatar } from '@toptal/picasso'

import {
  CommunityLeaderSection,
  CommunityLeaderListItemContent,
  CommunityLeaderListItemHeader,
  FeatureCommunityLeaderButton,
  RemoveFeaturedCommunityLeaderButton,
  RemoveCommunityLeaderButton,
  RestoreCommunityLeaderButton
} from '../../components'
import { CommunityLeader } from '../../types'
import { getCommunityLeaderRole } from '../../services/get-community-leader-role'

type Props = {
  communityLeader: CommunityLeader
  refetchQueries?: RefetchQueries
  onListChange?: () => void
}

const CommunityLeaderListItem = ({
  communityLeader,
  refetchQueries,
  onListChange
}: Props) => {
  const role = getCommunityLeaderRole(communityLeader)

  return (
    <Container>
      <CommunityLeaderSection
        header={
          <CommunityLeaderListItemHeader
            communityLeader={communityLeader}
            actions={
              communityLeader.operations && (
                <>
                  <RemoveFeaturedCommunityLeaderButton
                    id={communityLeader.node?.id as string}
                    name={role?.fullName ?? ''}
                    operation={
                      communityLeader.operations.unfeatureCommunityLeader
                    }
                  />
                  <FeatureCommunityLeaderButton
                    operation={
                      communityLeader.operations.featureCommunityLeader
                    }
                    id={communityLeader.node?.id as string}
                    name={role?.fullName ?? ''}
                  />
                  <RemoveCommunityLeaderButton
                    id={communityLeader.node?.id as string}
                    name={role?.fullName ?? ''}
                    refetchQueries={refetchQueries}
                    onRemoveLeader={onListChange}
                    operation={communityLeader.operations.removeCommunityLeader}
                  />
                  <RestoreCommunityLeaderButton
                    id={communityLeader.node?.id as string}
                    communityLeaderData={communityLeader}
                    refetchQueries={refetchQueries}
                    onRestoreLeader={onListChange}
                    operation={
                      communityLeader.operations.restoreCommunityLeader
                    }
                  >
                    Restore
                  </RestoreCommunityLeaderButton>
                </>
              )
            }
          />
        }
        content={
          <Container flex direction='column' padded='medium'>
            <Avatar
              size='small'
              name={role?.fullName}
              src={role?.photo?.default || undefined}
              testIds={{
                wrapper: 'CommunityLeaderListItemHeader-avatar'
              }}
            />

            <CommunityLeaderListItemContent communityLeader={communityLeader} onListChange={onListChange}/>
          </Container>
        }
      />
    </Container>
  )
}

export default memo(CommunityLeaderListItem)
