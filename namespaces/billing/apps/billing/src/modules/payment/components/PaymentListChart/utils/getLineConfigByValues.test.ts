import fixtures from '@staff-portal/billing/src/_fixtures'

import { getLineConfigByValues } from './getLineConfigByValues'
import { Result } from '../data/usePaymentsChart'

describe('#getLineConfigByValues', () => {
  describe('when argument is a empty array', () => {
    it('returns a empty object', () => {
      expect(getLineConfigByValues([])).toEqual({})
    })
  })

  describe('when argument is a valid data', () => {
    it('returns a structured object', () => {
      expect(
        getLineConfigByValues(
          fixtures.MockKipperChart.data as Result['paymentsChart']['data']
        )
      ).toEqual({
        not_received: { color: '#e59c01' },
        paid_early: { color: '#204ecf' }
      })
    })
  })
})
