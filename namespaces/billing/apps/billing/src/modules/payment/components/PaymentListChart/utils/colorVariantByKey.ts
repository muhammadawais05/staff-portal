import { IndicatorProps } from '@toptal/picasso'

import { Key } from '../data/usePaymentsChart'

const colorTable: {
  [key in Key]: Extract<IndicatorProps['color'], 'blue' | 'yellow'>
} = {
  paid_early: 'blue',
  not_received: 'yellow'
}

export const colorVariantByKey = (colorKey: Key) => colorTable[colorKey]
