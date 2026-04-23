import ramdaIs from 'ramda/src/is'

import {
  Literal,
  StringPayloadModifier,
  PayloadValueType,
  ConvertProps,
  Converter,
  EmphasisType
} from '../../types'
import {
  EMPTY_VALUE,
  WITH_INDEFINITE_ARTICLE_MODIFIER,
  EMPHASIZED_TEXT_MODIFIER,
  EMPHASIZED_MODIFIER,
  MODEL_DESCRIPTION_TYPE_FIELD,
  MODEL_DESCRIPTION_LABEL_TYPE
} from '../../constants'
import withIndefiniteArticleModifier from '../../modifiers/with-indefinite-article'
import emphasizedModifier from '../../modifiers/emphasized'

const isMatching = (payload: PayloadValueType) => {
  const objectPayload = payload as Record<string, any>

  return (
    ramdaIs(String)(payload) ||
    objectPayload[MODEL_DESCRIPTION_TYPE_FIELD] === MODEL_DESCRIPTION_LABEL_TYPE
  )
}

const getModifierMatch = (
  modifierValue: StringPayloadModifier,
  modifierPattern: string
) => {
  const modifierRegexp = new RegExp(modifierPattern)

  return modifierValue && modifierValue.match(modifierRegexp)
}

const convert = ({ payload, modifier }: ConvertProps): Literal[] => {
  const payloadValue = payload as string
  const modifierValue = modifier as StringPayloadModifier

  if (modifierValue === WITH_INDEFINITE_ARTICLE_MODIFIER) {
    return [withIndefiniteArticleModifier(payloadValue)]
  }

  // example: emphasized_text(some_string, good)
  const emphasizedTextMatch = getModifierMatch(
    modifierValue,
    EMPHASIZED_TEXT_MODIFIER + '\\((.*),(.*)\\)'
  )

  if (emphasizedTextMatch) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, text, emphasisType] = emphasizedTextMatch

    return [emphasizedModifier(text, emphasisType as EmphasisType)]
  }

  // example: emphasized(warning)
  const emphasizedMatch = getModifierMatch(
    modifierValue,
    EMPHASIZED_MODIFIER + '\\((.*)\\)'
  )

  if (emphasizedMatch) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, emphasisType] = emphasizedMatch

    return [emphasizedModifier(payloadValue, emphasisType as EmphasisType)]
  }

  return payloadValue === '' ? [EMPTY_VALUE] : [payloadValue]
}

const stringConverter: Converter = {
  isMatching,
  convert
}

export default stringConverter
