type BreakpointKeys = 'large'

const breakpoints: { [key in BreakpointKeys]: number } = {
  large: 1440
}

export const screens = (...sizes: BreakpointKeys[]) => {
  const mediaQueries = sizes
    .map(size => `(min-width: ${breakpoints[size]}px)`)
    .join(', ')

  return `@media ${mediaQueries}`
}
