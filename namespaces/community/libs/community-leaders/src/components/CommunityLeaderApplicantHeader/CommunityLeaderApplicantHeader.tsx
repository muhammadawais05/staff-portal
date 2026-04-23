import React, { memo } from 'react'
import { Container } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { TypographyOverflowLink } from '@staff-portal/ui'
import { RefetchQueries } from '@staff-portal/data-layer-service'
import { OperationFragment } from '@staff-portal/operations'

import { CommunityLeaderApplicationNode } from '../../types'
import {
  ApproveCommunityLeaderButton,
  RejectCommunityLeaderButton,
  HoldCommunityLeaderButton
} from '../../components'
import { getCommunityLeaderRole } from '../../services/get-community-leader-role'
import * as S from './styles'

interface Props {
  communityLeader: CommunityLeaderApplicationNode
  onListChange?: () => void
  refetchQueries?: RefetchQueries
}

export const CommunityLeaderApplicantHeader = ({
  communityLeader,
  onListChange,
  refetchQueries
}: Props) => {
  const { operations, application } = communityLeader
  const role = getCommunityLeaderRole(communityLeader)

  return (
    <Container
      flex
      padded='small'
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      css={S.header}
    >
      <Link href={role?.webResource.url as string}>
        <TypographyOverflowLink color='black' weight='semibold'>
          {role?.fullName}
        </TypographyOverflowLink>
      </Link>

      <Container>
        <HoldCommunityLeaderButton
          operation={
            operations?.holdCommunityLeaderApplication as OperationFragment
          }
          id={application?.id as string}
          name={role?.fullName as string}
          onHoldLeader={onListChange}
          refetchQueries={refetchQueries}
        />

        <ApproveCommunityLeaderButton
          operation={
            operations?.approveCommunityLeaderApplication as OperationFragment
          }
          id={application?.id as string}
          name={role?.fullName as string}
          onApproveLeader={onListChange}
          refetchQueries={refetchQueries}
        />
        <RejectCommunityLeaderButton
          operation={
            operations?.rejectCommunityLeaderApplication as OperationFragment
          }
          id={application?.id as string}
          name={role?.fullName as string}
          onRejectLeader={onListChange}
          refetchQueries={refetchQueries}
        />
      </Container>
    </Container>
  )
}

export default memo(CommunityLeaderApplicantHeader)
