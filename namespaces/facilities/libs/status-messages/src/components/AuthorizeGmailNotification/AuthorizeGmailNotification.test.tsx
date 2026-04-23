import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import {
  createGetEmailContactsMock,
  createGetTeamsWithEmailTrackingMock,
  createGetCommunicationTrackingUrlMock,
  createGetMailboxesMock,
  createGetMailboxesEmptyMock
} from '@staff-portal/communication/src/mocks'

import AuthorizeGmailNotification from './AuthorizeGmailNotification'

const arrangeTest = (mocks: MockedResponse[]) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <AuthorizeGmailNotification />
    </TestWrapperWithMocks>
  )

const queryNotification = () =>
  screen.queryByText('You must authorize your Toptal email account', {
    exact: false
  })

describe('AuthorizeGmailNotification', () => {
  it('shows when the user has not yet authorized mailboxes', async () => {
    arrangeTest([
      createGetEmailContactsMock(),
      createGetMailboxesEmptyMock({ emails: [] }),
      createGetTeamsWithEmailTrackingMock(true),
      createGetCommunicationTrackingUrlMock('https://testurl.com')
    ])

    await waitFor(async () => {
      expect(
        await screen.findByText(
          'You must authorize your Toptal email account',
          { exact: false }
        )
      ).toBeInTheDocument()
    })
  })

  it('shows the authorize link', async () => {
    const authUrl = 'https://testurl.com'

    arrangeTest([
      createGetEmailContactsMock(),
      createGetMailboxesEmptyMock({ emails: [] }),
      createGetTeamsWithEmailTrackingMock(true),
      createGetCommunicationTrackingUrlMock(authUrl)
    ])

    await waitFor(async () => {
      expect(await screen.findByText('Sign in with Gmail.')).toHaveAttribute(
        'href',
        authUrl
      )
    })
  })

  it('hides when the auth url is not provided', async () => {
    arrangeTest([
      createGetEmailContactsMock(),
      createGetMailboxesMock({ emails: [] }),
      createGetTeamsWithEmailTrackingMock(true),
      createGetCommunicationTrackingUrlMock()
    ])

    await waitFor(() => {
      expect(queryNotification()).not.toBeInTheDocument()
    })
  })

  it('hides when the user has already authorized mailboxes', async () => {
    const email = 'test-contact@toptal.io'
    const emailContacts = [{ value: email, id: 'xyz' }]

    arrangeTest([
      createGetEmailContactsMock(emailContacts),
      createGetMailboxesMock({ emails: [email] }),
      createGetTeamsWithEmailTrackingMock(true),
      createGetCommunicationTrackingUrlMock('https://testurl.com')
    ])

    await waitFor(() => {
      expect(queryNotification()).not.toBeInTheDocument()
    })
  })

  it('hides when the user is not allowed to manage mailboxes', async () => {
    arrangeTest([
      createGetTeamsWithEmailTrackingMock(true),
      createGetCommunicationTrackingUrlMock('https://testurl.com')
    ])

    await waitFor(() => {
      expect(queryNotification()).not.toBeInTheDocument()
    })
  })

  it('hides when the user does not belong to at least one team with email tracking enabled', async () => {
    const email = 'test-contact@toptal.io'
    const emailContacts = [{ value: email, id: 'xyz' }]

    arrangeTest([
      createGetEmailContactsMock(emailContacts),
      createGetMailboxesMock({ emails: [email] }),
      createGetTeamsWithEmailTrackingMock(false),
      createGetCommunicationTrackingUrlMock('https://testurl.com')
    ])

    await waitFor(() => {
      expect(queryNotification()).not.toBeInTheDocument()
    })
  })
})
