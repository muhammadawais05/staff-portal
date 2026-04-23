import { Key } from '../data/usePaymentsChart'

const colorTable: {
  [key in Key]: 'blue' | 'yellow'
} = {
  paid_early: 'blue',
  not_received: 'yellow'
}

export const colorByKey = (colorKey: Key) => colorTable[colorKey]
