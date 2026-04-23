import { screens } from './breakpoints'

describe('breakpoints screens', () => {
  it('returns valid media query', () => {
    expect(screens('large')).toBe('@media (min-width: 1440px)')
  })
})
