import { css } from 'styled-components'

import { StepIndicatorColor } from '../enums'

export const container = ({
  withArrow,
  color
}: {
  color: StepIndicatorColor
  withArrow: boolean
}) => css`
  border-radius: 0;
  height: 2rem;

  ${color === StepIndicatorColor.Blue &&
  css`
    background: #856759;
  `}

  ${withArrow &&
  css`
    &::after {
      content: '';
      position: absolute;
      top: calc(50% - 0.25rem);
      width: 0.5rem;
      height: 0.5rem;
      background-color: inherit;
      transform: rotate(45deg);
    }
  `}
`
