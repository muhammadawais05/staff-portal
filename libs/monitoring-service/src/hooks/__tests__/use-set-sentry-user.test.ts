import { renderHook } from '@testing-library/react-hooks'
import * as Sentry from '@sentry/react'

import useSetSentryUser from '../use-set-sentry-user'

jest.mock('@sentry/react')

type RenderHookProps = {
  currentUser: Parameters<typeof useSetSentryUser>[0]
}

describe('useSetSentryUser', () => {
  it('configures sentry scope with user id when enabled', () => {
    const mockedScope = ({
      setUser: jest.fn()
    } as unknown) as Sentry.Scope

    const configureScopeSpy = jest
      .spyOn(Sentry, 'configureScope')
      .mockImplementation(fn => fn(mockedScope))

    const initialProps: RenderHookProps = {
      currentUser: undefined
    }

    const { rerender } = renderHook(
      ({ currentUser }) => useSetSentryUser(currentUser),
      { initialProps }
    )

    expect(configureScopeSpy).not.toHaveBeenCalled()

    rerender({
      currentUser: {
        id: 'test-user-id'
      }
    })

    expect(configureScopeSpy).toHaveBeenCalled()
    expect(mockedScope.setUser).toHaveBeenCalledWith({ id: 'test-user-id' })
  })
})
