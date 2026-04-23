import { getTalentProfileLinkTarget } from './get-talent-profile-link-target'

describe('getTalentProfileLinkTarget', () => {
  it('returns link target value', () => {
    expect(
      getTalentProfileLinkTarget(
        'https://staging.toptal.net/designers/resume/obfuscated_slug_456715'
      )
    ).toBe('_blank')

    expect(
      getTalentProfileLinkTarget(
        'https://staging.toptal.net/platform/staff/talents/456715'
      )
    ).toBeUndefined()
  })
})
