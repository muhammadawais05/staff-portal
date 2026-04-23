import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const widgetHeader = css`
  border-bottom: 1px solid ${palette.grey.lighter2};
  padding-bottom: 1rem;
`

export const widgetTable = css`
  border-bottom: 1px solid ${palette.grey.lighter2};

  && tr td {
    padding-right: 1rem;
  }
`
