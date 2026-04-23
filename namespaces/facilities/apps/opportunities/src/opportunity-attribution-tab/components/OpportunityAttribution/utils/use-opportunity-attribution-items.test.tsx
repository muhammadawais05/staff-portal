import { renderHook } from '@testing-library/react-hooks'
import { useGetCurrentUser } from '@staff-portal/current-user'

import { useOpportunityAttributionItems } from './use-opportunity-attribution-items'
import { OpportunityAttributionFragment } from '../data'
import { opportunityAttributionFragmentMock } from '../data/opportunity-attribution-fragment.mock'

jest.mock('../components/OpportunityAttributionEvent')
jest.mock('../components/OpportunityAttributionMarketingCampaign')
jest.mock('../components/OpportunityAttributionOffering')
jest.mock('../components/OpportunityAttributionPartner')
jest.mock('../components/OpportunityAttributionSource')
jest.mock('@staff-portal/current-user', () => ({
  useGetCurrentUser: jest.fn()
}))
jest.mock('./use-opportunity-attribution-mutation', () => ({
  useOpportunityAttributionMutation: () => ({ handleChange: jest.fn() })
}))

const mockedUseGetCurrentUser = useGetCurrentUser as jest.Mock

const arrangeTest = (params: Partial<OpportunityAttributionFragment> = {}) => {
  mockedUseGetCurrentUser.mockReturnValue({ id: 'userId' })
  const { result } = renderHook(() =>
    useOpportunityAttributionItems({
      opportunityAttribution: {
        ...opportunityAttributionFragmentMock,
        ...params
      }
    })
  )

  return result.current
}

describe('useOpportunityAttributionItems', () => {
  describe('when data is available', () => {
    let labels: string[]

    beforeAll(() => {
      const result = arrangeTest()

      labels = result.map(el => el.label?.toString() || '')
    })

    it('renders all items', () => {
      expect(labels).toEqual([
        'Partner',
        'Offering',
        'Source',
        'Event',
        'Marketing Campaign',
        ''
      ])
    })
  })
})
