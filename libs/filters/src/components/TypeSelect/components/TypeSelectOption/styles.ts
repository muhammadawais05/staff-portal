import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const container = css`
  cursor: pointer;
`

export const checkIcon = css`
  width: 1.4rem;
  margin-top: 2px;
`

export const menu = css`
  box-shadow: none;
  margin-left: 0.6rem;
`

export const selected = css`
  margin: 2.1rem 0 0;
  padding: 0.2rem 0.5rem;
  width: fit-content;
  border-radius: 3px;
  background-color: ${palette.blue.lighter};

  > p {
    margin-right: 0.4rem;
  }
`
