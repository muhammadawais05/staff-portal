import { getTrialLengthOptions } from './get-trial-length-options'

describe('getTrialLengthOptions', () => {
  it('returns trial length options', () => {
    const options = Array.from(Array(10), (_, item) => ({
      text: `${item + 1} business days`,
      value: item + 1
    })).reverse()

    options[options.length - 1].text = '1 business day'

    expect(getTrialLengthOptions()).toStrictEqual([
      ...options,
      {
        text: 'No trial',
        value: 0
      }
    ])
  })
})
