import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

const div = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 37rem;
`

const infoLink = css`
  color: ${palette.grey.darker};
  border-bottom: 1px dotted ${palette.grey.darker};
  margin-right: 0.5rem;
`

const info = css`
  padding-right: 1rem;
`

const controls = css`
  flex-shrink: 0;
`

const strong = css`
  pointer-events: none;
`

export { div, infoLink, info, controls, strong }
