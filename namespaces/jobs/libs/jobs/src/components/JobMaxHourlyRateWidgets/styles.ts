import { css } from 'styled-components'

export const sliderGrid = css`
  margin-top: -5.5rem;
  margin-left: 3.5rem;
  width: 100%;
`

export const fieldContainer = css`
  margin-bottom: 8px;
  display: flex;
  align-items: center;
`

export const field = (growField: boolean) => css`
  margin-right: 16px;
  ${growField && `flex-grow: 1;`}
`

export const progressBarContainer = css`
  width: 200px;
`

export const chart = css`
  margin-bottom: -60px;
`
