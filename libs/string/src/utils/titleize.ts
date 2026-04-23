import { capitalize, toTitleCase } from '@toptal/picasso/utils'

interface TitleizeOptions {
  splitter?: string | RegExp
  separator?: string
  capitalizeAllWords?: boolean
}

const AP_CASE_SEPARATOR = ' '

const titleize = (
  input: string,
  {
    splitter = '_',
    separator = AP_CASE_SEPARATOR,
    capitalizeAllWords = true
  }: TitleizeOptions = {}
) => {
  const words = input
    .split(splitter)
    .filter(word => word)
    .map(word => word.toLowerCase())

  if (!capitalizeAllWords) {
    return capitalize(words.join(separator))
  }

  if (separator !== AP_CASE_SEPARATOR) {
    return words.map(word => capitalize(word)).join(separator)
  }

  return toTitleCase(words.join(separator)) as string
}

export default titleize
