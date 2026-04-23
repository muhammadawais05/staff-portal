import { getOnsiteTimeOptions } from './get-onsite-time-options'

describe('#getOnsiteTimeOptions', () => {
  it('returns the correct options up to the max time percentage', () => {
    expect(getOnsiteTimeOptions({ maxOnsiteTimePercentage: 50 })).toEqual([
      { text: '1 - 4 weeks', value: 0 },
      { text: '10%', value: 1 },
      { text: '20%', value: 2 },
      { text: '30%', value: 3 },
      { text: '40%', value: 4 },
      { text: '50%', value: 5 }
    ])
  })
})
