import { Hold } from '@staff-portal/graphql/staff'

import * as paymentHelpers from '.'

describe.each([
  [
    {
      amountThreshold: null,
      creationReason: 'exampleReason',
      dateThreshold: '2015-05-15'
    },
    'until May 15, 2015'
  ],
  [
    {
      amountThreshold: '2200.654',
      creationReason: 'exampleReason',
      dateThreshold: null
    },
    'with a threshold of $2,200.65'
  ],
  [
    {
      amountThreshold: null,
      creationReason: 'exampleReason',
      dateThreshold: null
    },
    'until requested'
  ]
])('#getPaymentOnHold', (mockHold: Hold, text) => {
  describe(`when dateThreshold is ${JSON.stringify(
    mockHold.dateThreshold
  )}`, () => {
    describe(`when amountThreshold is ${JSON.stringify(
      mockHold.amountThreshold
    )}`, () => {
      it('returns proper string representation', () => {
        const result = paymentHelpers.getPaymentOnHold(mockHold)

        expect(result).toBe(text)
      })
    })
  })
})
