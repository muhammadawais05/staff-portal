import React, { ReactNode } from 'react'
import { Container, Loader } from '@toptal/picasso'

import { StaffMemberProperties } from '../StaffTreeModal'
import * as S from './styles'

interface Props extends Partial<Omit<StaffMemberProperties, 'index'>> {
  isTeamMember?: boolean
  onClick?: Function
  children?: ReactNode
}

const getOverlay = (loading: boolean, isTeamMember = false) => (
  <Container css={isTeamMember ? S.overlayContainer : undefined}>
    <Container css={S.overlay}>
      {loading && <Loader css={S.centeredLoader} />}
    </Container>
  </Container>
)

const StaffUserBadgeWrapper = ({
  selected = false,
  highlighted = false,
  loading = false,
  disabled = false,
  isTeamMember,
  onClick = () => {},
  children
}: Props) => {
  const overlay = (disabled || loading) && getOverlay(loading, isTeamMember)

  return (
    <Container>
      {overlay}
      <S.UserBadgeContainer
        selected={selected}
        highlighted={highlighted}
        disabled={disabled}
        padded={isTeamMember ? 'xsmall' : 'small'}
        onClick={() => onClick()}
      >
        {children}
      </S.UserBadgeContainer>
    </Container>
  )
}

export default StaffUserBadgeWrapper
