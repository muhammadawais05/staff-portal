import { capitalize } from '@toptal/picasso/utils'

type TextTransformOptions = 'none' | 'capitalize'

interface Options {
  textTransform?: TextTransformOptions
  divider1?: string
  divider2?: string
  endSign?: string
}

const toSentence = (
  arrayOfStrings: string[],
  {
    textTransform = 'none',
    divider1 = ', ',
    divider2 = ' or ',
    endSign = ''
  }: Options = {}
): string => {
  if (!arrayOfStrings.length) {
    return ''
  }

  const sentence = arrayOfStrings
    .reduce(
      // eslint-disable-next-line max-params
      (acc, curr, index, arr) =>
        `${acc}${acc && index === arr.length - 1 ? divider2 : divider1}${curr}`
    )
    .concat(endSign)

  if (textTransform === 'capitalize') {
    return capitalize(sentence)
  }

  return sentence
}

export default toSentence
