import { renderHook } from '@testing-library/react-hooks'
import { useQuery } from '@staff-portal/data-layer-service'

import { createGetCurrentUserMock } from './mocks'
import { useGetCurrentUser } from '../..'

jest.mock('@staff-portal/data-layer-service')

const mockUseQuery = useQuery as jest.Mock

describe('useGetCurrentUser', () => {
  it('returns a user object', () => {
    const mockedUserData = createGetCurrentUserMock().result.data

    mockUseQuery.mockReturnValue({
      data: mockedUserData,
      error: false,
      loading: false
    })

    const { result } = renderHook(() => useGetCurrentUser())

    expect(result.current).toBe(mockedUserData.viewer.me)
  })
})
