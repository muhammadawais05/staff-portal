import React from 'react'
import { RefetchQueries } from '@staff-portal/data-layer-service'

import {
  ApproveCommunityLeaderButton,
  FeatureCommunityLeaderButton,
  RejectCommunityLeaderButton,
  RemoveCommunityLeaderButton,
  RemoveFeaturedCommunityLeaderButton,
  RestoreCommunityLeaderButton,
  MakeCommunityLeaderButton
} from '../../..'
import {
  CommunityLeaderData,
  CommunityLeaderBasicInfo
} from '../../../../types'

interface Props {
  communityLeaderData: CommunityLeaderData
  communityLeaderBasicInfo: CommunityLeaderBasicInfo
  talentId: string
  talentName: string
  refetchQueries?: RefetchQueries
}

const CommunityLeaderActionButtons = ({
  communityLeaderData,
  communityLeaderBasicInfo,
  talentName,
  refetchQueries
}: Props) => {
  if (!communityLeaderData || !communityLeaderData?.operations) {
    return null
  }

  const { node, operations, application } = communityLeaderData
  const nodeId = node?.id as string
  const applicationId = application?.id as string

  return (
    <>
      <RemoveFeaturedCommunityLeaderButton
        id={nodeId}
        name={talentName}
        operation={operations.unfeatureCommunityLeader}
      />
      <FeatureCommunityLeaderButton
        id={nodeId}
        name={talentName}
        operation={operations.featureCommunityLeader}
      />

      <ApproveCommunityLeaderButton
        id={applicationId}
        name={talentName}
        operation={operations.approveCommunityLeaderApplication}
        refetchQueries={refetchQueries}
      />
      <RejectCommunityLeaderButton
        id={applicationId}
        name={talentName}
        operation={operations.rejectCommunityLeaderApplication}
        refetchQueries={refetchQueries}
      />

      <MakeCommunityLeaderButton
        communityLeaderBasicInfo={communityLeaderBasicInfo}
        refetchQueries={refetchQueries}
        operation={operations.appointCommunityLeader}
        variant='secondary'
        size='small'
      >
        Set As Community Leader
      </MakeCommunityLeaderButton>

      <RestoreCommunityLeaderButton
        id={nodeId}
        communityLeaderData={communityLeaderData}
        refetchQueries={refetchQueries}
        operation={operations.restoreCommunityLeader}
      >
        Restore
      </RestoreCommunityLeaderButton>

      <RemoveCommunityLeaderButton
        id={nodeId}
        name={talentName}
        refetchQueries={refetchQueries}
        operation={operations.removeCommunityLeader}
      />
    </>
  )
}

export default CommunityLeaderActionButtons
