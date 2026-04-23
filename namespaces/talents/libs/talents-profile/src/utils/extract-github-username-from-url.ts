import { Maybe } from '@toptal/picasso/utils'

const GITHUB_URL_MATCHER = /https:\/\/github.com\/?([^/]+)*$/

export const extractGithubUsernameFromUrl = (
  githubProfileUrl?: Maybe<string>
) => {
  if (!githubProfileUrl) {
    return
  }

  const [, username] = githubProfileUrl.match(GITHUB_URL_MATCHER) ?? []

  return username
}
