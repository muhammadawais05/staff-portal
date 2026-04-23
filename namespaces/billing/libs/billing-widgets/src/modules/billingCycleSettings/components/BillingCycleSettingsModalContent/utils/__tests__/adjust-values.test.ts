import { BillCycle } from '@staff-portal/graphql/staff'

import adjustValues from '../adjust-values'

describe('#adjustValues', () => {
  describe.each([BillCycle.SEMI_MONTHLY, BillCycle.MONTHLY])(
    'when billing cycle is `%s`',
    billCycle => {
      it('unset `billday` and `cycleEndDate`', () => {
        const changes = {
          billCycle: billCycle,
          billDay: 'MONDAY',
          currentCycleEndDate: '2020-05-15',
          engagementId: 'exampleEngagementId'
        }

        expect(adjustValues(changes)).toEqual({
          billCycle: billCycle,
          engagementId: 'exampleEngagementId'
        })
      })
    }
  )

  describe('when billing cycle is not `SemiMonthly`', () => {
    it('unset `billday` and `cycleEndDate`', () => {
      const changes = {
        billCycle: BillCycle.WEEKLY,
        billDay: 'MONDAY',
        currentCycleEndDate: '2020-05-15',
        engagementId: 'exampleEngagementId'
      }

      expect(adjustValues(changes)).toEqual({
        billCycle: BillCycle.WEEKLY,
        billDay: 'MONDAY',
        currentCycleEndDate: '2020-05-15',
        engagementId: 'exampleEngagementId'
      })
    })
  })
})
