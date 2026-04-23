import { css } from 'styled-components'

export const size = (value: 'small' | 'medium') => css`
  max-width: ${value === 'small' ? '9' : '22.5'}rem;
`
