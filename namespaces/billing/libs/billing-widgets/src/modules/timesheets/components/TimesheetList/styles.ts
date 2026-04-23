import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

const footer = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 3rem;
`

const icon = css`
  font-size: 0.75rem;
  color: ${palette.blue.main};
  margin-left: 0.5em;
  transform: rotate(90deg);
`

export { footer, icon }
