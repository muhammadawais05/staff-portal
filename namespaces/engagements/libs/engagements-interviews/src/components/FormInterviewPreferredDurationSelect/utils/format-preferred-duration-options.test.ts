import { formatPreferredDurationsOptions } from './format-preferred-duration-options'

const items = ['MINUTES_15', 'MINUTES_30']

describe('formatPreferredDurationsOptions', () => {
  it('returns formatted options', () => {
    expect(formatPreferredDurationsOptions(items)).toStrictEqual([
      { value: 'MINUTES_15', text: '15 minutes' },
      { value: 'MINUTES_30', text: '30 minutes' }
    ])
  })
})
