import fixtures from '@staff-portal/billing/src/_fixtures'

import { convertHighlights } from './convertHighlights'
import { Result } from '../data/usePaymentsChart'

describe('#convertHighlights', () => {
  it('returns a formatted array', () => {
    expect(
      convertHighlights(
        fixtures.MockKipperChart.data as Result['paymentsChart']['data'],
        fixtures.MockKipperChart.highlights
      )
    ).toEqual([
      { from: 23, to: 24, color: '#d42551' },
      { from: 24, to: 25, color: '#d42551' }
    ])
  })
})
