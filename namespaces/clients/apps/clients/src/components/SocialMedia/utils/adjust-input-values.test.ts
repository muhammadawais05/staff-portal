import { adjustInputValues } from './adjust-input-values'

describe('#adjustInputValues', () => {
  it('returns adjusted object', () => {
    expect(
      adjustInputValues({
        twitterLink: {
          text: '@twitter'
        },
        facebookLink: {
          text: 'facebook'
        },
        linkedinLink: {
          text: 'linkedin'
        },
        crunchbaseLink: {
          text: 'crunchbase'
        },
        zoominfoProfileUrl: 'zoom'
      })
    ).toEqual({
      twitter: 'twitter',
      facebook: 'facebook',
      linkedin: 'linkedin',
      crunchbase: 'crunchbase',
      zoominfoProfile: 'zoom'
    })
  })
})
