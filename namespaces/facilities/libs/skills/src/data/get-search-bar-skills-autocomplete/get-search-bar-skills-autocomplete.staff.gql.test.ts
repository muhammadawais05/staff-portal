import { renderHook } from '@testing-library/react-hooks'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { useGetSearchBarSkillsAutocomplete } from './get-search-bar-skills-autocomplete.staff.gql'
import { GetSearchBarSkillsAutocompleteQuery } from './get-search-bar-skills-autocomplete.staff.gql.types'

jest.mock('@staff-portal/data-layer-service')

const mockedUseLazyQuery = useLazyQuery as jest.Mock
const mockedRequest = jest.fn()

const arrangeTest = ({
  data,
  loading = false,
  called = true
}: {
  data?: GetSearchBarSkillsAutocompleteQuery | undefined
  loading?: boolean
  called?: boolean
}) => {
  mockedUseLazyQuery.mockImplementation(() => [
    mockedRequest,
    {
      data,
      loading,
      called
    }
  ])
}

const mockedResponse = [
  {
    key: '1',
    label: 'ruby',
    labelHighlight: 'Ruby',
    node: { id: '1' },
    nodeTypes: []
  }
]

describe('useGetSearchBarSkillsAutocomplete', () => {
  describe('when data is loaded', () => {
    it('fetches skills autocomplete suggestions', () => {
      arrangeTest({
        data: {
          autocomplete: {
            edges: mockedResponse
          }
        }
      })

      const { result } = renderHook(() => useGetSearchBarSkillsAutocomplete())

      expect(result.current).toEqual({
        fetchData: expect.any(Function),
        called: true,
        loading: false,
        data: mockedResponse
      })
    })
  })

  describe('when data is loading', () => {
    it('returns no data', () => {
      arrangeTest({ loading: true })

      const { result } = renderHook(() => useGetSearchBarSkillsAutocomplete())

      expect(result.current).toEqual({
        fetchData: expect.any(Function),
        called: true,
        loading: true
      })
    })
  })
})
