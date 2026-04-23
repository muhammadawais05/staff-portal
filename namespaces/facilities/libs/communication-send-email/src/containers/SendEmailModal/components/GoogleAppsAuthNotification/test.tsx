import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import {
  createGetEmailContactsMock,
  createGetEmailContactsEmptyMock,
  createGetTeamsWithEmailTrackingMock,
  createGetMailboxesMock,
  createGetMailboxesEmptyMock,
  createGetCommunicationTrackingUrlMock
} from '@staff-portal/communication/src/mocks'

import GoogleAppsAuthNotification from './GoogleAppsAuthNotification'

const arrangeTest = (mocks: MockedResponse[]) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <GoogleAppsAuthNotification />
    </TestWrapperWithMocks>
  )

const email = 'test-contact@toptal.io'
const emailContacts = [{ value: email, id: 'xyz' }]
const notificationTestId = 'google-apps-notification'

describe('GoogleAppsAuthComponent', () => {
  it('does not show the message when the user does not have mailboxes', async () => {
    arrangeTest([
      createGetEmailContactsMock(emailContacts),
      createGetTeamsWithEmailTrackingMock(true),
      createGetCommunicationTrackingUrlMock()
    ])

    await waitFor(() => Promise.resolve())
    expect(screen.queryByTestId(notificationTestId)).toBeNull()
  })
  it('does not show the message when the user does not belong to a team with email tracking enabled', async () => {
    arrangeTest([
      createGetEmailContactsMock(emailContacts),
      createGetMailboxesMock({ emails: [email] }),
      createGetTeamsWithEmailTrackingMock(false),
      createGetCommunicationTrackingUrlMock()
    ])

    await waitFor(() => Promise.resolve())
    expect(screen.queryByTestId(notificationTestId)).toBeNull()
  })

  it('does not show the message when the user does not have contacts', async () => {
    arrangeTest([
      createGetEmailContactsEmptyMock(),
      createGetMailboxesEmptyMock({ emails: [] }),
      createGetTeamsWithEmailTrackingMock(false),
      createGetCommunicationTrackingUrlMock()
    ])

    await waitFor(() => Promise.resolve())
    expect(screen.queryByTestId(notificationTestId)).toBeNull()
  })

  it('shows send via gmail message when user has mailboxes and email tracking enabled', async () => {
    const message = 'This email will be sent via your Gmail account.'

    arrangeTest([
      createGetEmailContactsMock(emailContacts),
      createGetMailboxesMock({ emails: [email] }),
      createGetTeamsWithEmailTrackingMock(true),
      createGetCommunicationTrackingUrlMock()
    ])

    await waitFor(() => Promise.resolve())
    expect(await screen.findByText(message)).toBeInTheDocument()
  })

  it('shows authorize message when user has empty mailboxes and email tracking enabled', async () => {
    const trackingUrl = 'https://toptal.net:3022/gateway/lens/auth/google'
    const message =
      'Please your Toptal Google Apps account or this email will be sent via platform.'

    arrangeTest([
      createGetEmailContactsMock(emailContacts),
      createGetMailboxesEmptyMock({ emails: [email] }),
      createGetTeamsWithEmailTrackingMock(true),
      createGetCommunicationTrackingUrlMock(trackingUrl)
    ])

    await waitFor(() => Promise.resolve())
    expect(await screen.findByText(message)).toBeInTheDocument()

    const authorizeLink = await screen.findByText(/authorize/g)

    expect(authorizeLink).toHaveAttribute('href', trackingUrl)
  })
})
