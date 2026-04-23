import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

export const redDot = css`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background-color: ${palette.red.main};
  border-radius: 0.8rem;
  color: ${palette.common.white};
  font-size: 0.625rem;
  line-height: 1;
  padding: 0.2rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 1rem;
  height: 1rem;
`

export const dropdownWrapper = css`
  width: 18.75rem;
`
