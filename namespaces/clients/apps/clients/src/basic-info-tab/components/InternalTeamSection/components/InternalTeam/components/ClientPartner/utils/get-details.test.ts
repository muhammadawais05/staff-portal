import pluralize from 'pluralize'

import { getDetails } from './get-details'

jest.mock('pluralize')

const pluralizeMock = pluralize as unknown as jest.Mock

describe('getDetails', () => {
  beforeEach(() => {
    pluralizeMock.mockReturnValue('text')
  })

  describe.each([
    {
      params: { companies: 0, opportunities: 1 },
      expected: '1 text'
    },
    {
      params: { companies: undefined, opportunities: 1 },
      expected: '1 text'
    }
  ])('when opportunity is provided', ({ expected, params }) => {
    it('returns expected string', () => {
      const result = getDetails(params)

      expect(pluralizeMock).toHaveBeenCalledWith(
        'opportunity',
        params.opportunities
      )
      expect(result).toEqual(expected)
    })
  })

  describe.each([
    {
      params: { companies: 1, opportunities: 0, text: 'company' },
      expected: '1 text'
    },
    {
      params: { companies: 1, opportunities: undefined, text: 'company' },
      expected: '1 text'
    }
  ])('when company is provided', ({ expected, params }) => {
    it('returns expected string', () => {
      const result = getDetails(params)

      expect(pluralizeMock).toHaveBeenCalledWith('company', params.companies)
      expect(result).toEqual(expected)
    })
  })

  describe('when company and opportuniry are provided', () => {
    it('returns expected string', () => {
      const { expected, params } = {
        params: { companies: 1, opportunities: 1 },
        expected: '1 text and 1 text'
      }

      const result = getDetails(params)

      expect(pluralizeMock).toHaveBeenNthCalledWith(
        1,
        'company',
        params.companies
      )
      expect(pluralizeMock).toHaveBeenNthCalledWith(
        2,
        'opportunity',
        params.companies
      )
      expect(result).toEqual(expected)
    })
  })
})
