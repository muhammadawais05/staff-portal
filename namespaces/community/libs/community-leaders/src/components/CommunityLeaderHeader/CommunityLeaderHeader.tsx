/* eslint-disable no-console */
import React, { memo, ReactNode } from 'react'
import { Container, Typography } from '@toptal/picasso'

import { CommunityLeaderData } from '../../types'
import { getCommunityLeaderRole } from '../../services/get-community-leader-role'
import * as S from './styles'

interface Props {
  communityLeader: CommunityLeaderData
  actions?: ReactNode
}

export const CommunityLeaderHeader = ({ communityLeader, actions }: Props) => {
  const role = getCommunityLeaderRole(communityLeader)

  if (!role) {
    return null
  }

  const { fullName } = role

  return (
    <Container
      flex
      padded='small'
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      css={S.header}
    >
      <Typography color='black' weight='semibold'>
        {fullName}
      </Typography>
      {actions && (
        <Container flex top='xsmall'>
          {actions}
        </Container>
      )}
    </Container>
  )
}

export default memo(CommunityLeaderHeader)
