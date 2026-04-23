import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { reloadPage } from '@staff-portal/navigation'
import { ENVIRONMENT } from '@staff-portal/config'
import {
  ApolloError,
  createServerError
} from '@staff-portal/data-layer-service'

import ApplicationErrorBoundary from './ApplicationErrorBoundary'

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  reloadPage: jest.fn()
}))

const reloadPageMock = reloadPage as jest.Mock

describe('ApplicationErrorBoundary', () => {
  it('should show default error page if the application error occurs', async () => {
    // TODO: remove this mock across the tests when https://github.com/toptal/davinci/pull/249 is merged
    window.scrollTo = jest.fn()

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    const ERROR_MESSAGE = 'Error occurred.'
    const LocalFailingComponent = () => {
      throw new Error(ERROR_MESSAGE)
    }

    const { getByText, findByText } = render(
      <ApplicationErrorBoundary
        appName='staff-portal'
        productName='staff-portal'
        packageVersion='0.0'
        environment={ENVIRONMENT}
      >
        <LocalFailingComponent />
      </ApplicationErrorBoundary>
    )

    expect(await findByText(`Page Couldn't Load`)).toBeInTheDocument()
    expect(
      await findByText(
        `The Support team is working to fix this issue. Please try again later.`
      )
    ).toBeInTheDocument()

    const reloadButton = getByText(`Refresh page`)

    fireEvent.click(reloadButton)
    expect(reloadPageMock).toHaveBeenCalledTimes(1)
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

  it('should show Unable to load error page if the server returns internal error for application-level query', async () => {
    // TODO: remove this mock across the tests when https://github.com/toptal/davinci/pull/249 is merged
    window.scrollTo = jest.fn()

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    const serverError = createServerError()
    const LocalFailingComponent = () => {
      throw new ApolloError({ networkError: serverError })
    }

    const { getByText, findByText } = render(
      <ApplicationErrorBoundary
        appName='staff-portal'
        productName='staff-portal'
        packageVersion='0.0'
        environment={ENVIRONMENT}
      >
        <LocalFailingComponent />
      </ApplicationErrorBoundary>
    )

    expect(await findByText(`Page Couldn't Load`)).toBeInTheDocument()
    expect(
      await findByText(`Sorry, something went wrong. Please try again later.`)
    ).toBeInTheDocument()

    const reloadButton = getByText(`Reload page`)

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
})
