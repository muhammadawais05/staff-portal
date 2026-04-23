export const highlightSearchTerm = (text: string, searchTerm = '') => {
  if (!searchTerm) {
    return text
  }

  return text.replace(new RegExp(searchTerm, 'ig'), `<strong>$&</strong>`)
}
