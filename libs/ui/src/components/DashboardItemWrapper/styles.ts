import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

const grey = palette.grey.lighter2

const header = ({
  showTitleBorder,
  hasPaddingTop = true
}: {
  showTitleBorder: boolean
  hasPaddingTop?: boolean
}) => css`
  ${hasPaddingTop && 'padding-top: 1rem;'}
  padding-bottom: 1rem;
  border-bottom: ${showTitleBorder ? `1px ${grey} solid` : 'none'};
`

const subtitle = css`
  padding: 1.5rem 1rem;
  border-bottom: 1px solid ${grey};
`

export { header, subtitle }
