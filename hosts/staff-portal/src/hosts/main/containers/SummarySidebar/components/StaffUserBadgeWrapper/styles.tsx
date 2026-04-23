import React from 'react'
import { palette, colorUtils } from '@toptal/picasso/utils'
import { Container, ContainerProps } from '@toptal/picasso'
import styled from 'styled-components'

interface UserBadgeContainerProps extends ContainerProps {
  disabled: number
  selected: number
  highlighted: number
}

const getBackgroundColor = ({ selected }: UserBadgeContainerProps) =>
  selected ? palette.blue.lighter : palette.common.white
const getBorder = ({ selected, highlighted }: UserBadgeContainerProps) =>
  `1px solid ${
    selected || highlighted ? palette.blue.main : palette.grey.light
  }`

export const UserBadgeContainer = styled(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ disabled, selected, highlighted, children, ...rest }) => (
    <Container {...rest}>{children}</Container>
  )
)<UserBadgeContainerProps>`
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  background-color: ${getBackgroundColor};
  border: ${getBorder};
`

export const overlayContainer = `
  position: relative;
`

export const overlay = `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 3.5rem;
  background-color: ${colorUtils.alpha(palette.common.white, 0.3)};
`

export const centeredLoader = `
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
`
