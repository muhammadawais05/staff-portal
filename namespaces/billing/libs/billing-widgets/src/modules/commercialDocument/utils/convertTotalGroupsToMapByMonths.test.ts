import { convertTotalGroupsToMapByMonths } from './convertTotalGroupsToMapByMonths'

describe('#convertTotalGroupsToMapByMonths', () => {
  it('converts array of totals to map by months', () => {
    const groups = [
      {
        year: 2020,
        month: 11,
        totals: {
          foo: 100
        }
      },
      {
        year: 2020,
        month: 10,
        totals: {
          foo: 200
        }
      },
      {
        year: 2019,
        month: 2,
        totals: {
          foo: 300
        }
      },
      {
        year: 2019,
        month: 1,
        totals: {
          foo: 100
        }
      }
    ]

    expect(convertTotalGroupsToMapByMonths(groups)).toEqual({
      2020: {
        11: { foo: 100 },
        10: { foo: 200 }
      },
      2019: {
        2: { foo: 300 },
        1: { foo: 100 }
      }
    })
  })
})
