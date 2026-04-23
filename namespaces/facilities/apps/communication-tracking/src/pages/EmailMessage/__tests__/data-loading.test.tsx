import React, { ReactNode } from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { useParams } from '@staff-portal/navigation'
import { MockedResponse } from '@staff-portal/data-layer-service'
import {
  TestErrorBoundary,
  assertErrorBoundaryErrorsCalled,
  TestWrapperWithMocks
} from '@staff-portal/test-utils'
import { GET_USERS_BY_EMAILS } from '@staff-portal/communication'

import EmailMessage from '../EmailMessage'
import {
  createEmailMessageMock,
  createEmailMessageFailedMock
} from '../data/get-email-message/mocks'

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useParams: jest.fn()
}))

jest.mock('../../../components/EmailMessageContentWrapper', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid='EmailMessageContentWrapper'>{children}</div>
  )
}))
jest.mock('@staff-portal/communication', () => ({
  ...jest.requireActual('@staff-portal/communication'),
  EmailMessageListItem: () => <div data-testid='EmailMessageListItem' />
}))

const useParamsMock = useParams as jest.Mock

const arrangeTest = async ({
  mocks,
  errorBoundaryMessage = ''
}: {
  mocks: MockedResponse[]
  errorBoundaryMessage?: string
}) => {
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <TestErrorBoundary errorMessage={errorBoundaryMessage}>
        <EmailMessage />
      </TestErrorBoundary>
    </TestWrapperWithMocks>
  )
  await waitForElementToBeRemoved(() =>
    screen.queryByTestId('email-message-page-loader')
  )
}

describe('EmailMessage page loading', () => {
  it('should show email message and an error notification when fetching users by emails fails', async () => {
    const id = '123'
    const fromEmail = 'TEST_EMAIL_FROM'
    const toEmail = 'TEST_EMAIL_TO'

    useParamsMock.mockReturnValue({ id })

    const getEmailMessageMock = createEmailMessageMock({
      id,
      fromEmail,
      toEmails: [toEmail]
    })
    const getUsersByEmailsFailedMock = {
      request: {
        query: GET_USERS_BY_EMAILS,
        variables: { filter: { emails: [fromEmail, toEmail] } }
      },
      error: new Error('Mocked Error')
    }

    await arrangeTest({
      mocks: [getEmailMessageMock, getUsersByEmailsFailedMock]
    })

    expect(screen.getByTestId('EmailMessageListItem')).toBeInTheDocument()
    expect(
      screen.getByText('Unable to fetch users by email.')
    ).toBeInTheDocument()
  })

  it('should trigger error boundary when fetching email messages fails', async () => {
    const id = '123'
    const errorMessage = `Error: error`

    useParamsMock.mockReturnValue({ id })
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    await arrangeTest({
      mocks: [createEmailMessageFailedMock(id, errorMessage)],
      errorBoundaryMessage: errorMessage
    })

    expect(screen.getByText(errorMessage)).toBeInTheDocument()

    assertErrorBoundaryErrorsCalled(consoleErrorSpy, errorMessage, EmailMessage)
  })
})
