import { palette } from '@toptal/picasso/utils'

import { getBarColor, getChartData } from './get-chart-data'

describe('#getChartData', () => {
  it('processes and sorts data for the chart', () => {
    const rates = [
      { from: 5, to: 10, count: 8 },
      { from: 0, to: 5, count: 5 }
    ]

    expect(getChartData(rates)).toEqual({
      chartValues: {
        '5': 5,
        '10': 8
      },
      keys: [5, 10]
    })
    expect(getChartData([])).toEqual({ chartValues: {}, keys: [] })
  })
})

describe('#getBarColor', () => {
  it('gets the right color', () => {
    expect(getBarColor('5', 10)).toEqual(palette.blue.main)
    expect(getBarColor('10', 10)).toEqual(palette.blue.main)
    expect(getBarColor('15', 10)).toEqual(palette.grey.main)
  })
})
