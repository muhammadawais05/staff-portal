import { css } from 'styled-components'

export const tagListItem = ({
  isDragging,
  isGrabbed
}: {
  isDragging: boolean
  isGrabbed: boolean
}) => css`
  cursor: inherit;

  ${isGrabbed &&
  css`
    cursor: grabbing;
  `}

  ${isDragging &&
  css`
    opacity: 0;
  `}
`
