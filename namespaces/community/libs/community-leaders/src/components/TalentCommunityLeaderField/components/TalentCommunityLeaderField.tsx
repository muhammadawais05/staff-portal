import React from 'react'
import { Container, Button, Typography } from '@toptal/picasso'
import {
  Trash16,
  Rotate16,
  Tasks16,
  ThumbsUp16,
  ThumbsDown16
} from '@toptal/picasso/Icon'
import { Link } from '@staff-portal/navigation'
import { CommunityLeaderStatus } from '@staff-portal/graphql/staff'
import { getCommunityLeadersProfilePath } from '@staff-portal/routes'
import { OperationFragment } from '@staff-portal/operations'

import {
  ApproveCommunityLeaderButton,
  RejectCommunityLeaderButton,
  RemoveCommunityLeaderButton,
  RestoreCommunityLeaderButton
} from '../../../components'
import { CommunityLeaderData, CommunityLeaderBasicInfo } from '../../../types'
import GetCommunityLeader from '../../../data/get-community-leader/get-community-leader.staff.gql'
import MakeCommunityLeaderButton from './MakeCommunityLeaderButton'
import { getCommunityLeaderRole } from '../../../services/get-community-leader-role'
import { getCommunityLeaderStatus } from '../../../services/get-community-leader-status'

export interface Props {
  communityLeaderData: CommunityLeaderData
  communityLeaderBasicInfo: CommunityLeaderBasicInfo
  id: string
  name: string
  viewMode?: 'talent' | 'staff' | 'default'
}

const TalentCommunityLeaderField = ({
  communityLeaderData,
  communityLeaderBasicInfo,
  id,
  name,
  viewMode = 'default'
}: Props) => {
  const refetchQueries = [
    {
      query: GetCommunityLeader,
      variables: {
        id
      }
    }
  ]

  const status = getCommunityLeaderStatus(
    communityLeaderData?.status as CommunityLeaderStatus
  )

  const isCommunityLeaderApproved =
    communityLeaderData?.status === CommunityLeaderStatus.APPROVED

  const isCommunityLeaderDeleted =
    communityLeaderData?.status === CommunityLeaderStatus.DELETED

  const showLeaderProfileLink =
    viewMode === 'talent' &&
    (isCommunityLeaderApproved || isCommunityLeaderDeleted)

  const applicationId = communityLeaderData?.application?.id

  const role = getCommunityLeaderRole(communityLeaderData)

  return (
    <>
      <Container flex justifyContent='space-between'>
        {showLeaderProfileLink ? (
          <Link href={getCommunityLeadersProfilePath(id)}>{status.label}</Link>
        ) : (
          <Typography size='medium' css={status.css}>
            {status.label}
          </Typography>
        )}

        <Container>
          {communityLeaderData && (
            <>
              <ApproveCommunityLeaderButton
                id={applicationId as string}
                name={name}
                icon={<ThumbsUp16 />}
                refetchQueries={refetchQueries}
                operation={
                  communityLeaderData.operations
                    ?.approveCommunityLeaderApplication as OperationFragment
                }
              />
              <RejectCommunityLeaderButton
                id={applicationId as string}
                name={name}
                icon={<ThumbsDown16 />}
                refetchQueries={refetchQueries}
                operation={
                  communityLeaderData?.operations
                    ?.rejectCommunityLeaderApplication as OperationFragment
                }
              />
              <MakeCommunityLeaderButton
                communityLeaderBasicInfo={communityLeaderBasicInfo}
                refetchQueries={refetchQueries}
                icon={<Tasks16 />}
                operation={
                  communityLeaderData.operations
                    ?.appointCommunityLeader as OperationFragment
                }
                hidden={isCommunityLeaderApproved}
                asAction
              >
                Set As Community Leader
              </MakeCommunityLeaderButton>

              <RestoreCommunityLeaderButton
                id={communityLeaderData.node?.id as string}
                communityLeaderData={communityLeaderData}
                render={restoreAction => (
                  <Button.Action
                    onClick={restoreAction}
                    icon={<Rotate16 />}
                    data-testid='talent-community-leader-field-restore'
                  >
                    Restore Community Leader
                  </Button.Action>
                )}
                refetchQueries={refetchQueries}
                operation={
                  communityLeaderData.operations
                    ?.restoreCommunityLeader as OperationFragment
                }
              />

              <RemoveCommunityLeaderButton
                id={communityLeaderData.node?.id as string}
                name={role?.fullName as string}
                render={(removeAction, loading) => (
                  <Button.Action
                    onClick={removeAction}
                    icon={<Trash16 />}
                    disabled={loading}
                    data-testid='talent-community-leader-field-remove'
                  >
                    Remove
                  </Button.Action>
                )}
                refetchQueries={refetchQueries}
                operation={
                  communityLeaderData.operations
                    ?.removeCommunityLeader as OperationFragment
                }
              />
            </>
          )}
        </Container>
      </Container>
    </>
  )
}

export default TalentCommunityLeaderField
