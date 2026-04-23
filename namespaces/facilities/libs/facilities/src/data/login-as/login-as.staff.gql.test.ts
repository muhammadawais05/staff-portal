import { waitFor } from '@testing-library/react'
import { useNavigate } from '@staff-portal/navigation'
import { useMutation } from '@staff-portal/data-layer-service'

import { useLoginAs } from './login-as.staff.gql'

jest.mock('@staff-portal/data-layer-service')

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useNavigate: jest.fn()
}))

const useNavigateMock = useNavigate as jest.Mock
const mockedUseMutation = useMutation as jest.Mock
const navigateMock = jest.fn()

describe('useloginAs', () => {
  beforeEach(() => {
    useNavigateMock.mockReturnValue(navigateMock)
  })

  it('redirects after successful mutation and call respective handlers', async () => {
    const onError = jest.fn()
    const onRedirecting = jest.fn()
    const onRedirectingComplete = jest.fn()
    const REDIRECT_URL = 'test'
    const loginAsMock = jest.fn().mockReturnValue({
      data: {
        loginAs: {
          success: true,
          returnTo: REDIRECT_URL
        }
      }
    })

    mockedUseMutation.mockReturnValue([
      loginAsMock,
      { client: { resetStore: jest.fn() } }
    ])

    const { loginAs } = useLoginAs({
      roleId: 'abc',
      onError,
      onRedirecting,
      onRedirectingComplete
    })

    loginAs()

    expect(onRedirecting).toHaveBeenCalledTimes(1)
    expect(loginAsMock).toHaveBeenCalledTimes(1)

    await waitFor(() => {
      expect(onError).not.toHaveBeenCalled()
      expect(navigateMock).toHaveBeenCalledWith(REDIRECT_URL)
    })

    expect(onRedirectingComplete).toHaveBeenCalledTimes(1)
  })

  it('clears apollo cache before redirecting', async () => {
    const REDIRECT_URL = 'test'
    const callOrder: string[] = []
    const resetStore = jest
      .fn()
      .mockImplementation(() => callOrder.push('resetStore'))

    navigateMock.mockImplementation(() => callOrder.push('navigate'))

    mockedUseMutation.mockReturnValue([
      () => ({
        data: {
          loginAs: {
            success: true,
            returnTo: REDIRECT_URL
          }
        }
      }),
      { client: { resetStore } }
    ])

    const { loginAs } = useLoginAs({ roleId: 'abc' })

    loginAs()

    await waitFor(() => {
      expect(resetStore).toHaveBeenCalled()
      expect(navigateMock).toHaveBeenCalledWith(REDIRECT_URL)
      expect(callOrder).toEqual(['resetStore', 'navigate'])
    })
  })

  it('calls onError handler', async () => {
    const onError = jest.fn()
    const onRedirecting = jest.fn()

    mockedUseMutation.mockReturnValue([
      () => ({
        data: {
          success: false
        },
        error: new Error('mutation error')
      }),
      { client: { resetStore: jest.fn() } }
    ])

    const { loginAs } = useLoginAs({ roleId: 'abc', onError, onRedirecting })

    loginAs()

    expect(onRedirecting).toHaveBeenCalledTimes(1)

    await waitFor(() => {
      expect(onError).toHaveBeenCalled()
    })
  })
})
