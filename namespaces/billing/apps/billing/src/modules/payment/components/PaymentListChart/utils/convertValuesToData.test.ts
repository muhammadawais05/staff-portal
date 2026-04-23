import MockDate from 'mockdate'
import fixtures from '@staff-portal/billing/src/_fixtures'

import { convertValuesToData } from './convertValuesToData'

describe('#convertValuesToData', () => {
  beforeEach(() => MockDate.set('2020-01-01T19:00:00.000+00:00'))

  afterEach(() => MockDate.reset())

  it('returns proper transformed array', () => {
    expect(convertValuesToData([])).toEqual([])
    expect(
      convertValuesToData([
        {
          id: 'paid_early',
          values: {
            '2020-09-28': fixtures.MockKipperChart.data[0].values['2020-09-28'],
            '2020-10-21': fixtures.MockKipperChart.data[0].values['2020-10-21']
          }
        },
        {
          id: 'not_received',
          values: {
            '2020-09-28': fixtures.MockKipperChart.data[1].values['2020-09-28'],
            '2020-10-21': fixtures.MockKipperChart.data[1].values['2020-10-21']
          }
        }
      ])
    ).toEqual([
      { x: 'Sep 28', date: '2020-09-28', paid_early: 3.5, not_received: 0 },
      { x: 'Oct 21', date: '2020-10-21', paid_early: 4.07, not_received: 0 }
    ])
  })
})
