import { renderHook } from '@testing-library/react-hooks'
import { useGetNode } from '@staff-portal/data-layer-service'

import useGetOpportunitySearchData from './use-get-opportunity-search-data'
import { GetPerformedActionOpportunitySearchDataQuery } from '../../data/get-performed-action-opportunity-search-data'

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useGetNode: jest.fn()
}))
const useGetNodeMock = useGetNode as jest.Mock

const arrangeTest = (
  node: GetPerformedActionOpportunitySearchDataQuery['node']
) => {
  useGetNodeMock.mockImplementation(() => () => ({ data: node }))
}

describe('useGetEntitySearchData', () => {
  describe('when search data is fetched', () => {
    it('renders a valid opportunity search data', () => {
      arrangeTest({
        id: '',
        type: 'SMBOpportunity'
      })

      const { result } = renderHook(() =>
        useGetOpportunitySearchData({
          entityType: '',
          entityId: '',
          decodedEntityId: '123'
        })
      )

      expect(result.current).toEqual({
        entityGid: 'gid://platform/SMBOpportunity/123',
        searchVariables: {
          feeds: [['gid://platform/SMBOpportunity/123']]
        }
      })
    })
  })

  describe('when search data is empty', () => {
    it('renders a valid opportunity search data', () => {
      arrangeTest(null)

      const { result } = renderHook(() =>
        useGetOpportunitySearchData({
          entityType: '',
          entityId: '',
          decodedEntityId: '123'
        })
      )

      expect(result.current).toBeNull()
    })
  })
})
