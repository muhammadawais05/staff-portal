import { CommitmentRateAvailability } from '@staff-portal/graphql/staff'

import { formatTooltipRate } from './format-tooltip-rate'

describe('formatTooltipRate', () => {
  it('returns discountable content with hour suffix for `HOUR` availability', () => {
    expect(
      formatTooltipRate({
        rate: {
          value: '10.00',
          availability: CommitmentRateAvailability.HOUR
        },
        discountMultiplier: '0.75'
      })
    ).toBe('$7.50/hour')
  })

  it('returns discountable content with week suffix for `WEEK` availability', () => {
    expect(
      formatTooltipRate({
        rate: {
          value: '20.00',
          availability: CommitmentRateAvailability.WEEK
        },
        discountMultiplier: '0.50'
      })
    ).toBe('$10.00/week')
  })
})
