import { palette } from '@toptal/picasso/utils'

import { Key, Result } from '../data/usePaymentsChart'
import { colorByKey } from './colorByKey'

export const getLineConfigByValues = (data: Result['paymentsChart']['data']) =>
  data.length === 0
    ? {}
    : {
        ...Object.values(data).reduce((acc, { id }) => {
          acc[id] = { color: palette[colorByKey(id)].main }

          return acc
        }, {} as Record<Key, { color: string }>)
      }
