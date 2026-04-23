import React from 'react'
import {
  Typography,
  Container,
  UserBadge,
  TreeNodeAvatar
} from '@toptal/picasso'
import { Maybe } from '@staff-portal/graphql/staff'

import Badge from '../Badge'
import * as S from './styles'

interface Props {
  name: string
  issuesCount?: Maybe<number>
  avatar?: Maybe<string>
  positions?: string[]
}

const getOperationalIssuesCounter = (issuesCount?: Maybe<number>) =>
  issuesCount && (
    <Container left='small'>
      <Badge badgeContent={issuesCount} />
    </Container>
  )

const getPositions = (positions: string[]) =>
  positions.length > 0 && (
    <Typography color='grey' size='xsmall'>
      {positions.join(', ')}
    </Typography>
  )

const TeamMemberStaffUserBadge = ({
  name,
  issuesCount,
  avatar,
  positions = []
}: Props) => {
  return (
    <Container>
      <UserBadge
        name={name}
        renderName={() => (
          <Container
            flex
            alignItems='center'
            justifyContent='space-between'
            css={S.userBadgeNameContainer}
          >
            <Container>
              <Typography variant='body' size='xsmall' weight='regular'>
                {name}
              </Typography>
              {getPositions(positions)}
            </Container>
            {getOperationalIssuesCounter(issuesCount)}
          </Container>
        )}
        avatar={<TreeNodeAvatar name={name} src={avatar || undefined} />}
      />
    </Container>
  )
}

export default TeamMemberStaffUserBadge
