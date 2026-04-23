import { css } from 'styled-components'

export const filtersFieldLabel = ({
  labelWidthRem = 9,
  paddingLeftRem = 0
}) => css`
  width: ${labelWidthRem}rem;
  display: block;
  margin-bottom: 0;
  font-weight: 600;
  line-height: 1.375rem;
  padding-left: ${paddingLeftRem}rem;
`

export const filtersFieldContent = css`
  flex: 1;
`
