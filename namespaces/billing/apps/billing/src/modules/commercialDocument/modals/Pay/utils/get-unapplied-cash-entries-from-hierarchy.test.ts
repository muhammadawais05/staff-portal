import { getUnappliedCashGroupsAsOptions } from './get-unapplied-cash-entries-from-hierarchy'

const groups = [
  {
    fullName: 'Client 1',
    unappliedCashEntries: {
      nodes: []
    }
  },
  {
    fullName: 'Client 2',
    unappliedCashEntries: {
      nodes: [
        {
          __typename: 'UnappliedCash',
          id: 'VjEtVW5hcHBsaWVkQ2FzaC0xNDE',
          effectiveDate: '2022-04-21',
          availableAmount: '3000.0'
        }
      ]
    }
  },
  {
    fullName: 'Client 3',
    unappliedCashEntries: {
      nodes: []
    }
  },
  {
    fullName: 'Client 4',
    unappliedCashEntries: {
      nodes: [
        {
          __typename: 'UnappliedCash',
          id: 'VjEtVW5hcHBsaWVkQ2FzaC0xMzk',
          effectiveDate: '2022-04-21',
          availableAmount: '1000.0'
        },
        {
          __typename: 'UnappliedCash',
          id: 'VjEtVW5hcHBsaWVkQ2FzaC0xNDA',
          effectiveDate: '2022-04-21',
          availableAmount: '10000.0'
        }
      ]
    }
  },
  {
    fullName: 'Client 5',
    unappliedCashEntries: {
      nodes: []
    }
  },
  {
    fullName: 'Client 6',
    unappliedCashEntries: {
      nodes: [
        {
          __typename: 'UnappliedCash',
          id: 'VjEtVW5hcHBsaWVkQ2FzaC0xMzg',
          effectiveDate: '2022-04-21',
          availableAmount: '250.0'
        },
        {
          __typename: 'UnappliedCash',
          id: 'VjEtVW5hcHBsaWVkQ2FzaC0xMzc',
          effectiveDate: '2022-04-21',
          availableAmount: '0.0'
        },
        {
          __typename: 'UnappliedCash',
          id: 'VjEtVW5hcHBsaWVkQ2FzaC0xNDI',
          effectiveDate: '2022-04-21',
          availableAmount: '1000.0'
        }
      ]
    }
  }
]

describe('getUnappliedCashGroupsAsOptions', () => {
  it('returns object with groups', () => {
    const actual = getUnappliedCashGroupsAsOptions(groups)
    const expected = {
      'Client 2': [
        {
          value: 'VjEtVW5hcHBsaWVkQ2FzaC0xNDE',
          text: 'Apr 21, 2022 - $3,000.00'
        }
      ],
      'Client 4': [
        {
          text: 'Apr 21, 2022 - $1,000.00',
          value: 'VjEtVW5hcHBsaWVkQ2FzaC0xMzk'
        },
        {
          text: 'Apr 21, 2022 - $10,000.00',
          value: 'VjEtVW5hcHBsaWVkQ2FzaC0xNDA'
        }
      ],
      'Client 6': [
        {
          text: 'Apr 21, 2022 - $250.00',
          value: 'VjEtVW5hcHBsaWVkQ2FzaC0xMzg'
        },
        {
          text: 'Apr 21, 2022 - $1,000.00',
          value: 'VjEtVW5hcHBsaWVkQ2FzaC0xNDI'
        }
      ]
    }

    expect(Object.keys(actual)).toHaveLength(3)
    expect(actual).toEqual(expected)
  })

  it('handle nil values', () => {
    const actual = getUnappliedCashGroupsAsOptions([])
    const expected = [
      {
        value: '',
        text: ''
      }
    ]

    expect(actual).toEqual(expected)
  })
})
