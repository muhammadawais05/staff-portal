import React, { ReactNode } from 'react'
import { render } from '@testing-library/react'
import {
  generatePath,
  useLocation,
  useRouteMatch,
  Redirect
} from '@staff-portal/navigation'

import RouteParamSanitizer from './RouteParamSanitizer'

jest.mock('@staff-portal/navigation')

const useRouteMatchMock = useRouteMatch as jest.Mock
const useLocationMock = useLocation as jest.Mock
const generatePathMock = generatePath as jest.Mock
const RedirectMock = Redirect as jest.Mock

const arrangeTest = (children: ReactNode = null) =>
  render(<RouteParamSanitizer>{children}</RouteParamSanitizer>)

describe('RouteParamSanitizer', () => {
  beforeEach(() => {
    RedirectMock.mockReturnValue(null)
    useRouteMatchMock.mockReturnValue({ params: {} })
    useLocationMock.mockReturnValue({})
  })

  it('calls `useRouteMatch` and `useLocation` for the current route', () => {
    arrangeTest()

    expect(useRouteMatchMock).toHaveBeenCalledWith()
    expect(useLocationMock).toHaveBeenCalled()
  })

  it('calls `generatePath` by excluding `_` param from `useRouteMatch`', () => {
    const param1 = 'param1'
    const param2 = 'param2'
    const path = 'path'

    useRouteMatchMock.mockReturnValue({
      params: { param1, param2, _: '_' },
      path
    })
    arrangeTest()

    expect(generatePathMock).toHaveBeenCalledWith(path, { param1, param2 })
  })

  describe('RouteParamSanitizer render', () => {
    const REDIRECT_ID = 'REDIRECT_ID'
    const CHILDREN_ID = 'CHILDREN_ID'
    const URL = 'clean_url'

    beforeEach(() => {
      useRouteMatchMock.mockReturnValue({ params: {}, url: URL })
      RedirectMock.mockReturnValue(<div data-testid={REDIRECT_ID} />)
    })

    describe('when url is clean', () => {
      it('should render `children` and not redirect', () => {
        generatePathMock.mockReturnValue(URL)

        const { queryByTestId } = arrangeTest(<div data-testid={CHILDREN_ID} />)

        expect(queryByTestId(CHILDREN_ID)).toBeInTheDocument()
        expect(queryByTestId(REDIRECT_ID)).not.toBeInTheDocument()
      })
    })

    describe('when url is not clean', () => {
      it('should not render `children` and redirect', () => {
        const search = '?search'
        const hash = '#hash'
        const newUrl = 'newUrl'

        useLocationMock.mockReturnValue({ search, hash })
        generatePathMock.mockReturnValue(newUrl)

        const { queryByTestId } = arrangeTest(<div data-testid={CHILDREN_ID} />)

        expect(RedirectMock).toHaveBeenCalledWith(
          { to: `${newUrl}${search}${hash}` },
          {}
        )
        expect(queryByTestId(REDIRECT_ID)).toBeInTheDocument()
        expect(queryByTestId(CHILDREN_ID)).not.toBeInTheDocument()
      })
    })
  })
})
