import React, { memo, ReactNode } from 'react'
import { Container, StarSolid16 } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { getCommunityLeadersProfilePath } from '@staff-portal/routes'
import { TypographyOverflowLink } from '@staff-portal/ui'

import { CommunityLeader } from '../../types'
import { getCommunityLeaderRole } from '../../services/get-community-leader-role'
import * as S from './styles'

interface Props {
  communityLeader: CommunityLeader
  actions?: ReactNode
}

export const CommunityLeaderListItemHeader = ({
  communityLeader,
  actions
}: Props) => {
  const role = getCommunityLeaderRole(communityLeader)

  const isFeatured = !!communityLeader.node?.featuredOrder

  return (
    <Container
      flex
      padded='small'
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      css={S.header}
    >
      <Container flex direction='row' alignItems='center'>
        {isFeatured && (
          <Container right='xsmall'>
            <StarSolid16 color='yellow' data-testid='featured-icon' />
          </Container>
        )}
        <Link href={getCommunityLeadersProfilePath(role?.id as string)}>
          <TypographyOverflowLink color='black' weight='semibold'>
            {role?.fullName}
          </TypographyOverflowLink>
        </Link>
      </Container>
      {actions && (
        <Container flex direction='row' alignItems='center'>
          {actions}
        </Container>
      )}
    </Container>
  )
}

export default memo(CommunityLeaderListItemHeader)
