import { css } from 'styled-components'
import { AvatarSizeType } from '@toptal/picasso/Avatar/Avatar'

export const avatarElementsWrapper = css`
  display: inline-block;
  position: relative;
`

export const iconsGrid = (
  size: Extract<AvatarSizeType, 'medium' | 'large'>
) => css`
  position: absolute;
  width: auto;
  right: ${size !== 'large' ? '0.25' : '1'}rem;
  top: ${size !== 'large' ? '0.25' : '1'}rem;
`

export const shownOnHover = css`
  opacity: 0;
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  .avatar-elements-wrapper:hover & {
    opacity: 1;
  }
`
