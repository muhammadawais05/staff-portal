import React, { memo } from 'react'
import { Container } from '@toptal/picasso'
import { RoleFlagFragment } from '@staff-portal/role-flags'
import { TagsContainer } from '@staff-portal/ui'

import RoleFlags from '../RoleFlags'
import * as S from './styles'

interface Props {
  flags: RoleFlagFragment[]
}
export const ResizableFlagsContainer = ({ flags }: Props) => (
  <Container top='small' css={S.fullWidthContainer}>
    <TagsContainer length={flags.length}>
      <RoleFlags visibleLength={flags.length} flags={flags} />
    </TagsContainer>
  </Container>
)

export default memo(ResizableFlagsContainer)
