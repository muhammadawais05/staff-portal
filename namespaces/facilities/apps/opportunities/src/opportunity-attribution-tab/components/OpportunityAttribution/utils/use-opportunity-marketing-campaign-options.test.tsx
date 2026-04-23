import { renderHook } from '@testing-library/react-hooks'
import { useGetCurrentUser } from '@staff-portal/current-user'

import useOpportunityMarketingCampaignOptions from './use-opportunity-marketing-campaign-options'

jest.mock('../data/opportunity-marketing-campaigns.staff.gql', () => ({
  useOpportunityMarketingCampaigns: jest.fn(() => ({
    opportunityMarketingCampaigns: ['Retail', 'SEO']
  }))
}))
jest.mock('@staff-portal/current-user', () => ({
  useGetCurrentUser: jest.fn()
}))

const mockedUseGetCurrentUser = useGetCurrentUser as jest.Mock

const arrangeTest = () => {
  mockedUseGetCurrentUser.mockReturnValue({ id: 'userId' })
  const { result } = renderHook(() => useOpportunityMarketingCampaignOptions())

  return result.current
}

describe('useOpportunityEventOptions', () => {
  describe('when data is available', () => {
    let texts: string[]
    let values: string[]

    beforeAll(() => {
      const result = arrangeTest()

      texts = result.opportunityMarketingCampaignOptions.map(
        el => el.text?.toString() || ''
      )
      values = result.opportunityMarketingCampaignOptions.map(
        el => el.value?.toString() || ''
      )
    })

    it('renders all texts', () => {
      expect(texts).toEqual(['Retail', 'SEO'])
    })

    it('renders all values', () => {
      expect(values).toEqual(['Retail', 'SEO'])
    })
  })
})
