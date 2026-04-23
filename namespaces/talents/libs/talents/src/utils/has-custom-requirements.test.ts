import { hasCustomRequirements } from './has-custom-requirements'

describe('hasCustomRequirements', () => {
  it('returns true if has custom requirement', () => {
    expect(
      hasCustomRequirements({
        backgroundCheck: true,
        drugTest: false,
        timeTrackingTools: false
      })
    ).toBe(true)

    expect(
      hasCustomRequirements({
        timeTrackingTools: true
      })
    ).toBe(true)
  })

  it('returns false if has no custom requirement', () => {
    expect(
      hasCustomRequirements({
        backgroundCheck: false,
        drugTest: false,
        timeTrackingTools: false
      })
    ).toBe(false)

    expect(hasCustomRequirements()).toBe(false)
  })
})
