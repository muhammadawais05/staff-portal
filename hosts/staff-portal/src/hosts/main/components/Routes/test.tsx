import React, { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { Route } from '@staff-portal/navigation'
import { Route as RouteConfig } from '@staff-portal/routes'

import { getRouteComponent } from './utils'
import Routes from './Routes'

const MODULE_ERROR_BOUNDARY_ID = 'module-error-boundary'
const ROUTE_URL_SANITIZER_ID = 'route-url-sanitizer-id'
const ROUTE_PARAMS_SANITIZER_ID = 'route-params-sanitizer-id'
const ROUTE_GUARD_ID = 'route-guard'
const REDIRECT_TO_LEGACY_ID = 'redirect-to-legacy'
const ROUTE_CONTENT_ID = 'route-content'

jest.mock('@staff-portal/ui', () => ({
  PageLoader: () => <></>
}))

jest.mock('@staff-portal/error-handling', () => ({
  ModuleErrorBoundary: ({ children }: { children: ReactNode }) => (
    <div data-testid={MODULE_ERROR_BOUNDARY_ID}>{children}</div>
  )
}))

jest.mock('@staff-portal/navigation', () => ({
  Switch: ({ children }: { children: ReactNode }) => <>{children}</>,
  Route: jest.fn()
}))

jest.mock('./components', () => ({
  RouteUrlSanitizer: ({ children }: { children: ReactNode }) => (
    <div data-testid={ROUTE_URL_SANITIZER_ID}>{children}</div>
  ),
  RouteParamSanitizer: ({ children }: { children: ReactNode }) => (
    <div data-testid={ROUTE_PARAMS_SANITIZER_ID}>{children}</div>
  ),
  RouteGuard: ({ children }: { children: ReactNode }) => (
    <div data-testid={ROUTE_GUARD_ID}>{children}</div>
  ),
  RedirectToLegacyPage: () => <div data-testid={REDIRECT_TO_LEGACY_ID} />
}))

jest.mock('./utils', () => ({
  getRouteComponent: jest.fn()
}))

const RouteMock = Route as jest.Mock
const getRouteComponentMock = getRouteComponent as jest.Mock<
  ReturnType<typeof getRouteComponent>
>

const arrangeTest = (routes: RouteConfig[]) =>
  render(<Routes routes={routes} />)

describe('Routes', () => {
  it('should render routes', () => {
    const ROUTES = [
      { path: 'path-1' },
      { path: 'path-2' }
    ] as unknown as RouteConfig[]

    RouteMock.mockImplementation(({ children }: { children: ReactNode }) => (
      <>{children}</>
    ))

    getRouteComponentMock.mockReturnValue(
      <div data-testid={ROUTE_CONTENT_ID} />
    )

    const { getAllByTestId, getByTestId } = arrangeTest(ROUTES)

    expect(getByTestId(MODULE_ERROR_BOUNDARY_ID)).toBeInTheDocument()
    expect(getByTestId(ROUTE_URL_SANITIZER_ID)).toBeInTheDocument()

    expect(RouteMock).toHaveBeenCalledTimes(3)
    expect(RouteMock.mock.calls[0]).toEqual([
      { exact: true, path: ROUTES[0].path, children: expect.anything() },
      expect.anything()
    ])
    expect(RouteMock.mock.calls[1]).toEqual([
      { exact: true, path: ROUTES[1].path, children: expect.anything() },
      expect.anything()
    ])

    expect(getRouteComponentMock).toHaveBeenCalledTimes(2)
    expect(getAllByTestId(ROUTE_PARAMS_SANITIZER_ID)).toHaveLength(2)
    expect(getAllByTestId(ROUTE_GUARD_ID)).toHaveLength(2)
    expect(getAllByTestId(ROUTE_CONTENT_ID)).toHaveLength(2)

    expect(RouteMock.mock.calls[2]).toEqual([
      { children: expect.anything() },
      expect.anything()
    ])
    expect(getByTestId(REDIRECT_TO_LEGACY_ID)).toBeInTheDocument()
  })
})
