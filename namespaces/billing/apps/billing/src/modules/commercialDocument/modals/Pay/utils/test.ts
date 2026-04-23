import { BillingMethodName } from '@staff-portal/graphql/staff'

import {
  getIsSingleClientWithSingleUnappliedCashEntry,
  validateUnappliedCash,
  getPaymentSourceItems,
  filterClientsWithPositiveBalance
} from '.'

const availableSources = {
  [BillingMethodName.ACH]: {
    preferred: false,
    newestId: 1,
    options: [
      {
        disabled: false,
        id: '1',
        last4Digits: '1234',
        numericId: 123456789,
        primary: false
      }
    ]
  },
  [BillingMethodName.CREDIT_CARD]: {
    preferred: false,
    newestId: 2,
    options: [
      {
        disabled: false,
        id: '2',
        last4Digits: '1234',
        numericId: 123456789,
        primary: false
      }
    ]
  }
}

describe('#validateUnappliedCash', () => {
  describe('when paymentSource is UNAPPLIED_CASH and the unappliedCashAmount is less than the passed value', () => {
    it('returns validation error', () => {
      const actual = validateUnappliedCash('4', {
        paymentSource: 'UNAPPLIED_CASH',
        unappliedCashAmount: '2'
      })
      const expected = 'The value cannot be greater than Unapplied Cash balance'

      expect(actual).toEqual(expected)
    })
  })

  describe('when paymentSource is UNAPPLIED_CASH and the unappliedCashAmount is larger than the passed value', () => {
    it('returns undefined', () => {
      const actual = validateUnappliedCash('2', {
        paymentSource: 'UNAPPLIED_CASH',
        unappliedCashAmount: '3'
      })

      expect(actual).toBeUndefined()
    })
  })

  describe('on all other cases', () => {
    it.each`
      allValues                                                              | value
      ${{ paymentSource: 'UNAPPLIED_CASH', unappliedCashAmount: undefined }} | ${'2'}
      ${{ paymentSource: 'something_else', unappliedCashAmount: '2' }}       | ${'2'}
      ${{ paymentSource: undefined, unappliedCashAmount: '2' }}              | ${'2'}
      ${{ paymentSource: undefined, unappliedCashAmount: undefined }}        | ${''}
    `('returns undefined', ({ value, allValues }) => {
      const actual = validateUnappliedCash(value, allValues)

      expect(actual).toBeUndefined()
    })
  })
})

describe('#getPaymentSourceItems', () => {
  describe('when there is only a single client with single UC entry', () => {
    it('returns the UC label with the only available balance', () => {
      const clients = [
        {
          id: '1',
          unappliedCashBalance: '1000',
          fullName: 'Client 1',
          unappliedCashEntries: [
            {
              id: '2',
              availableAmount: '1000'
            }
          ]
        }
      ]
      const actual = getPaymentSourceItems({
        availableSources,
        clients,
        isSingleClientWithSingleUnappliedCashEntry: true
      })
      const expected = [
        {
          disabled: false,
          label: 'Record external payment (once payment has cleared)',
          newestId: 1,
          preferred: false,
          value: 'RECORD'
        },
        {
          disabled: false,
          label: 'Charge via Credit Card',
          newestId: 2,
          preferred: false,
          value: 'CREDIT_CARD'
        },
        {
          disabled: false,
          label: 'Charge via ACH',
          newestId: 1,
          preferred: false,
          value: 'ACH'
        },
        {
          disabled: false,
          label: 'Pending receipt',
          newestId: 1,
          preferred: false,
          value: 'PENDING_RECEIPT'
        },
        {
          disabled: false,
          label: 'Unapplied Cash $1,000.00',
          newestId: 1,
          preferred: false,
          value: 'UNAPPLIED_CASH'
        }
      ]

      expect(actual).toEqual(expected)
    })
  })

  describe('when there are multiple UC entries', () => {
    it('returns the default label for UC', () => {
      const clients = [
        {
          id: 1,
          unappliedCashBalance: '3000',
          fullName: 'Client 1',
          unappliedCashEntries: {
            nodes: [
              {
                id: '2',
                amount: '1000'
              },
              {
                id: '3',
                amount: '2000'
              }
            ]
          }
        }
      ]

      const actual = getPaymentSourceItems({
        availableSources,
        clients,
        isSingleClientWithSingleUnappliedCashEntry: false
      })
      const expected = [
        {
          disabled: false,
          label: 'Record external payment (once payment has cleared)',
          newestId: 1,
          preferred: false,
          value: 'RECORD'
        },
        {
          disabled: false,
          label: 'Charge via Credit Card',
          newestId: 2,
          preferred: false,
          value: 'CREDIT_CARD'
        },
        {
          disabled: false,
          label: 'Charge via ACH',
          newestId: 1,
          preferred: false,
          value: 'ACH'
        },
        {
          disabled: false,
          label: 'Pending receipt',
          newestId: 1,
          preferred: false,
          value: 'PENDING_RECEIPT'
        },
        {
          disabled: false,
          label: 'Unapplied Cash',
          newestId: 1,
          preferred: false,
          value: 'UNAPPLIED_CASH'
        }
      ]

      expect(actual).toEqual(expected)
    })
  })
})

describe('#getIsSingleClientWithSingleUnappliedCashEntry', () => {
  describe('when there is only a single client with single UC entry', () => {
    it('returns true', () => {
      const clients = [
        {
          id: '1',
          unappliedCashBalance: '1000',
          fullName: 'Client 1',
          unappliedCashEntries: {
            nodes: [
              {
                id: '2',
                availableAmount: '1000'
              }
            ]
          }
        }
      ]

      const actual = getIsSingleClientWithSingleUnappliedCashEntry(clients, '1')

      expect(actual).toBe(true)
    })
  })

  describe('when there is only a single client with multiple UC entries with 0 balance', () => {
    it('returns false', () => {
      const clients = [
        {
          id: '1',
          unappliedCashBalance: '0',
          fullName: 'Client 1',
          unappliedCashEntries: {
            nodes: [
              {
                id: '2',
                availableAmount: '0'
              },
              {
                id: '3',
                availableAmount: '0'
              }
            ]
          }
        }
      ]

      const actual = getIsSingleClientWithSingleUnappliedCashEntry(clients, '1')

      expect(actual).toBe(false)
    })
  })

  describe('when there is only a single client with a single valid UC entry but with multiple UC entries with 0 balance', () => {
    it('returns false', () => {
      const clients = [
        {
          id: '1',
          unappliedCashBalance: '2000',
          fullName: 'Client 1',
          unappliedCashEntries: {
            nodes: [
              {
                id: '2',
                availableAmount: '0'
              },
              {
                id: '3',
                availableAmount: '2000'
              }
            ]
          }
        }
      ]

      const actual = getIsSingleClientWithSingleUnappliedCashEntry(clients, '1')

      expect(actual).toBe(true)
    })
  })
})

describe('#filterClientsWithPositiveBalance', () => {
  it('returns the clients with positive balance and positive UC entries', () => {
    const clients = [
      {
        id: '1',
        unappliedCashBalance: '2000',
        fullName: 'Client 1',
        unappliedCashEntries: {
          nodes: [
            {
              id: '2',
              availableAmount: '0'
            },
            {
              id: '3',
              availableAmount: '2000'
            }
          ]
        }
      }
    ]

    const actual = filterClientsWithPositiveBalance(clients)

    const expected = [
      {
        id: '1',
        unappliedCashBalance: '2000',
        fullName: 'Client 1',
        unappliedCashEntries: {
          nodes: [
            {
              id: '3',
              availableAmount: '2000'
            }
          ]
        }
      }
    ]

    expect(actual).toEqual(expected)
  })
})
