import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const itemWrapper = css`
  flex-basis: 18.5rem;
  cursor: pointer;
`
export const itemOverlayFinanceExpert = css`
  background-color: rgb(132 136 142 / 80%);

  :hover {
    background-color: rgb(32 78 207 / 50%);
    opacity: 0.8;
  }
`

export const itemOverlay = css`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  bottom: 0.5rem;
  left: 0.5rem;
  transition: opacity 0.2s, background-color 0.2s;

  :hover {
    > #portfolio-title {
      display: block;
    }
  }
`

export const itemOverlayDesigner = css`
  :hover {
    background-color: rgb(24 58 158 / 75%);
  }
`

export const itemTitle = css`
  display: none;
  padding: 0 1.25rem;
`

export const itemTitleVisible = css`
  display: block;
`

export const skillLink = css`
  :hover {
    background-color: ${palette.blue.lighter};
    border-color: ${palette.blue.lighter};
    color: ${palette.blue.dark};
    cursor: pointer;
  }
`

export const skill = css`
  margin-bottom: 0.5rem;
  text-decoration: none;
  font-size: 0.8125rem;
`

export const skillsList = css`
  max-height: 48px;
  overflow: hidden;
`

export const imageWrapper = css`
  position: relative;
`

export const image = css`
  width: 100%;
  height: auto;
`

export const fallbackImage = css`
  width: 11.75rem;
  height: 7.81rem;
  background-color: ${palette.grey.light};
`
