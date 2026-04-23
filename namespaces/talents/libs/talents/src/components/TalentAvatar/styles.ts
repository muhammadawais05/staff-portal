import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const avatarContainer = css`
  position: relative;
  align-self: center;
`

export const talentPartnerBadge = css`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 99;
  background: ${palette.blue.light};
  color: ${palette.common.white};
  font-weight: 600;
  text-align: center;
  cursor: pointer;

  & > a {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
`

export const largeSize = css`
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.625rem;
  font-size: 1rem;
`

export const smallSize = css`
  width: 0.75rem;
  height: 0.75rem;
  line-height: 0.75rem;
  font-size: 0.5rem;
`

export const defaultCursor = css`
  cursor: default;
`
