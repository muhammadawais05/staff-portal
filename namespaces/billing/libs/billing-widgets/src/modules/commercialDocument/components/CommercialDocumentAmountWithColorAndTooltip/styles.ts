import { css } from 'styled-components'

const position = {
  left: '-1',
  right: '0'
}

const minimumContainer = css`
  width: min-content;
`

const iconStyle = (iconPosition: 'left' | 'right' = 'left') => css`
  && {
    margin-left: 0.35em;
    margin-right: 0.35em;
    vertical-align: -0.25rem;
    order: ${position[iconPosition]};
  }
`

export { minimumContainer, iconStyle }
