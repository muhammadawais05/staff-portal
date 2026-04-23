import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

const activeOutline = `2px solid ${palette.blue.main}`
const defaultOutline = `2px solid white`

const fileThumbnail = css`
  max-width: 5.167rem;
  min-width: 2rem;
  width: 100%;
`

const imageThumbnail = css`
  width: 5.167rem;
`

export const thumbnailContainer = (
  isActive: boolean,
  isDocument: boolean
) => css`
  position: relative;
  height: 100%;
  min-height: 3.5rem;
  background-color: ${palette.grey.lighter};
  outline: ${isActive ? activeOutline : defaultOutline}; /* stylelint-disable-line value-keyword-case */
  cursor: pointer;
  opacity: ${isActive ? 1 : 0.5};
  ${isDocument ? fileThumbnail : imageThumbnail}

  &:hover {
    opacity: 1;
    outline: ${activeOutline};
  }
`

export const documentFileContainer = css`
  flex-wrap: wrap;
`
