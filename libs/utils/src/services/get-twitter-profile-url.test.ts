import getTwitterProfileURL from './get-twitter-profile-url'

describe('get twitter profile url', () => {
  it('should handle missing username', () => {
    const result = getTwitterProfileURL()

    expect(result).toBeUndefined()
  })

  it('should return valid url', () => {
    const TWITTER_USERNAME = 'username'
    const expectedUrl = `https://twitter.com/${TWITTER_USERNAME}`

    const result = getTwitterProfileURL(TWITTER_USERNAME)

    expect(result).toBe(expectedUrl)
  })
})
