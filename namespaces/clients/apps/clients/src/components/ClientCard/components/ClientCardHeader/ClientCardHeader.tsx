import React from 'react'
import { ClientFragment } from '@staff-portal/clients'
import { Avatar, Container, Tag } from '@toptal/picasso'
import { RoleFlag } from '@staff-portal/role-flags'

export interface Props {
  client: ClientFragment
}

export const ClientCardHeader = ({ client }: Props) => {
  const { fullName, photo, roleFlags } = client

  return (
    <Container flex alignItems='center' bottom='small'>
      <Container right='small'>
        <Avatar name={fullName} src={photo?.default as string} size='small' />
      </Container>
      <Container>
        <Tag.Group>
          {roleFlags?.nodes.map(roleFlag => (
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
    </Container>
  )
}
