import { extractGithubUsernameFromUrl } from './extract-github-username-from-url'

describe('extractGithubUsernameFromUrl util', () => {
  it('returns a github username', () => {
    expect(
      extractGithubUsernameFromUrl('https://github.com/test-user')
    ).toBe('test-user')
  })

  it('returns undefined value if url is not provided', () => {
    expect(extractGithubUsernameFromUrl()).toBeUndefined()
    expect(extractGithubUsernameFromUrl(null)).toBeUndefined()
  })
})
