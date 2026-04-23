export const container = `
  position: relative;
`
export const disabledContainer = `
  pointer-events: none;
  opacity: 0.4;
  user-select: none;
  min-height: 4rem;
`

const loader = `
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
`

export const loadingIndicator = `
  ${loader}
  top: 10rem;
`

export const emptyListLoadingIndicator = `
  ${loader}
  top: 1.625rem;
`
