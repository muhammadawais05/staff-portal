import { getBillingTermsOptions } from './get-billing-terms-options'

describe('getBillingTermsOptions', () => {
  describe.each([
    {
      expected: 'returns billing term for value 0',
      params: [0],
      result: [{ text: `Upon receipt`, value: 0 }]
    },
    {
      expected: 'returns billing terms',
      params: [0, 10, 20],
      result: [
        { text: `Upon receipt`, value: 0 },
        {
          text: 'Net 10',
          value: 10
        },
        {
          text: 'Net 20',
          value: 20
        }
      ]
    }
  ])('returns expected', ({ expected, params, result }) => {
    it(`${expected}`, () => {
      expect(getBillingTermsOptions(params)).toStrictEqual(result)
    })
  })
})
