import { palette } from '@toptal/picasso/utils'

import { Result } from '../data/usePaymentsChart'

export const convertHighlights = (
  data: Result['paymentsChart']['data'],
  highlights: Result['paymentsChart']['highlights']
) => {
  const dateToIndex: { [date: string]: number } = {}

  data.forEach(({ values }) =>
    Object.keys(values).forEach((date, idx) => {
      dateToIndex[date] = idx
    })
  )

  return highlights.map(date => ({
    from: dateToIndex[date],
    to: dateToIndex[date] + 1,
    color: palette.red.main
  }))
}
