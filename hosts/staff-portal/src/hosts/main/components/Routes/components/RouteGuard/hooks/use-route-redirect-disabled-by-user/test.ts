import { renderHook } from '@testing-library/react-hooks'
import { queryStringToObject, useLocation } from '@staff-portal/navigation'
import { localStorageService } from '@staff-portal/local-storage-service'
import { EnvironmentTypes } from '@toptal/picasso/EnvironmentBanner/EnvironmentBanner'

import { useRouteRedirectDisabledByUser } from './use-route-redirect-disabled-by-user'

const ENABLE_ALL_PATHS_QUERY_PARAM_KEY = 'enableAllPaths'
const LOCAL_STORAGE_KEY = 'all-paths-are-enabled-by-user'
const mockEnvironment = jest.fn<EnvironmentTypes, []>()

jest.mock('@staff-portal/config', () => ({
  get ENVIRONMENT() {
    return mockEnvironment()
  }
}))

jest.mock('@staff-portal/navigation', () => ({
  queryStringToObject: jest.fn(),
  useLocation: jest.fn()
}))

jest.mock('@staff-portal/local-storage-service', () => ({
  localStorageService: {
    setItem: jest.fn(),
    getItem: jest.fn()
  }
}))

const useLocationMock = useLocation as jest.Mock
const queryStringToObjectMock = queryStringToObject as jest.Mock<
  ReturnType<typeof queryStringToObject>
>
const localStorageServiceMock = localStorageService as unknown as {
  getItem: jest.Mock<ReturnType<typeof localStorageService.getItem>>
  setItem: jest.Mock<ReturnType<typeof localStorageService.setItem>>
}

describe('useRouteRedirectDisabledByUser', () => {
  beforeEach(() => {
    useLocationMock.mockReturnValue({})
  })

  it('should return true if flag is present in query param and save it to local storage', () => {
    const search = 'test_search'

    useLocationMock.mockReturnValue({ search })
    queryStringToObjectMock.mockReturnValue({
      [ENABLE_ALL_PATHS_QUERY_PARAM_KEY]: undefined
    })

    const { result } = renderHook(useRouteRedirectDisabledByUser)

    expect(queryStringToObjectMock).toHaveBeenCalledWith(search)
    expect(localStorageServiceMock.setItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEY,
      true
    )
    expect(localStorageServiceMock.getItem).not.toHaveBeenCalledWith(
      LOCAL_STORAGE_KEY
    )
    expect(result.current).toBe(true)
  })

  it('should return false if flag is present as disabled in query param and update the local storage', () => {
    queryStringToObjectMock.mockReturnValue({
      [ENABLE_ALL_PATHS_QUERY_PARAM_KEY]: 'false'
    })

    const { result } = renderHook(useRouteRedirectDisabledByUser)

    expect(localStorageServiceMock.setItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEY,
      false
    )
    expect(result.current).toBe(false)
  })

  it('should return true if flag is not present in query param but is present in local storage', () => {
    queryStringToObjectMock.mockReturnValue({})
    localStorageServiceMock.getItem.mockReturnValue(true)

    const { result } = renderHook(useRouteRedirectDisabledByUser)

    expect(localStorageServiceMock.getItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEY
    )
    expect(result.current).toBe(true)
  })

  it('should return false if flag is missing from query param and local storage', () => {
    queryStringToObjectMock.mockReturnValue({})
    localStorageServiceMock.getItem.mockReturnValue(null)

    const { result } = renderHook(useRouteRedirectDisabledByUser)

    expect(localStorageServiceMock.getItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEY
    )
    expect(result.current).toBe(false)
  })

  it('should return false in production environment', () => {
    mockEnvironment.mockReturnValue('production')

    const { result } = renderHook(useRouteRedirectDisabledByUser)

    expect(queryStringToObjectMock).not.toHaveBeenCalled()
    expect(localStorageServiceMock.setItem).not.toHaveBeenCalled()
    expect(localStorageServiceMock.getItem).not.toHaveBeenCalled()
    expect(result.current).toBe(false)
  })
})
