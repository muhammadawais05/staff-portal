const getLastCharacter = (text: string) => {
  if (!text.length) {
    return ''
  }

  return text[text.length - 1]
}

const getDelimiter = (previousText: string) => {
  const lastCharacter = getLastCharacter(previousText)

  return lastCharacter === '.' ? '' : '.'
}

const composeErrorMessage = (result: string, message: string) => {
  if (!result) {
    return message
  }

  const previousText = result.trim()
  const nextText = message.trim()
  const delimiter = getDelimiter(previousText)

  return `${previousText}${delimiter} ${nextText}`
}

export const concatMessages = (messages: string[] = []) => {
  let result = messages.reduce(composeErrorMessage, '')

  result = result ? `${result}${getDelimiter(result)}` : ''

  return result
}
