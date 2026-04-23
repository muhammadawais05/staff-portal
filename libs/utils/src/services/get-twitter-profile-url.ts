const getTwitterProfileURL = (username?: string) =>
  username ? `https://twitter.com/${username}` : undefined

export default getTwitterProfileURL
