import {
  BillCycle,
  WeekDay,
  EngagementRateMethodEnum
} from '@staff-portal/graphql/staff'

import adjustDetailsStepFormValues from './adjust-details-step-form-values'

describe('adjustDetailsStepFormValues', () => {
  it.each([
    [
      {
        input: {
          billCycle: BillCycle.BI_WEEKLY,
          billDay: WeekDay.FRIDAY,
          markup: '10',
          billCycleConfirmed: true
        },
        expected: {
          billCycle: BillCycle.BI_WEEKLY,
          billDay: WeekDay.FRIDAY,
          markup: 10
        }
      },
      {
        input: {
          billCycle: BillCycle.MONTHLY,
          billDay: WeekDay.FRIDAY
        },
        expected: {
          billCycle: BillCycle.BI_WEEKLY,
          billDay: null
        }
      },
      {
        input: {
          rateMethod: EngagementRateMethodEnum.OVERRIDE_USING_CUSTOM_VALUES,
          rateOverrideReason: 'some reason'
        },
        expected: {
          rateMethod: EngagementRateMethodEnum.OVERRIDE_USING_CUSTOM_VALUES,
          rateOverrideReason: 'some reason'
        }
      },
      {
        input: {
          rateMethod: EngagementRateMethodEnum.DEFAULT,
          rateOverrideReason: 'some reason'
        },
        expected: {
          rateMethod: EngagementRateMethodEnum.DEFAULT,
          rateOverrideReason: null
        }
      }
    ]
  ])('returns adjusted attributes', ({ input, expected }) => {
    expect(adjustDetailsStepFormValues(input)).toEqual(expected)
  })
})
