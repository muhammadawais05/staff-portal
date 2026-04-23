import { renderHook } from '@testing-library/react-hooks'
import { useGetCurrentUser } from '@staff-portal/current-user'

import useOpportunitySourceOptions from './use-opportunity-source-options'

jest.mock('../data/opportunity-sources.staff.gql', () => ({
  useOpportunitySources: jest.fn(() => ({
    opportunitySources: ['Email', 'AdWords']
  }))
}))
jest.mock('@staff-portal/current-user', () => ({
  useGetCurrentUser: jest.fn()
}))

const mockedUseGetCurrentUser = useGetCurrentUser as jest.Mock

const arrangeTest = () => {
  mockedUseGetCurrentUser.mockReturnValue({ id: 'userId' })
  const { result } = renderHook(() => useOpportunitySourceOptions())

  return result.current
}

describe('useOpportunitySourceOptions', () => {
  describe('when data is available', () => {
    let texts: string[]
    let values: string[]

    beforeAll(() => {
      const result = arrangeTest()

      texts = result.opportunitySourceOptions.map(
        el => el.text?.toString() || ''
      )
      values = result.opportunitySourceOptions.map(
        el => el.value?.toString() || ''
      )
    })

    it('renders all texts', () => {
      expect(texts).toEqual(['Email', 'AdWords'])
    })

    it('renders all values', () => {
      expect(values).toEqual(['Email', 'AdWords'])
    })
  })
})
