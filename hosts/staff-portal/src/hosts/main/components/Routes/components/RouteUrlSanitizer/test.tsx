import React, { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { Redirect, Route } from '@staff-portal/navigation'

import RouteUrlSanitizer from './RouteUrlSanitizer'

jest.mock('@staff-portal/navigation', () => ({
  Switch: ({ children }: { children: ReactNode }) => <>{children}</>,
  Redirect: jest.fn(),
  Route: jest.fn()
}))

const RouteMock = Route as jest.Mock
const RedirectMock = Redirect as jest.Mock

const arrangeTest = (children: ReactNode) =>
  render(<RouteUrlSanitizer>{children}</RouteUrlSanitizer>)

describe('RouteUrlSanitizer', () => {
  describe('when there are multiple `/` in pathname', () => {
    it('should re-write url', () => {
      const REDIRECT_ID = 'redirect'
      const pathname = 'pathname'
      const search = '?search'
      const hash = '#hash'

      RouteMock.mockImplementation(({ children }) => (
        <>
          {children({ location: { pathname: `///${pathname}`, search, hash } })}
        </>
      ))
      RedirectMock.mockReturnValue(<div data-testid={REDIRECT_ID} />)
      const { getByTestId } = arrangeTest(<div />)

      expect(RouteMock).toHaveBeenCalledWith(
        { path: '*', children: expect.anything() },
        expect.anything()
      )
      expect(RedirectMock).toHaveBeenCalledWith(
        { to: `/${pathname}${search}${hash}` },
        expect.anything()
      )
      expect(getByTestId(REDIRECT_ID)).toBeInTheDocument()
    })
  })

  describe('when there is one `/` in pathname', () => {
    it('should render children', () => {
      const CONTENT_ID = 'content'

      RouteMock.mockImplementation(({ children }) => (
        <>{children({ location: { pathname: '/' } })}</>
      ))

      const { getByTestId } = arrangeTest(<div data-testid={CONTENT_ID} />)

      expect(RedirectMock).not.toHaveBeenCalled()
      expect(getByTestId(CONTENT_ID)).toBeInTheDocument()
    })
  })
})
