import { getTransformedTotals } from './transformTotals'

describe('#getTransformedTotals', () => {
  it('returns formatted totals', () => {
    expect(
      getTransformedTotals([
        { amount: '1213454.12', category: 'OUTSTANDING' },
        { amount: '4646.77', category: 'OVERDUE' },
        { category: 'DISPUTED', amount: '125584' }
      ])
    ).toEqual({
      outstanding: '1213454.12',
      overdue: '4646.77',
      disputed: '125584'
    })
  })
})
