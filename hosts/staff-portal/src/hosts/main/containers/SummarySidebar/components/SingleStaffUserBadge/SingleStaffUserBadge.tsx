import React from 'react'
import { Typography, Container, TreeNodeAvatar } from '@toptal/picasso'
import { Maybe } from '@staff-portal/graphql/staff'

import Badge from '../Badge'
import * as S from './styles'

interface Props {
  name: string
  issuesCount?: Maybe<number>
  avatar?: Maybe<string>
  positions?: string[]
}

const getPositions = (positions: string[]) =>
  positions.length > 0 && (
    <Typography color='dark-grey' size='xsmall' align='center'>
      {positions.join(', ')}
    </Typography>
  )

const SingleStaffUserBadge = ({
  name,
  issuesCount,
  avatar,
  positions = []
}: Props) => {
  return (
    <Container flex direction='column' alignItems='center' css={S.fixedSize}>
      <Badge badgeContent={issuesCount}>
        <TreeNodeAvatar name={name} src={avatar || undefined} size='small' />
      </Badge>
      <Container top='xsmall'>
        <Typography
          variant='heading'
          size='medium'
          weight='regular'
          align='center'
        >
          {name}
        </Typography>
        {getPositions(positions)}
      </Container>
    </Container>
  )
}

export default SingleStaffUserBadge
