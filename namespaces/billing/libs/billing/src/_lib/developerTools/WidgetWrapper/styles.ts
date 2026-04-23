import { css } from 'styled-components'

const wrapper = (hasBottomMargin?: boolean) => css`
  background: #fff;
  border: 1px solid #bcbfc6;
  border-radius: 3px;
  padding: 0;
  margin-top: 10px;
  ${hasBottomMargin &&
  `
    margin-bottom: 15px
  `}
`

export { wrapper }
