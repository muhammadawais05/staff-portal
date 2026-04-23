import { renderHook } from '@testing-library/react-hooks'
import { useGetCurrentUser } from '@staff-portal/current-user'

import useOpportunityOfferingOptions from './use-opportunity-offering-options'

jest.mock('../data/opportunity-offerings.staff.gql', () => ({
  useOpportunityOfferings: jest.fn(() => ({
    opportunityOfferings: ['Projects', 'Support']
  }))
}))
jest.mock('@staff-portal/current-user', () => ({
  useGetCurrentUser: jest.fn()
}))

const mockedUseGetCurrentUser = useGetCurrentUser as jest.Mock

const arrangeTest = () => {
  mockedUseGetCurrentUser.mockReturnValue({ id: 'userId' })
  const { result } = renderHook(() => useOpportunityOfferingOptions())

  return result.current
}

describe('useOpportunityOfferingOptions', () => {
  describe('when data is available', () => {
    let texts: string[]
    let values: string[]

    beforeAll(() => {
      const result = arrangeTest()

      texts = result.opportunityOfferingOptions.map(
        el => el.text?.toString() || ''
      )
      values = result.opportunityOfferingOptions.map(
        el => el.value?.toString() || ''
      )
    })

    it('renders all texts', () => {
      expect(texts).toEqual(['Projects', 'Support'])
    })

    it('renders all values', () => {
      expect(values).toEqual(['Projects', 'Support'])
    })
  })
})
