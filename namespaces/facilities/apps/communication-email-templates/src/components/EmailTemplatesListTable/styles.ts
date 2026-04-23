import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

const topShadow = `0 1px 0 0 ${palette.grey.lighter} inset`
const bottomShadow = `0 1px 0 0 ${palette.grey.lighter}`

export const groupHeader = css`
  box-shadow: ${topShadow}, ${bottomShadow};
`
