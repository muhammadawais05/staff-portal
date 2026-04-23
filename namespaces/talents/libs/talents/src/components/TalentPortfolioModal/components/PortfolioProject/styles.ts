import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const sections = css`
  background-color: white;
  border-top: 1px solid ${palette.grey.lighter};
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
`

export const gallerySection = css`
  flex-basis: 70%;
  background-color: ${palette.grey.lighter};
  justify-content: center;
`

export const contentSection = css`
  flex-basis: 30%;
  position: relative;
`
