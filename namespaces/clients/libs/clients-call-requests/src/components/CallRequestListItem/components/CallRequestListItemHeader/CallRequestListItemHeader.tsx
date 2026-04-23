import React from 'react'
import { Avatar, Container, Tag, UserBadge, Typography } from '@toptal/picasso'
import { FlagColor } from '@staff-portal/graphql/staff'
import { RoleFlag } from '@staff-portal/role-flags'

import { FALLBACK_CLIENT_NAME } from '../../../../config'
import { CallRequestFragment } from '../../../../data/call-request-fragment'
import * as S from './styles'

const getName = ({ name, client }: CallRequestFragment) =>
  name + (client?.claimer ? '' : ' (Unclaimed company)')

const getFlags = ({ isNew, late, client }: CallRequestFragment) => (
  <Container top='xsmall'>
    <Tag.Group>
      {isNew && <RoleFlag plainTooltip title='New' color={FlagColor.GREEN} />}
      {late && (
        <RoleFlag
          plainTooltip
          title='Late'
          comment={`This company has a callback request that hasn't been claimed in a timely manner.`}
          color={FlagColor.RED}
        />
      )}
      {client?.roleFlags?.nodes.map(roleFlag => (
        <RoleFlag
          key={roleFlag.id}
          title={roleFlag.flag.title}
          color={roleFlag.flag.color}
          comment={roleFlag.comment}
          createdAt={roleFlag.createdAt}
          updatedAt={roleFlag.updatedAt}
          flaggedBy={roleFlag.flaggedBy?.fullName}
        />
      ))}
    </Tag.Group>
  </Container>
)

export interface Props {
  data: CallRequestFragment
}

const CallRequestListItemHeader = ({ data }: Props) => {
  return (
    <Container css={S.container}>
      {!data.obscureLead && data.client ? (
        <UserBadge
          avatar={
            <Avatar
              name={data.client?.fullName || ''}
              src={data.client?.photo?.icon as string}
              size='small'
            />
          }
          name={getName(data)}
          center
        >
          {getFlags(data)}
        </UserBadge>
      ) : (
        <>
          <Typography variant='heading' size='small'>
            {FALLBACK_CLIENT_NAME}
          </Typography>
          {getFlags(data)}
        </>
      )}
    </Container>
  )
}

export default CallRequestListItemHeader
