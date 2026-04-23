import React, { PropsWithChildren } from 'react'
import { Container, Tag } from '@toptal/picasso'
import { RoleFlags } from '@staff-portal/role-flags'

import * as S from './styles'

interface Props {
  id: string
}

const ProfileHeader = ({ id, children }: PropsWithChildren<Props>) => (
  <Container alignItems='center' flex>
    <Container right='small'>{children}</Container>
    <Container css={S.flagsContainer}>
      <Tag.Group>
        <RoleFlags roleId={id} showTooltipActions />
      </Tag.Group>
    </Container>
  </Container>
)

export default ProfileHeader
