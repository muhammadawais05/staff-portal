import { navigateExternallyTo, useLocation } from '@staff-portal/navigation'
import { getLegacyUrlWithRewrite } from '@staff-portal/routes'
import { renderHook, act } from '@testing-library/react-hooks'

import { useRedirectToLegacy } from './use-redirect-to-legacy'

jest.mock('@staff-portal/navigation', () => ({
  navigateExternallyTo: jest.fn(),
  useLocation: jest.fn()
}))

jest.mock('@staff-portal/routes', () => ({
  getLegacyUrlWithRewrite: jest.fn()
}))

const useLocationMock = useLocation as jest.Mock
const navigateExternallyToMock = navigateExternallyTo as jest.Mock
const getLegacyUrlWithRewriteMock = getLegacyUrlWithRewrite as jest.Mock

describe('useRedirectToLegacy', () => {
  it('should redirect to legacy', () => {
    const pathname = 'pathname'
    const search = 'search'
    const hash = 'hash'

    useLocationMock.mockReturnValue({ pathname, search, hash })

    const { result } = renderHook(useRedirectToLegacy)

    expect(useLocationMock).toHaveBeenCalled()
    expect(result.current.isRedirecting).toBe(false)
    expect(result.current.redirectToLegacy).toEqual(expect.any(Function))

    const redirectUrl = 'redirect_url'

    getLegacyUrlWithRewriteMock.mockReturnValue(redirectUrl)

    act(() => {
      result.current.redirectToLegacy()
    })

    expect(getLegacyUrlWithRewriteMock).toHaveBeenCalledWith(
      pathname,
      search,
      hash
    )
    expect(navigateExternallyToMock).toHaveBeenCalledWith(redirectUrl, true)
  })
})
