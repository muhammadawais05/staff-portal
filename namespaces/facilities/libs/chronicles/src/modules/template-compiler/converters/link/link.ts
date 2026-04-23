import { Literal, PayloadValueType, ConvertProps, Converter } from '../../types'
import { WITH_INDEFINITE_ARTICLE_MODIFIER } from '../../constants'
import withIndefiniteArticleModifier from '../../modifiers/with-indefinite-article'
import { LinkPayload } from './types'

const ACCESSIBLE_FIELD = 'accessible'

const isMatching = (payload: PayloadValueType) =>
  (payload as LinkPayload)[ACCESSIBLE_FIELD] !== undefined

const getOptionsByName = (options: any) => {
  if (Array.isArray(options)) {
    return options.reduce(
      (acc, { name, value }) => ({ ...acc, [name]: value }),
      {} as Record<string, string | undefined>
    )
  }

  return options
}

const convert = ({ payload, modifier }: ConvertProps): Literal[] => {
  const { accessible, path, text, options } = payload as LinkPayload
  const modifiedText =
    modifier === WITH_INDEFINITE_ARTICLE_MODIFIER
      ? withIndefiniteArticleModifier(text)
      : text

  const isAccessibleLink = accessible && path

  if (isAccessibleLink) {
    const optionsByName = getOptionsByName(options)

    return [
      {
        kind: 'link',
        href: path!,
        text: modifiedText,
        ...(optionsByName && { options: optionsByName })
      }
    ]
  }

  return [modifiedText]
}

const linkConverter: Converter = {
  isMatching,
  convert
}

export default linkConverter
