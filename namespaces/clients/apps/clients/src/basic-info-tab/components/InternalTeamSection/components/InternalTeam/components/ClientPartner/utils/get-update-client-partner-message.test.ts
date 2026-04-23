import { getUpdateClientPartnerMessage } from '.'
import { getDetails } from './get-details'

jest.mock('./get-details')

const getDetailsMock = getDetails as jest.Mock

describe('getUpdateClientPartnerMessage', () => {
  beforeEach(() => {
    getDetailsMock.mockReturnValue('details')
  })

  describe.each([
    {
      params: { assignee: 'assignee', companies: 1, opportunities: 1 },
      expected: 'This action will also transfer details to assignee.'
    },
    {
      params: { companies: 1, opportunities: 1 },
      expected: 'The client partner will also be removed for details.'
    },
    {
      params: {
        assignee: 'assignee',
        companies: 1,
        opportunities: 1,
        updated: true
      },
      expected: 'assignee was assigned as the client partner for details.'
    },
    {
      params: {
        companies: 1,
        opportunities: 1,
        updated: true
      },
      expected: 'The client partner was also removed for details.'
    },
    {
      params: { companies: undefined, opportunities: undefined },
      expected: 'The client partner will also be removed for details.'
    }
  ])('when called with params', ({ params, expected: result }) => {
    it(`returns expected text`, () => {
      const { companies, opportunities } = params
      const text = getUpdateClientPartnerMessage(params)

      expect(getDetailsMock).toHaveBeenCalledWith({ companies, opportunities })
      expect(text).toEqual(result)
    })
  })
})
