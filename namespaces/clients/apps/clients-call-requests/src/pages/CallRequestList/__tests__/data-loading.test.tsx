import React, { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from '@staff-portal/navigation'
import { MockedResponse } from '@staff-portal/data-layer-service'
import {
  assertErrorBoundaryErrorsCalled,
  TestErrorBoundary,
  TestWrapperWithMocks
} from '@staff-portal/test-utils'

import CallRequestList from '../CallRequestList'
import {
  GET_CALL_REQUESTS_LIST_DEFAULT_VARIABLES,
  createGetCallRequestsListFailedMock
} from '../data/get-call-requests-list/mocks'

jest.mock('@staff-portal/counters')

jest.mock('@staff-portal/page-wrapper', () => ({
  ContentWrapper: ({ children }: { children: ReactNode }) => (
    <div data-testid='ContentWrapper'>{children}</div>
  )
}))

const arrangeTest = ({
  mocks,
  errorBoundaryMessage = ''
}: {
  mocks: MockedResponse[]
  errorBoundaryMessage?: string
}) => {
  render(
    <TestErrorBoundary errorMessage={errorBoundaryMessage}>
      <TestWrapperWithMocks mocks={mocks}>
        <MemoryRouter>
          <CallRequestList />
        </MemoryRouter>
      </TestWrapperWithMocks>
    </TestErrorBoundary>
  )
}

describe('CallRequestList', () => {
  it('should trigger error boundary when loading failed', async () => {
    const errorMessage = 'TEST_ERROR_MESSAGE'
    const mocks = [
      createGetCallRequestsListFailedMock(
        GET_CALL_REQUESTS_LIST_DEFAULT_VARIABLES,
        errorMessage
      )
    ]
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    arrangeTest({ mocks, errorBoundaryMessage: errorMessage })

    expect(await screen.findByText(errorMessage)).toBeInTheDocument()

    assertErrorBoundaryErrorsCalled(
      consoleErrorSpy,
      errorMessage,
      CallRequestList
    )
  })
})
