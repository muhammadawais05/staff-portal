import { css } from 'styled-components'

const headingTitle = css`
  && {
    margin-bottom: 17px;
    font-size: 28px;
  }
`
const iconWrapper = css`
  height: 176px;
  overflow: hidden;
  position: relative;
  text-align: center;
`
const icon = css`
  && {
    position: absolute;
    left: 50%;
    top: 2px;
    max-height: 100%;
    transform: translateX(-50%);
  }
`

export { iconWrapper, icon, headingTitle }
