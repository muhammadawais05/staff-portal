import { getHasSingleUnappliedCashEntry } from './get-has-single-unapplied-cash-entry'

const input = {
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
      text: 'Apr 21, 2022 - $200.00',
      value: 'VjEtVW5hcHBsaWVkQ2FzaC0xMzc'
    },
    {
      text: 'Apr 21, 2022 - $1,000.00',
      value: 'VjEtVW5hcHBsaWVkQ2FzaC0xNDI'
    }
  ]
}

describe('#getHasSingleUnappliedCashEntry', () => {
  describe('when it has a single entry', () => {
    it('returns true', () => {
      const actual = getHasSingleUnappliedCashEntry({
        'Client 4': input['Client 2']
      })

      expect(actual).toBe(true)
    })
  })

  describe('when it has more than one entry', () => {
    it('returns false', () => {
      const actual1 = getHasSingleUnappliedCashEntry({
        'Client 4': input['Client 4'],
        'Client 2': []
      })
      const actual2 = getHasSingleUnappliedCashEntry({
        'Client 2': input['Client 2'],
        'Client 4': []
      })

      expect(actual1).toBe(false)

      expect(actual2).toBe(true)
    })
  })
})
