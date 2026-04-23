import { NegotiationStatus } from '@staff-portal/graphql/staff'
import { NO_VALUE } from '@staff-portal/config'

import {
  getCompanyNegotiationStatusColor,
  getCompanyNegotiationStatusText
} from '.'

describe.each([
  [NegotiationStatus.FINISHED_NOT_SIGNED, 'green'],
  [NegotiationStatus.SIGNED, 'green'],
  [NegotiationStatus.WAITING_ON_CLIENT, 'yellow'],
  [NegotiationStatus.WAITING_ON_TOPTAL, 'red'],
  [undefined, 'dark-grey']
])('#getCompanyNegotiationStatusColor', (variant, color) => {
  describe(`when variant is ${JSON.stringify(variant)}`, () => {
    it(`return the following color ${color}`, () => {
      expect(getCompanyNegotiationStatusColor(variant)).toBe(color)
    })
  })
})

describe.each([
  {
    case: NegotiationStatus.FINISHED_NOT_SIGNED,
    currentNegotiation: {
      id: '123',
      status: NegotiationStatus.FINISHED_NOT_SIGNED
    },
    expected: 'Finished, Not Signed'
  },
  {
    case: NegotiationStatus.SIGNED,
    currentNegotiation: {
      id: '123',
      status: NegotiationStatus.SIGNED
    },
    expected: 'Signed'
  },
  {
    case: NegotiationStatus.WAITING_ON_CLIENT,
    currentNegotiation: {
      id: '123',
      status: NegotiationStatus.WAITING_ON_CLIENT,
      rounds: 60,
      negotiationDays: 365
    },
    expected: 'Waiting on Client (round: #60, 365 days)'
  },
  {
    case: NegotiationStatus.WAITING_ON_TOPTAL,
    currentNegotiation: {
      id: '123',
      status: NegotiationStatus.WAITING_ON_TOPTAL,
      rounds: 60,
      negotiationDays: 365
    },
    expected: 'Waiting on Toptal (round: #60, 365 days)'
  },
  {
    case: NegotiationStatus.WAITING_ON_CLIENT,
    currentNegotiation: {
      id: '123',
      status: NegotiationStatus.WAITING_ON_CLIENT,
      rounds: 1,
      negotiationDays: 0
    },
    expected: 'Waiting on Client (round: #1, 0 days)'
  },
  {
    case: NegotiationStatus.WAITING_ON_CLIENT,
    currentNegotiation: {
      id: '123',
      status: NegotiationStatus.WAITING_ON_CLIENT,
      rounds: 1,
      negotiationDays: 1
    },
    expected: 'Waiting on Client (round: #1, 1 day)'
  },
  {
    case: undefined,
    currentNegotiation: {
      status: undefined
    },
    expected: NO_VALUE
  }
])('#getCompanyNegotiationStatusText', ({ currentNegotiation, expected }) => {
  it('works as expected', () => {
    const text = getCompanyNegotiationStatusText(currentNegotiation)

    expect(text).toBe(expected)
  })
})
