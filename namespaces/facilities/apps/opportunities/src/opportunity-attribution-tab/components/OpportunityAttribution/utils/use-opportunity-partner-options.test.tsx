import { renderHook } from '@testing-library/react-hooks'
import { useGetCurrentUser } from '@staff-portal/current-user'

import useOpportunityPartnerOptions from './use-opportunity-partner-options'

jest.mock('../data/opportunity-partners.staff.gql', () => ({
  useOpportunityPartners: jest.fn(() => ({
    opportunityPartners: ['Consulting', 'Other']
  }))
}))
jest.mock('@staff-portal/current-user', () => ({
  useGetCurrentUser: jest.fn()
}))

const mockedUseGetCurrentUser = useGetCurrentUser as jest.Mock

const arrangeTest = () => {
  mockedUseGetCurrentUser.mockReturnValue({ id: 'userId' })
  const { result } = renderHook(() => useOpportunityPartnerOptions())

  return result.current
}

describe('useOpportunityEventOptions', () => {
  describe('when data is available', () => {
    let texts: string[]
    let values: string[]

    beforeAll(() => {
      const result = arrangeTest()

      texts = result.opportunityPartnerOptions.map(
        el => el.text?.toString() || ''
      )
      values = result.opportunityPartnerOptions.map(
        el => el.value?.toString() || ''
      )
    })

    it('renders all texts', () => {
      expect(texts).toEqual(['Consulting', 'Other'])
    })

    it('renders all values', () => {
      expect(values).toEqual(['Consulting', 'Other'])
    })
  })
})
