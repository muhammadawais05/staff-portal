import { Literal, PayloadValueType, ConvertProps, Converter } from '../../types'
import { TYPE_FIELD, MONEY_TYPE } from '../../constants'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

const isMatching = (payload: PayloadValueType) => {
  const objectPayload = payload as Record<string, any>

  return objectPayload[TYPE_FIELD] === MONEY_TYPE
}

const convert = ({ payload }: ConvertProps): Literal[] => {
  const payloadValue = payload as Record<string, any>

  const { amount } = payloadValue
  const formattedAmount = formatter.format(amount)

  return [`${formattedAmount}`]
}

const moneyConverter: Converter = {
  isMatching,
  convert
}

export default moneyConverter
