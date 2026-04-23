import computeEmphasizedLiterals from './compute-emphasized-literals'
import { EMPHASIZED_MODIFIER, NULL_VALUE } from './constants'
import arrayConverter from './converters/array'
import booleanConverter from './converters/boolean'
import changeConverter from './converters/change'
import dateConverter from './converters/date'
import linkConverter from './converters/link'
import moneyConverter from './converters/money'
import numberConverter from './converters/number'
import rangeConverter from './converters/range'
import referenceConverter from './converters/reference'
import stringConverter from './converters/string'
import templateConverter from './converters/template'
import { InterpolateProps, Literal } from './types'

const converters = [
  changeConverter,
  moneyConverter,
  rangeConverter,
  templateConverter,
  arrayConverter,
  referenceConverter,
  linkConverter,
  numberConverter,
  booleanConverter,
  dateConverter,
  stringConverter
]

export const interpolate = ({
  payload,
  key,
  modifier
}: InterpolateProps): Literal[] => {
  if (payload === null) {
    return [NULL_VALUE]
  }

  const selectedConverter = converters.find(converter =>
    converter.isMatching(payload)
  )

  if (selectedConverter === undefined) {
    // eslint-disable-next-line no-console
    console.warn(
      `Couldn't find a converter for the payload ${JSON.stringify(payload)}`
    )

    return []
  }

  const literals = selectedConverter.convert({
    payload,
    interpolate,
    key,
    modifier
  })

  if (modifier?.startsWith(EMPHASIZED_MODIFIER)) {
    return computeEmphasizedLiterals(literals)
  }

  return literals
}
