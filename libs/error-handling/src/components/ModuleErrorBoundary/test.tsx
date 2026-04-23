import React, { ComponentType } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { GraphQLError } from 'graphql'
import { createMemoryHistory } from 'history'
import {
  MemoryRouter,
  Switch,
  Router,
  Route,
  reloadPage
} from '@staff-portal/navigation'
import {
  ApolloError,
  createServerError
} from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import ModuleErrorBoundary from './index'

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  reloadPage: jest.fn()
}))

const reloadPageMock = reloadPage as jest.Mock

const arrangeTest = (TestCaseComponent: ComponentType) =>
  render(
    <TestWrapper>
      <MemoryRouter>
        <ModuleErrorBoundary>
          <TestCaseComponent />
        </ModuleErrorBoundary>
      </MemoryRouter>
    </TestWrapper>
  )

describe('ModuleErrorBoundary', () => {
  it('should show Module error page when error is caught', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    const COMPONENT_ERROR_TEXT = 'Error occurred'
    const LocalFailingComponent = () => {
      throw new Error(COMPONENT_ERROR_TEXT)
    }

    arrangeTest(LocalFailingComponent)
    expect(await screen.findByText(`Page Couldn't Load`)).toBeInTheDocument()
    expect(consoleErrorSpy).toHaveBeenCalledTimes(2)
    expect(consoleErrorSpy.mock.calls).toEqual([
      [expect.stringContaining(COMPONENT_ERROR_TEXT), expect.any(Error)],
      [
        expect.stringContaining(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          LocalFailingComponent.displayName || LocalFailingComponent.name
        )
      ]
    ])
  })

  it('should show Forbidden error page when authorization error is caught', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    const GRAPHQL_ERROR_TEXT = 'Auth error occurred'

    const UNAUTHORIZED_GRAPHQL_ERROR = new ApolloError({
      graphQLErrors: [
        new GraphQLError(
          GRAPHQL_ERROR_TEXT,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          {
            code: 'UNAUTHORIZED'
          }
        )
      ]
    })

    const LocalFailingComponent = () => {
      throw UNAUTHORIZED_GRAPHQL_ERROR
    }

    arrangeTest(LocalFailingComponent)
    expect(
      await screen.findByText('This Page Requires Additional Permissions')
    ).toBeInTheDocument()
    expect(consoleErrorSpy).toHaveBeenCalledTimes(2)
    expect(consoleErrorSpy.mock.calls).toEqual([
      [expect.stringContaining(GRAPHQL_ERROR_TEXT), expect.any(Error)],
      [
        expect.stringContaining(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          LocalFailingComponent.displayName || LocalFailingComponent.name
        )
      ]
    ])
  })

  it('should show Unable to load error page if the server returns internal error', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    const serverError = createServerError()
    const LocalFailingComponent = () => {
      throw new ApolloError({ networkError: serverError })
    }

    arrangeTest(LocalFailingComponent)

    expect(await screen.findByText(`Page Couldn't Load`)).toBeInTheDocument()
    expect(
      await screen.findByText(
        `Sorry, something went wrong. Please try again later.`
      )
    ).toBeInTheDocument()

    const reloadButton = screen.getByText('Reload Page')

    fireEvent.click(reloadButton)
    expect(reloadPageMock).toHaveBeenCalledTimes(1)
    expect(consoleErrorSpy).toHaveBeenCalledTimes(2)
    expect(consoleErrorSpy.mock.calls).toEqual([
      [expect.stringContaining(serverError.message), expect.any(Error)],
      [
        expect.stringContaining(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          LocalFailingComponent.displayName || LocalFailingComponent.name
        )
      ]
    ])
  })

  it('should reset error state after location change', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    const ERROR_MESSAGE = 'Error occurred.'
    const DIFFERENT_LOCATION_PAGE_CONTENT = 'Test Page Content'

    const LocalFailingComponent = () => {
      throw new Error(ERROR_MESSAGE)
    }

    const history = createMemoryHistory({ initialEntries: ['/'] })

    render(
      <TestWrapper>
        <Router history={history}>
          <ModuleErrorBoundary>
            <Switch>
              <Route path='/' exact>
                <LocalFailingComponent />
              </Route>
              <Route path='/test' exact>
                <p>{DIFFERENT_LOCATION_PAGE_CONTENT}</p>
              </Route>
            </Switch>
          </ModuleErrorBoundary>
        </Router>
      </TestWrapper>
    )

    screen.getByText(`Page Couldn't Load`)
    history.push('/test')
    screen.getByText(DIFFERENT_LOCATION_PAGE_CONTENT)

    expect(reloadPageMock).toHaveBeenCalledTimes(0)
    expect(consoleErrorSpy).toHaveBeenCalledTimes(2)
    expect(consoleErrorSpy.mock.calls).toEqual([
      [expect.stringContaining(ERROR_MESSAGE), expect.any(Error)],
      [
        expect.stringContaining(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          LocalFailingComponent.displayName || LocalFailingComponent.name
        )
      ]
    ])
  })
})
