import { renderHook } from '@testing-library/react-hooks'
import { useGetCurrentUser } from '@staff-portal/current-user'

import useOpportunityEventOptions from './use-opportunity-event-options'

jest.mock('../data/opportunity-events.staff.gql', () => ({
  useOpportunityEvents: jest.fn(() => ({
    opportunityEvents: ['9/7/17 CFO Rising CHI', '9/13/17 GigE DAL']
  }))
}))
jest.mock('@staff-portal/current-user', () => ({
  useGetCurrentUser: jest.fn()
}))

const mockedUseGetCurrentUser = useGetCurrentUser as jest.Mock

const arrangeTest = () => {
  mockedUseGetCurrentUser.mockReturnValue({ id: 'userId' })
  const { result } = renderHook(() => useOpportunityEventOptions())

  return result.current
}

describe('useOpportunityEventOptions', () => {
  describe('when data is available', () => {
    let texts: string[]
    let values: string[]

    beforeAll(() => {
      const result = arrangeTest()

      texts = result.opportunityEventOptions.map(
        el => el.text?.toString() || ''
      )
      values = result.opportunityEventOptions.map(
        el => el.value?.toString() || ''
      )
    })

    it('renders all texts', () => {
      expect(texts).toEqual(['9/7/17 CFO Rising CHI', '9/13/17 GigE DAL'])
    })

    it('renders all values', () => {
      expect(values).toEqual(['9/7/17 CFO Rising CHI', '9/13/17 GigE DAL'])
    })
  })
})
