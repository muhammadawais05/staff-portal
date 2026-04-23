import React, { ReactNode } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from '@staff-portal/navigation'
import { MockedResponse } from '@staff-portal/data-layer-service'
import {
  TestWrapperWithMocks,
  TestErrorBoundary,
  assertErrorBoundaryErrorsCalled
} from '@staff-portal/test-utils'
import { GET_USERS_BY_EMAILS } from '@staff-portal/communication'

import EmailMessageList from '../EmailMessageList'
import {
  createGetEmailMessagesListMock,
  createGetEmailMessagesListNoResultsMock,
  createGetEmailMessagesListErrorMock
} from '../../../data/get-email-messages-list/mocks'

jest.unmock('@staff-portal/current-user')

jest.mock('../../../components/EmailMessageListContentWrapper', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid='EmailMessageListContentWrapper'>{children}</div>
  )
}))
jest.mock('@staff-portal/filters', () => ({
  ...jest.requireActual('@staff-portal/filters'),
  Filters: () => <div data-testid='Filters' />
}))
jest.mock('@staff-portal/communication', () => ({
  ...jest.requireActual('@staff-portal/communication'),
  EmailMessageListItem: () => <div data-testid='EmailMessageListItem' />
}))

const arrangeTest = async ({
  mocks,
  errorBoundaryMessage = ''
}: {
  mocks: MockedResponse[]
  errorBoundaryMessage?: string
}) => {
  render(
    <MemoryRouter>
      <TestWrapperWithMocks mocks={mocks}>
        <TestErrorBoundary errorMessage={errorBoundaryMessage}>
          <EmailMessageList />
        </TestErrorBoundary>
      </TestWrapperWithMocks>
    </MemoryRouter>
  )
  await screen.findByRole('progressbar')
  await waitFor(() =>
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  )
}

describe('EmailMessageList page loading', () => {
  it('shows empty result message when no email messages are loaded', async () => {
    await arrangeTest({ mocks: [createGetEmailMessagesListNoResultsMock({})] })

    expect(
      screen.getByText('There are no messages for this search criteria')
    ).toBeInTheDocument()
  })

  it('should show email messages and an error notification when fetching users by emails fails', async () => {
    const fromEmail = 'TEST_EMAIL_FROM'
    const toEmail = 'TEST_EMAIL_TO'

    const getUsersByEmailsFailedMock = {
      request: {
        query: GET_USERS_BY_EMAILS,
        variables: { filter: { emails: [fromEmail, toEmail] } }
      },
      error: new Error()
    }

    const getEmailMessagesMock = createGetEmailMessagesListMock(
      {},
      { fromEmail, toEmail }
    )

    await arrangeTest({
      mocks: [getEmailMessagesMock, getUsersByEmailsFailedMock]
    })

    expect(
      await screen.findByTestId('EmailMessageListItem')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Unable to fetch users by email.')
    ).toBeInTheDocument()
  })

  it('should trigger error boundary when fetching email messages fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    const NETWORK_ERROR_MESSAGE = 'Network error occurred.'

    await arrangeTest({
      mocks: [createGetEmailMessagesListErrorMock({}, NETWORK_ERROR_MESSAGE)],
      errorBoundaryMessage: NETWORK_ERROR_MESSAGE
    })

    expect(screen.getByText(NETWORK_ERROR_MESSAGE)).toBeInTheDocument()

    assertErrorBoundaryErrorsCalled(
      consoleErrorSpy,
      NETWORK_ERROR_MESSAGE,
      EmailMessageList
    )
  })
})
