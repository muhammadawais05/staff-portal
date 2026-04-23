import { interpolate } from '../../interpolate'
import { Literal, PayloadValueType, ConvertProps, Converter } from '../../types'

/**
 * Oxford comma join of 2D array of Literals by flattening structure and putting correct
 * separator literals in-between
 */
const join = (array: Literal[][]) =>
  array.reduce((acc: Literal[], item: Literal[], index: number) => {
    const isFirst = index === 0
    const isBetween = index < array.length - 1
    const isOnlyTwoItems = array.length <= 2

    if (isFirst) {
      acc.push(...item)
    } else if (isBetween) {
      acc.push(', ', ...item)
    } else if (isOnlyTwoItems) {
      acc.push(' and ', ...item)
    } else {
      acc.push(', and ', ...item)
    }

    return acc
  }, [])

const isMatching = (payload: PayloadValueType) => Array.isArray(payload)

const convert = ({ payload }: ConvertProps): Literal[] => {
  const payloadValue = payload as Record<string, any>[]

  const convertedItems = payloadValue.map(payload => interpolate({ payload }))
  const joinedItems = join(convertedItems)

  return joinedItems
}

const arrayConverter: Converter = {
  isMatching,
  convert
}

export default arrayConverter
