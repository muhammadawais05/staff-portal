import React from 'react'
import {
  Container,
  Typography,
  Button,
  StarSolid16,
  Badge,
  Sort16
} from '@toptal/picasso'
import { getCommunityLeadersProfilePath } from '@staff-portal/routes'
import { Link } from '@staff-portal/navigation'

import { FeaturedCommunityLeader } from '../../types'
import * as S from './styles'
import { getCommunityLeaderRole } from '../../services/get-community-leader-role'

interface Props {
  communityLeader: FeaturedCommunityLeader
  disabled?: boolean
  isDragging?: boolean
  floating?: boolean
  dragHandler?: React.ReactNode
  removeCl?: () => void
  order?: number
}

const SortingIcon = () => {
  return (
    <Container css={S.sortingIconHolder}>
      <Sort16 css={S.sortingIcon} />
    </Container>
  )
}

export const PresentationalSortableItem = ({
  communityLeader,
  floating = false,
  isDragging = false,
  disabled = false,
  dragHandler,
  removeCl,
  order
}: Props) => {
  const role = getCommunityLeaderRole(communityLeader)

  return (
    <Container
      flex
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      bordered
      rounded
      padded='small'
      bottom='small'
      variant='white'
      data-testid='community-leader-sorted'
      css={[
        floating ? S.floating : undefined,
        isDragging ? S.dragging : undefined
      ]}
    >
      <Container flex direction='row' alignItems='center'>
        {dragHandler}
        <Container left='small'>
          {order ? <Badge content={order} /> : <SortingIcon />}
        </Container>
        <Container left='small'>
          <Link href={getCommunityLeadersProfilePath(role?.id as string)}>
            <Typography color='black' size='medium'>
              {role?.fullName}
            </Typography>
          </Link>
        </Container>
      </Container>
      <Container flex direction='row' alignItems='center'>
        <Button
          icon={<StarSolid16 />}
          size='small'
          variant='secondary'
          onClick={removeCl}
          disabled={disabled}
        >
          Remove From Featured
        </Button>
      </Container>
    </Container>
  )
}
