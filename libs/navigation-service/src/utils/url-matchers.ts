export const isAbsoluteUrlWithoutProtocol = (url: string) => {
  if (url.match(/^http(s?):\/\//)) {
    return false
  }

  const urlParts = url.split('/')
  const domain = urlParts[0]

  if (domain.match(/^[^-_:.@][^._:@]*\.[^.:]+/)) {
    return true
  }

  return false
}
