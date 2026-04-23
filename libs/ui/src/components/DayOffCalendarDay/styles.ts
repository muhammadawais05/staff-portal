import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

export const dayBase = css`
  height: 3rem;
  min-width: 6.821rem;
  flex: 1 1 0;
  user-select: none;
  position: relative;
`

export const day = ({
  isToday,
  isDisabled,
  isSelected
}: {
  isSelected?: boolean,
  isDisabled?: boolean,
  isToday?: boolean
} | undefined = {}) => css`
  ${dayBase}
  vertical-align: middle;
  font-size: 0.875rem;

  ${isSelected && `
    background: ${palette.red.lighter};
  `}

  ${isDisabled && `
    color: ${palette.grey.main2};
  `}

  ${isToday &&
  `&::after {
      content: '';
      height: 0.25rem;
      width: 0.25rem;
      border-radius: 50%;
      background: ${palette.blue.main};
      position: absolute;
      bottom: 0.375rem;
    }
  `}
`
