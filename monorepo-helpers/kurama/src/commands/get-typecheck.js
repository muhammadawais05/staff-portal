import { orderArguments } from '../services/order-arguments.js'

export const getTypecheckCommand = () => {
  const { options } = orderArguments()

  return ['tsc', ...options]
}
