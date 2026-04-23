import { css } from 'styled-components'

export const getLabelContainerStyle = (isFullRow: boolean) => css`
  width: ${isFullRow ? '20%' : '40%'};
  padding: 1rem 0.5rem 1rem 1rem;
`

export const getValueContainerStyle = (isFullRow: boolean) => css`
  width: ${isFullRow ? '80%' : '60%'};
  padding: 1rem 1rem 1rem 0.5rem;
  min-height: 3.5em;
`
export const typographyWidth = (width: number) => css`
  width: ${width}%;
`
