import { renderHook } from '@testing-library/react-hooks'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { getClientContactNameHook } from './get-client-contact-name-hook'
import { GetClientContactNameQuery } from '../data/get-client-contact-name.staff.gql.types'

jest.mock('@staff-portal/data-layer-service')

const mockedUseLazyQuery = useLazyQuery as jest.Mock
const mockedRequest = jest.fn()

const arrangeTest = ({
  data,
  loading = false,
  called = true
}: {
  data?: GetClientContactNameQuery | undefined
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

describe('useGetClientContactName', () => {
  describe('when data is loaded', () => {
    it('fetches client contact name', () => {
      arrangeTest({
        data: {
          node: {
            id: 'baz',
            contact: { id: 'bar', fullName: 'John Doe' }
          }
        }
      })

      const { result } = renderHook(() => getClientContactNameHook('foo'))

      expect(result.current()).toEqual({
        request: mockedRequest,
        called: true,
        loading: false,
        data: 'John Doe'
      })
    })
  })

  describe('when data is loading', () => {
    it('returns no data', () => {
      arrangeTest({ loading: true })

      const { result } = renderHook(() => getClientContactNameHook('foo'))

      expect(result.current()).toEqual({
        request: mockedRequest,
        called: true,
        loading: true
      })
    })
  })
})
