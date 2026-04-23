import { BillCycle } from '@staff-portal/graphql/staff'

import { getBillCycleOptions } from './getBillCycleOptions'

describe('#getBillCycleOptions', () => {
  describe('when no arguments are passed', () => {
    it('returns all bill cycle options', () => {
      expect(getBillCycleOptions()).toEqual([
        {
          text: 'Bi-weekly',
          value: 'BI_WEEKLY'
        },
        {
          text: 'Weekly',
          value: 'WEEKLY'
        },
        {
          text: 'Semi-monthly',
          value: 'SEMI_MONTHLY'
        },
        {
          text: 'Monthly',
          value: 'MONTHLY'
        }
      ])
    })
  })

  describe('when arguments are passed', () => {
    it('returns expected billing cycle options for passed values', () => {
      expect(getBillCycleOptions([BillCycle.SEMI_MONTHLY])).toEqual([
        {
          text: 'Semi-monthly',
          value: 'SEMI_MONTHLY'
        }
      ])
    })
  })
})
